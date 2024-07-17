import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FraudService} from "../../../ad-services/fraud.service";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {strings} from "@angular-devkit/schematics";
import {HrService} from "../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-fraud-users',
  templateUrl: './fraud-users.component.html',
  styles: []
})
export class FraudUsersComponent implements OnInit {

  dataList: Array<any> = []
  loadingList: boolean = false
  totalPages: number = 1
  currentPage: number = 1
  reqData: any = {
    page: 0,
    size: 10
  }
  params: any = {
    username: null,
    status: null
  }

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public fraudService: FraudService,
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

  filterUsername(event: any) {
      this.params.username = event.target.value
      this.getList()

  }

  filter(status: any) {
    status.value === 'Все' ? this.params.status = null : this.params.status = status.value
    this.getList()
  }

  changeStatusUser(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы точно хотите изменить ?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.changeStatus(id)
    })
  }

  changeStatus(id: string) {
    this.fraudService.changeStatusUser(id).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, 'успешно изменено', '', [])
      }
      this.getList()
    })
  }

  setText(status: string) {
    switch (status) {
      case 'BLOCKED':
        return 'Заблокирован'
      case 'ACTIVE':
        return 'Активный'
    }
    return status
  }

  getList() {
    this.loadingList = true
    this.fraudService.getFraudUsersList(this.reqData, this.params).then((res: any) => {
      if (res) {
        this.dataList = res.items
        this.totalPages = res.paging.totalPages
        this.loadingList = false
      }
    })
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
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
}
