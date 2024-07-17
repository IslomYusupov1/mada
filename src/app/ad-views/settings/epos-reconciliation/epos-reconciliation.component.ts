import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {PointService} from "../../../ad-services/point.service";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {GoldUserOneComponent} from "../../../ad-components/ad-dialog/gold-user-one/gold-user-one.component";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";

@Component({
  selector: 'app-epos-reconciliation',
  templateUrl: './epos-reconciliation.component.html',
  styles: [
  ]
})
export class EposReconciliationComponent implements OnInit {

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
    this.getEposReconciliationList()
  }

  pageClicked(val: number) {
    this.currentPage = val
    this.getEposReconciliationList()

  }




  pagePrevTo() {
    this.currentPage--
    this.getEposReconciliationList()
  }

  pageNextTo() {
    this.currentPage++
    this.getEposReconciliationList()
  }

  getEposReconciliationList() {
    this.pointService.getEposReconciliation(this.currentPage, 10).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.totalPages = res.paging.totalPages
      }
    })
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }
  sendAll(){
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы точно хотите реконсилиацию для всех? '}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.reconciliationToAll()
    })

  }

  sendOne(id:number){
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы точно хотите реконсилиацию к одному?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.reconciliationToOne(id)
    })

  }
  reconciliationToAll() {
    this.pointService.reconciliationAll().then((res: any) => {
      if (res) {
        this.showMessage(true, res.message ? res.message : 'Успешно')
      }
    })
  }
  reconciliationToOne(id: number) {
    this.pointService.reconciliationOne(id).then((res: any) => {
      if (res) {
        this.showMessage(true, res.message ? res.message : 'Успешно')
        this.getEposReconciliationList()
      }
    })
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }

}
