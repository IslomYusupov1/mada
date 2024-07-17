import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {UserService} from "../../../ad-services/user.service";
import {CreateAdminComponent} from "../create-admin/create-admin.component";
import {EditAdminComponent} from "../edit-admin/edit-admin.component";
import {BankAdminDetailComponent} from "../bank-admin-detail/bank-admin-detail.component";
import {AdStatusDialogComponent} from "../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-redemption-dialog',
  templateUrl: './redemption-dialog.component.html',
  styles: []
})
export class RedemptionDialogComponent implements OnInit {
  @Output() redemption = new EventEmitter<string>()
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
    public userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: {
      resultList: Array<any>
    }
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {

  }


  // pageClicked(val: number) {
  //   this.reqData.page = val - 1
  //   this.currentPage = val
  //   this.getList()
  // }
  //
  // pagePrevTo() {
  //   // @ts-ignore
  //   this.reqData.page--
  //   this.currentPage--
  //   this.getList()
  // }
  //
  // pageNextTo() {
  //   // @ts-ignore
  //   this.reqData.page++
  //   this.currentPage++
  //   this.getList()
  // }
  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
