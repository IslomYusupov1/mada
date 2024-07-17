import { Component, OnInit } from '@angular/core';
import {UserService} from "../../ad-services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordDialogComponent} from "./change-password-dialog/change-password-dialog.component";

export type TMyInfo = {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  status: string,
  userNO: string | null,
  username: string
}

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  loading: boolean = false
  data!: TMyInfo

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.loading = true
    this.userService.getAdminProfile().then((res: any) => {
      if (res) {
        this.data = res
        this.loading = false
      } else {
        this.loading = false
      }
    })
  }

  openChangePasswordDialog(): void {
    let dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px'
    })
    dialogRef.componentInstance.onChangePassword.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }
}
