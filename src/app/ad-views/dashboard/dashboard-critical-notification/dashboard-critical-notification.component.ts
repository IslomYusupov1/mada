import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../ad-services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {UserService} from "../../../ad-services/user.service";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {HrService} from "../../../ad-services/helper/hr.service";
import {
  CreateCriticalNotificationComponent
} from "../../../ad-components/ad-dialog/create-critical-notification/create-critical-notification.component";
import {
  EditCriticalNotificationComponent
} from "../../../ad-components/ad-dialog/edit-critical-notification/edit-critical-notification.component";

@Component({
  selector: 'app-dashboard-critical-notification',
  templateUrl: './dashboard-critical-notification.component.html',
  styleUrls: ['./dashboard-critical-notification.component.scss']
})
export class DashboardCriticalNotificationComponent implements OnInit {
  dataList: Array<any> = []
  loadingList: boolean = false
  totalPages: number = 1
  currentPage: number = 1
  reqData: any = {
    isCritical: true,
    page: 0,
    size: 10
  }

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    public hr: HrService,
    public userService: UserService
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.loadingList = true
    this.authService.notificationList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.totalPages = res.paging.totalPages
        this.loadingList = false
      }
    })
  }

  openCreateDialogNotification(): void {
     let createDialog = this.dialog.open(CreateCriticalNotificationComponent, {
      maxWidth: '950px',
      width: '950px',
      maxHeight: '650px',
      data: {}
    });
    createDialog.componentInstance.createNotification.subscribe(() => {
      createDialog.close()
      this.getList()
    })
  }

  criticalSend(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '500px',
      width: '500px',
      data: {title: 'Вы точно хотите отправить это уведомление?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.sendToHomePage(id)
    })
  }

  sendToHomePage(id: string) {
    this.userService.homeSend(id).then((res: any) => {
      if (res) {
        this.hr.showMessage(true, 'Уведомление успешно отправлено')
      }
    })
  }

  editDialog(id: string) {
    const data = this.dataList.find((el) => el.uuid === id);
    if (data) {
      let dialogRef = this.dialog.open(EditCriticalNotificationComponent, {
        maxWidth: '950px',
        width: '950px',
        maxHeight: '650px',
        data: {
          id: id,
          data
        }
      });
      dialogRef.componentInstance.editNotification.subscribe(() => {
        dialogRef.close()
        this.getList()
      })
    }
  }

  pageClicked(val: number) {
    this.reqData.page = val - 1
    this.currentPage = val
    this.getList()
  }

  pagePrevTo() {
    this.reqData.page--
    this.currentPage--
    this.getList()
  }

  pageNextTo() {
    this.reqData.page++
    this.currentPage++
    this.getList()
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
