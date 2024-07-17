import {Component, OnInit} from '@angular/core';
import {MyAutoService} from "../../../ad-services/my-auto.service";
import {MatDialog} from "@angular/material/dialog";
import {
  CarColorCreateDialogComponent
} from "../../../ad-components/my-auto/car-color-create-dialog/car-color-create-dialog.component";
import {
  CarColorEditDialogComponent
} from "../../../ad-components/my-auto/car-color-edit-dialog/car-color-edit-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-car-colors',
  templateUrl: './car-colors.component.html',
  styleUrls: ['./car-colors.component.scss']
})
export class CarColorsComponent implements OnInit {
  currentPage: number = 1
  totalPages: number = 0
  loadingList: boolean = false
  colorsList: Array<any> = []
  reqData: any = {
    filter: {},
    paging: {
      page: 0,
      size: 20
    }
  }

  constructor(
    private myAutoService: MyAutoService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.loadingList = true
    this.myAutoService.getColorList(this.reqData).then((res: any) => {
      if (res) {
        this.colorsList = res.content
        this.totalPages = res.paging.totalPages > 1 ? res.paging.totalPages : 0
        this.loadingList = false
      } else {
        this.loadingList = false
      }
    })
  }

  openCreateDialog(): void {
    let dialogRef = this.dialog.open(CarColorCreateDialogComponent, {
      width: '680px',
      maxWidth: '680px'
    })
    dialogRef.componentInstance.onCreateColor.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  openEditDialog(item: any): void {
    let dialogRef = this.dialog.open(CarColorEditDialogComponent, {
      width: '680px',
      maxWidth: '680px',
      data: {
        item
      }
    })
    dialogRef.componentInstance.onCreateColor.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  routeToInfo(id: number) {
    this.router.navigate(['my-auto/color', id]).then(() => {
    })
  }

  pageClicked(val: number) {
    if (this.currentPage !== val) {
      this.reqData.paging.page = val - 1
      this.currentPage = val
      this.getData()
    }
  }

  pagePrevTo() {
    this.reqData.paging.page--
    this.currentPage--
    this.getData()
  }

  pageNextTo() {
    this.reqData.paging.page++
    this.currentPage++
    this.getData()
  }
}
