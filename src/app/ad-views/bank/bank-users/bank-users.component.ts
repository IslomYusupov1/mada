import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../ad-services/user.service";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {BankAdminDetailComponent} from "../../../ad-components/ad-dialog/bank-admin-detail/bank-admin-detail.component";
import {CreateAdminComponent} from "../../../ad-components/ad-dialog/create-admin/create-admin.component";
import {EditAdminComponent} from "../../../ad-components/ad-dialog/edit-admin/edit-admin.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";

export type TRoleItem = {
  name: string,
  displayName: string,
  id: string
}

@Component({
  selector: 'app-bank-users',
  templateUrl: './bank-users.component.html',
  styles: []
})
export class BankUsersComponent implements OnInit {

  dataList: Array<any> = []
  roleList: Array<TRoleItem> = []
  loadingList: boolean = false
  totalPages: number = 1
  currentPage: number = 1
  reqData: any = {
    paging: {
      page: 0,
      size: 10
    }
  }

  filterForm: FormGroup = this.fb.group({
    phone: '',
    firstName: '',
    lastName: '',
    roleId: '',
  })

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getList()
    this.getRoleList()
  }

  adminCreateDialog() {
    this.userService.getUserRoles({page: 0, size: 100}).then((res: any) => {
      let dialogRef = this.dialog.open(CreateAdminComponent, {
        maxWidth: '445px',
        width: '445px',
        data: {
          roles: res.content
        }
      });
      dialogRef.componentInstance.createAdmin.subscribe(() => {
        dialogRef.close()
        this.getList()
      })
    })
  }

  openEditDialog(id: string) {
    this.userService.userAdminOne(id).then((response: any) => {
      this.userService.getUserRoles({page: 0, size: 100}).then((res: any) => {
        let dialogRef = this.dialog.open(EditAdminComponent, {
          maxWidth: '445px',
          width: '445px',
          data: {
            roles: res.content,
            email: response.email,
            username: response.username,
            phone: response.phone,
            lastName: response.lastName,
            id: response.id,
            firstName: response.firstName,
            roleId: response.role.id,
            status: response.status
          }
        });
        dialogRef.componentInstance.editAdmin.subscribe(() => {
          dialogRef.close()
          this.getList()
        })
      })
    })
  }

  openDeleteDialog(id: string): void {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent,{
      data: {
        title: 'Вы действительно хотите удалить пользователя ?'
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.deleteAdminUser(id)
    })
  }

  deleteAdminUser(id: string): void {
    this.userService.deleteAdminUser(id).then((res: any) => {
      if (res) {
        this.showMessage(true, res.message ? res.message : '')
        this.getList()
      }
    })
  }

  getList() {
    this.loadingList = true
    this.userService.getAdminUserFilterList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.dataList.forEach((item, i) => {
          item.position = (this.reqData.paging.page * this.reqData.paging.size) + (i + 1)
        })
        this.totalPages = res.paging.totalPages
        this.loadingList = false
      }
    })
  }

  getRoleList(): void {
    this.userService.getRoles().then((res: any) => {
      if (res) {
        this.roleList = res
        this.roleList.unshift({
          displayName: 'All',
          name: 'All',
          id: '',
        })
      }
    })
  }

  showFilter(): void {
    if (this.filterForm.value.firstName) {
      this.reqData['firstName'] = this.filterForm.value.firstName
    } else {
      delete this.reqData['firstName']
    }

    if (this.filterForm.value.lastName) {
      this.reqData['lastName'] = this.filterForm.value.lastName
    } else {
      delete this.reqData['lastName']
    }

    if (this.filterForm.value.phone) {
      this.reqData['phone'] = this.filterForm.value.phone
    } else {
      delete this.reqData['phone']
    }

    if (this.filterForm.value.roleId) {
      this.reqData['roleId'] = this.filterForm.value.roleId
    } else {
      delete this.reqData['roleId']
    }

    this.reqData.paging['page'] = 0
    this.currentPage = 1
    this.getList()
  }

  refreshFilter(): void {
    this.filterForm.patchValue({
      firstName: '',
      lastName: '',
      phone: '',
      roleId: '',
    })
    this.currentPage = 1
    this.reqData = {
      paging: {
        page: 0,
        size: 10
      }
    }
    this.getList()
  }

  detail(id: string) {
    this.userService.userAdminOne(id).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(BankAdminDetailComponent, {
          maxWidth: '445px',
          width: '445px',
          data: {
            userAdminList: res
          }
        });
        dialogRef.componentInstance.detailBankAdmin.subscribe(() => {
          dialogRef.close()
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

  pageClicked(val: number) {
    this.reqData.paging.page = val - 1
    this.currentPage = val
    this.getList()
  }

  pagePrevTo() {
    this.reqData.paging.page--
    this.currentPage--
    this.getList()
  }

  pageNextTo() {
    this.reqData.paging.page++
    this.currentPage++
    this.getList()
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
