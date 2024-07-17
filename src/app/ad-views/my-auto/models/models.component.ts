import {Component, OnInit} from '@angular/core';
import {MyAutoService} from "../../../ad-services/my-auto.service";
import {MatDialog} from "@angular/material/dialog";
import {
  AutoModelCreateDialogComponent
} from "../../../ad-components/my-auto/auto-model-create-dialog/auto-model-create-dialog.component";
import {
  AutoModelEditDialogComponent
} from "../../../ad-components/my-auto/auto-model-edit-dialog/auto-model-edit-dialog.component";
import {FormBuilder, FormGroup} from "@angular/forms";

export interface IModel {
  id: number;
  name: string;
  image: IModelImg;
  modelLogo: IModelImg;
  imageList: Array<IModelColor>;
  similarNames: string | null
}

export interface IModelImg {
  contentType: string;
  path: string;
  name: string;
  ext: string;
  suffix: string | null;
  extraSuffix: Array<any>
}

export interface IModelColor {
  colorCode: string | null;
  colorId: number;
  colorName: string;
  image: IModelImg
}

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  currentPage: number = 1
  totalPages: number = 0
  totalItems!: number
  dataList: Array<IModel> = []
  loadingList: boolean = false
  reqData: any = {
    filter: {},
    paging: {
      page: 0,
      size: 30
    }
  }

  searchForm: FormGroup = this.fb.group({
    name: ''
  })

  constructor(
    private myAutoService: MyAutoService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.loadingList = true
    this.myAutoService.getModelsList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.totalPages = res.paging.totalPages > 1 ? res.paging.totalPages : 0
        this.totalItems = res.paging.totalItems
        this.loadingList = false
      } else {
        this.dataList = []
        this.loadingList = false
      }
    })
  }

  searchByName(): void {
    if (!this.searchForm.value.name && !this.reqData.filter.name) {
      return
    }

    if (this.searchForm.value.name) {
      this.reqData.filter['name'] = this.searchForm.value.name
    } else {
      delete this.reqData.filter['name']
    }

    this.reqData.paging['page'] = 0
    this.currentPage = 1
    this.getData()
  }

  openCreateAutoModelDialog(): void {
    let dialogRef = this.dialog.open(AutoModelCreateDialogComponent, {
      width: '680px',
      maxWidth: '680px',
      maxHeight: '650px'
    })
    dialogRef.componentInstance.onCreateModel.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  openEditDialog(item: IModel): void {
    let dialogRef = this.dialog.open(AutoModelEditDialogComponent, {
      width: '680px',
      maxWidth: '680px',
      maxHeight: '650px',
      data: {
        item
      }
    })
    dialogRef.componentInstance.onEditModel.subscribe(() => {
      dialogRef.close()
      this.getData()
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
