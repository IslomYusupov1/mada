import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {UserService} from "../../../ad-services/user.service";
import {
  MyidFailsByUserComponent
} from "../../../ad-components/ad-users/myid-fails-by-user/myid-fails-by-user.component";

@Component({
  selector: 'app-user-myid-fail',
  templateUrl: './user-myid-fail.component.html',
  styleUrls: ['./user-myid-fail.component.scss']
})
export class UserMyidFailComponent implements OnInit {
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
    private userService: UserService
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
    this.userService.userMyIDFailList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.totalPages = res.paging.totalPages
      }
    })
  }

  openUserFails(id: string) {

    this.userService.userMyIDFailByUser(id).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(MyidFailsByUserComponent, {
          width: '1150px',
          maxWidth: '1150px',
          height: '700px',
          data: {
            list: res.attempts
          }
        })
      }
    })
  }

  pageClicked(val: number) {
    this.reqData.page = val - 1
    this.currentPage = val
    this.getData()
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
