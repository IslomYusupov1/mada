import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {UserService} from "../../../ad-services/user.service";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {
  EditNotificationComponent
} from "../../../ad-components/ad-dialog/edit-notification/edit-notification.component";
import {PensionEditComponent} from "../pension-edit/pension-edit.component";

@Component({
  selector: 'app-pension',
  templateUrl: './pension.component.html',
  styles: []
})
export class PensionComponent implements OnInit {
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
    this.getList()
  }

  openEditDialog(id: string) {
    this.userService.getPensionOne(id).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(PensionEditComponent, {
          maxWidth: '600px',
          width: '600px',
          data: {
            id: id,
            fullName: res.fullName,
            phone: res.phone,
            description: res.description,
            cardType: res.cardType,
            pan: res.pan,
            branchAddress: res.branchAddress

          }
        });
        dialogRef.componentInstance.editPension.subscribe(() => {
          dialogRef.close()
          this.getList()
        })

      }
    })

  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  getList() {
    this.loadingList = true
    this.userService.getPensionList(this.reqData).then((res: any) => {
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
