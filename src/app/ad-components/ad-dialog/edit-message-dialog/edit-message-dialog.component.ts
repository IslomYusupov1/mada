import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {AdStatusDialogComponent} from "../../ad-status-dialog/ad-status-dialog.component";
import {PointService} from "../../../ad-services/point.service";

@Component({
  selector: 'app-edit-message-dialog',
  templateUrl: './edit-message-dialog.component.html',
  styles: [
  ]
})
export class EditMessageDialogComponent implements OnInit {
  @Output() editIssueMessage = new EventEmitter<string>();
  editMessageForm: FormGroup = new FormGroup({
    key: new FormControl(this.data.key, []),
    lang: new FormControl(this.data.lang, []),
    message: new FormControl(this.data.message, []),
  })
  lang: Array<any> = [
    {name: "UZ" , value:"UZB"}, {name: "RU", value:"RUS"}, {name: "EN", value:"ENG"}, {name: "KAA", value:"KAA"}
  ]
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditMessageDialogComponent>,
    private pointService:PointService,
    @Inject(MAT_DIALOG_DATA) public data: {
      messageId: number,
      key: string,
      lang: string,
      message: string
    }
  ) { }

  ngOnInit(): void {
  }
  cancel() {
    this.dialogRef.close()
  }

  editMessage() {
    if (this.editMessageForm.valid) {
      this.pointService.messageEdit({
        id: this.data.messageId,
        key: this.editMessageForm.value.key,
        lang: this.editMessageForm.value.lang,
        message: this.editMessageForm.value.message
      }).then((res: any) => {
        if (res) {
          this.editIssueMessage.emit();
          this.showMessage(true, 'Успешно редактирован')
        }
      }).catch(error => {
        console.log(error)
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
