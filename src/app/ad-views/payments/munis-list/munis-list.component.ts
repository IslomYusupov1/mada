import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {PaynetService} from "../../../ad-services/paynet.service";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-munis-list',
  templateUrl: './munis-list.component.html',
  styles: [
  ]
})
export class MunisListComponent implements OnInit {

  dataList: Array<any> = []
  dataListDefault: Array<any> = []
  isDrop: boolean = false

  constructor(
    private paynet: PaynetService,
    private router: Router,
    public dialog: MatDialog
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.paynet.munisList().then(res => {
      this.dataList = Object.assign([], res)
      this.dataListDefault = Object.assign([], res)
    })
  }

  minimize() {
    this.isDrop = !this.isDrop
    this.dataList = Object.assign([], this.dataListDefault)
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataList, event.previousIndex, event.currentIndex);
  }

  changeShow(id: string, isShow: boolean) {
    console.log(id, isShow)
    // this.paynet.categoryChangeIsShow(id, isShow).then((res) => {
    //   if (res) {
    //     this.getData()
    //   }
    // })
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  sortData() {
    // this.paynet.categorySort(this.dataList).then((res) => {
    //   if (res && res.success) {
        this.showMessage(true, 'Success!')
        this.isDrop = false
    //   }
    // })
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }

}
