import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../../ad-services/user.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdStatusDialogComponent} from "../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styles: [
  ]
})
export class EditAdminComponent implements OnInit {
  @Output() editAdmin = new EventEmitter<string>();
  editUserAdminForm: FormGroup = new FormGroup({
    username: new FormControl(this.data.username),
    phone: new FormControl(this.data.phone),
    firstName: new FormControl(this.data.firstName),
    lastName: new FormControl(this.data.lastName),
    email: new FormControl(this.data.email),
    roleId: new FormControl(this.data.roleId),
    id: new FormControl(this.data.id),
    status: new FormControl(this.data.status),

  })
  constructor(
    private userService: UserService,
    public dialogEdit: MatDialogRef<EditAdminComponent>,
    private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      roles: Array<any>
      email:string
      username:string
      phone:string
      lastName:string
      id:string
      firstName:string
      roleId:string
      status:string
    }
  ) { }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogEdit.close()
  }
  formSubmit() {
    if (this.editUserAdminForm.valid) {
      this.userService.editUserAdmin(this.editUserAdminForm.value).then((res: any) => {
        if (res) {
          this.editAdmin.emit()
          this.showMessage(true,'Успешно редактирован')
        }
      })
    }
  }
  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }
}
