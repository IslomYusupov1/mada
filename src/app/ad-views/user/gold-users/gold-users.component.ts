import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {PointService} from "../../../ad-services/point.service";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {BankAdminDetailComponent} from "../../../ad-components/ad-dialog/bank-admin-detail/bank-admin-detail.component";
import {GoldUserOneComponent} from "../../../ad-components/ad-dialog/gold-user-one/gold-user-one.component";

@Component({
  selector: 'app-gold-users',
  templateUrl: './gold-users.component.html',
  styleUrls: ['./gold-users.component.scss']
})
export class GoldUsersComponent implements OnInit {

  loadingList: boolean = false;
  dataList: Array<any> = [];
  totalPages: number = 1;
  currentPage: number = 1;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private pointService: PointService
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getGoldUsers()
  }

  pageClicked(val: number) {
    this.currentPage = val
    this.getGoldUsers()

  }



  deactivate(id: string) {
    this.pointService.pointBlock(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'АТМ успешно деактивирован')
        this.getGoldUsers()
      }
    })
  }

  pagePrevTo() {
    this.currentPage--
    this.getGoldUsers()
  }

  pageNextTo() {
    this.currentPage++
    this.getGoldUsers()
  }

  getGoldUsers() {
    this.pointService.getUsersGold(this.currentPage, 10).then((res: any) => {
      if (res) {
        console.log(res)
        this.dataList = res.content
        this.totalPages = res.paging.totalPages
      }
    })
    // .catch((error) => {})
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }
  detail(id:number){
    this.pointService.getGoldUser(id).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(GoldUserOneComponent, {
          maxWidth: '445px',
          width: '445px',
          data: {
            goldUsers: res
          }
        });
        dialogRef.componentInstance.detailGoldUser.subscribe(() => {
          dialogRef.close()
        })
      }
    })

  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }

}
