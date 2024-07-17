import {Component, OnInit} from '@angular/core';
import {LoanService} from "../../../ad-services/loan.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {LoanBlacklistAddUserComponent} from "./loan-blacklist-add-user/loan-blacklist-add-user.component";
import {LoanBlacklistUserEditComponent} from "./loan-blacklist-user-edit/loan-blacklist-user-edit.component";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {HrService} from "../../../ad-services/helper/hr.service";
import {LoanBlacklistUserDetailsComponent} from "./loan-blacklist-user-details/loan-blacklist-user-details.component";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-loan-blacklist',
  templateUrl: './loan-blacklist.component.html',
  styleUrls: ['./loan-blacklist.component.scss']
})
export class LoanBlacklistComponent implements OnInit {
  public loading: boolean = false
  public showFilter: boolean = false
  public dataList: Array<any> = []
  public totalPages: number = 0
  public totalItems: number = 0
  public currentPage: number = 1
  public reqData: any = {
    filter: {},
    paging: {
      page: 0,
      size: 10
    }
  }

  public searchForm: FormGroup = this.fb.group({
    firstName: '',
    lastName: '',
    pinfl: '',
    phone: '',
    clientCode: '',
    adminPhone: ''
  })

  constructor(
    private loanService: LoanService,
    private router: Router,
    private dialog: MatDialog,
    private hrService: HrService,
    private fb: FormBuilder
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getData()
  }

  public getData(): void {
    this.loading = true
    this.loanService.loanBlackList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.items
        this.dataList.forEach((e, i) => e.position = (this.reqData.paging.page * this.reqData.paging.size) + (i + 1))
        this.totalPages = res.paging.totalPages
        this.totalItems = res.paging.totalItems
        this.loading = false
      } else
        this.dataList = []
      this.loading = false
    }).catch(e => {
      this.dataList = []
      this.loading = false
      console.log(e)
    })
  }

  public filter(): void {
    if (this.searchForm.value['firstName']) {
      this.reqData.filter['firstName'] = this.searchForm.value['firstName']
    } else {
      delete this.reqData.filter['firstName']
    }

    if (this.searchForm.value['lastName']) {
      this.reqData.filter['lastName'] = this.searchForm.value['lastName']
    } else {
      delete this.reqData.filter['lastName']
    }

    if (this.searchForm.value['pinfl']) {
      this.reqData.filter['pinfl'] = this.searchForm.value['pinfl']
    } else {
      delete this.reqData.filter['pinfl']
    }

    if (this.searchForm.value['phone']) {
      this.reqData.filter['phone'] = this.searchForm.value['phone']
    } else {
      delete this.reqData.filter['phone']
    }

    if (this.searchForm.value['clientCode']) {
      this.reqData.filter['clientCode'] = this.searchForm.value['clientCode']
    } else {
      delete this.reqData.filter['clientCode']
    }


    if (this.searchForm.value['adminPhone']) {
      this.reqData.filter['adminPhone'] = this.searchForm.value['adminPhone']
    } else {
      delete this.reqData.filter['adminPhone']
    }

    this.reqData.paging['page'] = 0
    this.currentPage = 1
    this.getData()
  }

  public clearFilter(): void {
    this.searchForm.patchValue({
      firstName: '',
      lastName: '',
      pinfl: '',
      phone: '',
      clientCode: '',
      adminPhone: ''
    })
    this.reqData = {
      filter: {},
      paging: {page: 0, size: 10}
    }
    this.currentPage = 1
    this.getData()
  }

  // private getSearchForm(): boolean {
  //   return this.searchForm.value['firstName'] || this.searchForm.value['lastName'] || this.searchForm.value['pinfl'] || this.searchForm.value['phone'] || this.searchForm.value['clientCode'] || this.searchForm.value['adminPhone']
  // }

  public openDetailsUserDialog(item: any): void {
    this.dialog.open(LoanBlacklistUserDetailsComponent, {
      width: '600px',
      maxWidth: '600px',
      maxHeight: '700px',
      data: {
        item
      }
    })
  }

  public openAddUserDialog(): void {
    let dialogRef = this.dialog.open(LoanBlacklistAddUserComponent, {
      width: '500px',
      maxWidth: '500px'
    })
    dialogRef.componentInstance.onAdd.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  public openEditUserDialog(item: any): void {
    let dialogRef = this.dialog.open(LoanBlacklistUserEditComponent, {
      width: '500px',
      maxWidth: '500px',
      data: {
        loanType: item.loanType,
        id: item.id,
        adminComment: item.adminComment
      }
    })
    dialogRef.componentInstance.onEdit.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  public openDeleteUserDialog(id: number): void {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы действительно хотите удалить пользователя ?'
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.deleteUser(id)
    })
  }

  private deleteUser(id: number): void {
    this.loanService.loanBlackListDelete({id}).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, res.message ? res.message : 'Успешно!')
        this.getData()
      }
    })
  }

  public pageClicked(val: number) {
    if (this.currentPage !== val) {
      this.reqData.page = val - 1
      this.currentPage = val
      this.getData()
    }
  }

  public pagePrevTo() {
    this.reqData.page--
    this.currentPage--
    this.getData()
  }

  public pageNextTo() {
    this.reqData.page++
    this.currentPage++
    this.getData()
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
