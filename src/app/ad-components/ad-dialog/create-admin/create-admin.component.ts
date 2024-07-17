import {Component, EventEmitter, Inject, inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../ad-services/user.service";
import {AdStatusDialogComponent} from "../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styles: []
})
export class CreateAdminComponent implements OnInit {
  @Output() createAdmin = new EventEmitter<string>();
  createUserAdminForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    phone: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    roleId: new FormControl(''),
  })

  constructor(
    private userService: UserService,
    public dialogCreate: MatDialogRef<CreateAdminComponent>,
    private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {roles: Array<any>}
  ) {
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogCreate.close()
  }

  formSubmit() {
    if (this.createUserAdminForm.valid) {
      this.userService.createUserAdmin(this.createUserAdminForm.value).then((res: any) => {
        if (res) {
          this.createAdmin.emit()
          this.showMessage(true,'Успешно создан')
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
