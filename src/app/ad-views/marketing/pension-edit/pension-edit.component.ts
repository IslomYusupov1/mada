import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../ad-services/user.service";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-pension-edit',
  templateUrl: './pension-edit.component.html',
  styles: []
})
export class PensionEditComponent implements OnInit {
  @Output() editPension = new EventEmitter<string>();


  editForm: FormGroup = new FormGroup({
    pan: new FormControl('',Validators.compose([Validators.minLength(16), Validators.maxLength(16)])),
    branchAddress: new FormControl(this.data.branchAddress ? this.data.branchAddress : ''),
    uuid: new FormControl(this.data.id ? this.data.id : '')
  })

  constructor(
    public router: Router,
    public dialogEdit: MatDialogRef<PensionEditComponent>,
    private userService: UserService,
    protected dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      id: string,
      cardType: string
      description: string
      phone: string
      fullName: string
      pan: string
      branchAddress: string
    }
  ) {
  }

  ngOnInit(): void {
  }
 closeDialog(){
    this.dialogEdit.close()
 }
  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }
  formSubmit(){
   if (this.editForm.valid){
     this.userService.editPension(this.editForm.value).then((res:any)=>{
       if (res){
         this.showMessage(true,'Успешно редактирован')
         this.editPension.emit()
       }
     })
   }
  }

}
