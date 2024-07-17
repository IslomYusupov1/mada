import {Component, OnInit} from '@angular/core';
import {PointService} from "../../../ad-services/point.service";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {Router} from "@angular/router";
import {YandexMapDialogComponent} from "../../../ad-components/ad-dialog/yandex-map-dialog/yandex-map-dialog.component";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-bank-atms',
  templateUrl: './bank-atms.component.html',
  styles: []
})
export class BankAtmsComponent implements OnInit {
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
    this.getBranchList()
  }

  pageClicked(val: number) {
    this.currentPage = val
    this.getBranchList()

  }
  showLocation(lat:number,long:number){
    let dialogMapRef = this.dialog.open(YandexMapDialogComponent, {
      maxWidth: '100%',
      width: '1000px',
      height:'600px',
      data:{
        latitude:lat,
        longitude:long
      }
    });
    dialogMapRef.afterClosed().pipe(finalize(()=>console.log('completed'))).subscribe(data =>{})
  }
  showCancelDialog(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы точно хотите удалить?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.cancel(id)
    })
  }

  showActiveDialog(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы точно хотите активировать?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.activate(id)
    })
  }

  showDeactiveDialog(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы точно хотите деактивировать?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.deactivate(id)
    })
  }

  activate(id: string) {
    this.pointService.pointUnblock(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'АТМ успешно активирован')
        this.getBranchList()
      }
    })
  }

  deactivate(id: string) {
    this.pointService.pointBlock(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'АТМ успешно деактивирован')
        this.getBranchList()
      }
    })
  }

  pagePrevTo() {
    this.currentPage--
    this.getBranchList()
  }

  pageNextTo() {
    this.currentPage++
    this.getBranchList()
  }

  getBranchList() {
    this.pointService.getBranch('ATM', this.currentPage, 10).then((res: any) => {
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

  cancel(id: string) {

    this.pointService.deleteBranchOrATM(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'АТМ успешно удален', '', [])
      } else {
        this.showMessage(false, res.message, '', [])
      }
      this.getBranchList()
    })
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
  getLanguage(week:any){
    if (week){
      switch (week){
        case "MONDAY":
          return "Понедельник"
        case "TUESDAY":
          return "Вторник"
        case "WEDNESDAY":
          return "Среда"
        case "THURSDAY":
          return "Четверг"
        case "FRIDAY":
          return "Пятница"
        case "SATURDAY":
          return "Суббота"
        case "SUNDAY":
          return "Воскресенье"
      }
      return week
    }
  }
}
