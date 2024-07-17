import {Component, OnInit} from '@angular/core';
import {PointService} from "../../../ad-services/point.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CreateMessageV2Component} from "../../../ad-components/ad-dialog/create-message-v2/create-message-v2.component";
import {EditMessageV2Component} from "../../../ad-components/ad-dialog/edit-message-v2/edit-message-v2.component";
import {
  MessageDetailsV2Component
} from "../../../ad-components/ad-dialog/message-details-v2/message-details-v2.component";
import {HrService} from "../../../ad-services/helper/hr.service";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";

@Component({
  selector: 'app-message-issue-v2',
  templateUrl: './message-issue-v2.component.html',
  styles: []
})
export class MessageIssueV2Component implements OnInit {
  messageTypeList: Array<any> = []
  dataList: Array<any> = []
  loadingList: boolean = false
  totalPages: number = 1
  currentPage: number = 1
  key: string = ''
  reqData: any = {
    page: 0,
    size: 10,
    type: null
  }

  constructor(
    private pointService: PointService,
    private dialog: MatDialog,
    private hrService: HrService,
    private router: Router
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getData()
    this.getMessageType()
  }

  filterType(type: any) {
    this.reqData['type'] = type.value
    this.getData()
  }

  getData() {
    this.loadingList = true
    this.pointService.messageGetListV2(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.totalPages = res.paging.totalPages
        for (let i = 0; i < this.dataList.length; i++) {
          this.dataList[i].position = (this.reqData.page * this.reqData.size) + (i + 1)
        }
        this.loadingList = false
      } else {
        this.loadingList = false
      }
    })
  }

  searchByKey() {
    if (this.key !== '') {
      this.reqData['key'] = this.key
      this.getData()
    } else {
      delete this.reqData['key']
      this.getData()
    }

  }

  createIssueMessageV2Dialog() {
    this.dialog.open(CreateMessageV2Component, {
      width: '800px',
      maxWidth: '800px'
    })
  }

  getMessageType() {
    this.pointService.messageTypeList().then((res) => {
      this.messageTypeList = res.data
    })
  }

  editMessage(key: string) {
    this.pointService.messageGetOneV2(key).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(EditMessageV2Component, {
          width: '1000px',
          maxWidth: '1000px',
          data: {
            messageInfo: res,
            types: this.messageTypeList
          }
        })
        dialogRef.componentInstance.onEdit.subscribe(() => {
          dialogRef.close()
          this.getData()
        })
      }
    })
  }

  refreshRedis() {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы действительно хотите синхронизировать описания ошибок ?'
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.messageSync()
    })
  }

  messageSync() {
    this.pointService.messageSyncV2().then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, 'Описание ошибки успешно синхронизировано!')
      }
    })
  }

  deleteMessage(key: string) {

  }

  messageDetails(item: any) {
    this.dialog.open(MessageDetailsV2Component, {
      width: '600px',
      maxWidth: '600px',
      maxHeight: '600px',
      data: {
        details: item
      }
    })
  }

  pageClicked(val: number) {
    if (val !== this.currentPage) {
      this.reqData.page = val - 1
      this.currentPage = val
      this.getData()
    }
  }

  pagePrevTo() {
    this.reqData.page--
    this.currentPage--
    this.getData()
  }

  pageNextTo() {
    this.reqData.page++
    this.currentPage++
    this.getData()
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
