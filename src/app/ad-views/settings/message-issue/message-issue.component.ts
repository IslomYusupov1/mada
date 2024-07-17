import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {PointService} from "../../../ad-services/point.service";
import {CreateMessageComponent} from "../../../ad-components/ad-dialog/create-message/create-message.component";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {
  EditMessageDialogComponent
} from "../../../ad-components/ad-dialog/edit-message-dialog/edit-message-dialog.component";

@Component({
  selector: 'app-message-issue',
  templateUrl: './message-issue.component.html',
  styles: [
  ]
})
export class MessageIssueComponent implements OnInit {
  dataList: Array<any> = []
  loadingList: boolean = false
  totalPages: number = 1
  currentPage: number = 1
  reqData: any = {
    page: 0,
    size: 10
  }
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public pointService: PointService
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {})}
  }

  ngOnInit(): void {
    this.getList()
  }

  createIssueMessageDialog(){
    let dialogRef = this.dialog.open(CreateMessageComponent, {
      maxWidth: '445px',
      width: '445px',
      data: {}
    });
    dialogRef.componentInstance.createIssueMessage.subscribe(() => {
      dialogRef.close()
      this.getList()
    })
  }
  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }
  deleteMessage(id:number){
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы точно хотите удалить ?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.delete(id)
    })
  }
  editMessage(id:number){
    this.pointService.messageGetOne(id).then((res:any)=>{
      if (res){
        let dialogRef = this.dialog.open(EditMessageDialogComponent, {
          maxWidth: '445px',
          width: '445px',
          data: {
            messageId: id,
            key: res.key,
            lang: res.lang,
            message: res.message
          }
        });
        dialogRef.componentInstance.editIssueMessage.subscribe(() => {
          dialogRef.close()
          this.getList()
        })
      }
    })
  }

  delete(id: number) {
    this.pointService.deleteMessage(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'успешно удален', '', [])
      } else {
        this.showMessage(false, res.message, '', [])
      }
      this.getList()
    })
  }
  getList() {
    this.loadingList = true
    this.pointService.getMessageList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.totalPages = res.paging.totalPages
        this.loadingList = false
      }
    })
  }
  pageClicked(val: number) {
    this.reqData.page = val - 1
    this.currentPage = val
    this.getList()
  }

  pagePrevTo() {
    // @ts-ignore
    this.reqData.page--
    this.currentPage--
    this.getList()
  }

  pageNextTo() {
    // @ts-ignore
    this.reqData.page++
    this.currentPage++
    this.getList()
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
