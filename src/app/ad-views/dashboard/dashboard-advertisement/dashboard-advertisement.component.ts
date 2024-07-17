import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../ad-services/user.service";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {SendSmsComponent} from "../../../ad-components/ad-dialog/send-sms/send-sms.component";
import {Router} from "@angular/router";
import {CreateSmsDialogComponent} from "../../../ad-components/ad-dialog/create-sms-dialog/create-sms-dialog.component";
import {EditSmsDialogComponent} from "../../../ad-components/ad-dialog/edit-sms-dialog/edit-sms-dialog.component";
import {HrService} from "../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-dashboard-advertisement',
  templateUrl: './dashboard-advertisement.component.html',
  styles: []
})
export class DashboardAdvertisementComponent implements OnInit {
  dataList: Array<any> = []
  loadingList: boolean = false
  totalPages: number = 1
  currentPage: number = 1
  reqData: any = {
    page: 0,
    size: 10
  }

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private hrService: HrService
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getList()
  }

  senToUserSmsDialog(id: string) {
    let dialogRef = this.dialog.open(SendSmsComponent, {
      maxWidth: '445px',
      width: '445px',
      data: {
        id: id,
      }
    });
    dialogRef.componentInstance.sendSMS.subscribe(() => {
      dialogRef.close()
    })
  }

  openEditDialog(id: string) {
    this.userService.getSmsOne(id).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(EditSmsDialogComponent, {
          maxWidth: '950px',
          width: '950px',
          data: {
            item: res,
            id
          }
        })
        dialogRef.componentInstance.editSMS.subscribe(() => {
          dialogRef.close()
          this.getList()
        })
      }
    })

  }

  openCreateDialogSms() {
    let createSmsRef = this.dialog.open(CreateSmsDialogComponent, {
      maxWidth: '950px',
      width: '950px',
    });
    createSmsRef.componentInstance.createSMs.subscribe(() => {
      createSmsRef.close()
      this.getList()
    })
  }

  smsToAllUsers(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '500px',
      width: '500px',
      data: {title: 'Вы точно хотите отправить всем пользователям это сообщение?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.sentToAllSmsUser(id)
    })
  }

  smsDelete(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '500px',
      width: '500px',
      data: {title: 'Вы точно хотите удалить это сообщение?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.deleteSms(id)
    })
  }

  deleteSms(id: string) {
    this.userService.deleteSms(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'Сообщение успешно удалено')
        this.getList()
      }
    })
  }

  sentToAllSmsUser(id: string) {
    this.userService.sentSmsUSer(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'Сообщение успешно отправлено')
      }
    })
  }

  getList() {
    this.userService.getSmsList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.dataList.forEach((item, index) => {
          item.position = (this.reqData.page * this.reqData.size) + (index + 1)
          item.date = this.hrService.reqDataWithTime(item.timeOfDispatch)
        })
        console.log(this.dataList)
        this.totalPages = res.paging.totalPages
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

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
