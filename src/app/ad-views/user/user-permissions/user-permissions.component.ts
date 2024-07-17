import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {UserService} from "../../../ad-services/user.service";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {RoleAddComponent} from "./role-add/role-add.component";
import {RoleEditComponent} from "./role-edit/role-edit.component";

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styles: []
})
export class UserPermissionsComponent implements OnInit {
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

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  getList() {
    this.loadingList = true
    this.userService.getUserRoles(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.totalPages = res.paging.totalPages
        this.loadingList = false
      }
    })
  }

  openDialogEditPermission(id: number) {
    this.userService.getPermissions().then((response) => {
      if (response) {
        this.userService.getOneRole(id).then((res: any) => {
          if (res) {
            const createRole = this.dialog.open(RoleEditComponent, {
              width: "500px",
              maxWidth: "500px",
              height: '700px',
              maxHeight: '700px',
              data: {
                name: res.name,
                displayName: res.displayName,
                defaultUrl: res.defaultUrl,
                permissions: res.userPermissions,
                id: id,
                permissionTypes: response
              }
            })
            createRole.componentInstance.onEditPermission.subscribe(() => {
              createRole.close()
              this.getList()
            })
          }
        })
      }
    })
  }

  openCreateDialog() {
    this.userService.getPermissions().then((res) => {
      if (res) {
        const createRole = this.dialog.open(RoleAddComponent, {
          width: "500px",
          maxWidth: "500px",
          height: '700px',
          maxHeight: '700px',
          data: {roles: res}
        })
        createRole.componentInstance.onCreateRole.subscribe(() => {
          createRole.close()
          this.getList()
        })
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
