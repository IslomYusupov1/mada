import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PointService} from "../../../ad-services/point.service";
import {AdStatusDialogComponent} from "../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-edit-message-v2',
  templateUrl: './edit-message-v2.component.html',
  styles: [`
    .mat-form-field {
      width: 100%;
    }
  `]
})
export class EditMessageV2Component implements OnInit {
  @Output() onEdit = new EventEmitter<any>()
  createMessage: FormGroup = new FormGroup({
    key: new FormControl('', Validators.required),
    info: new FormControl(''),
    type: new FormControl('', Validators.required),
    messageUz: new FormControl('', Validators.required),
    messageRu: new FormControl('', Validators.required),
    messageEng: new FormControl('', Validators.required),
    messageKaa: new FormControl('', Validators.required),
    messageKr: new FormControl('', Validators.required),
  })

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditMessageV2Component>,
    private pointService: PointService,
    @Inject(MAT_DIALOG_DATA) public data: {
      messageInfo: any,
      types: Array<any>
    }
  ) {
  }

  ngOnInit(): void {
    this.createMessage.patchValue({
      key: this.data.messageInfo['key'],
      info: this.data.messageInfo['info'] ? this.data.messageInfo['info'] : '',
      type: this.data.messageInfo['type'],
      messageUz: this.data.messageInfo['messageUz'],
      messageRu: this.data.messageInfo['messageRu'],
      messageEng: this.data.messageInfo['messageEng'],
      messageKaa: this.data.messageInfo['messageKaa'],
      messageKr: this.data.messageInfo['messageKr'],
    })
  }

  editMessageV2() {
    if (this.createMessage.valid) {
      this.pointService.messageEditV2({
        key: this.createMessage.value.key,
        info: this.createMessage.value.info !== '' ? this.createMessage.value.info : null,
        type: this.createMessage.value.type,
        messageUz: this.createMessage.value.messageUz,
        messageRu: this.createMessage.value.messageRu,
        messageEng: this.createMessage.value.messageEng,
        messageKaa: this.createMessage.value.messageKaa,
        messageKr: this.createMessage.value.messageKr,
      }).then((res: any) => {
        if (res) {
          this.onEdit.emit()
          this.showMessage(true, 'Успешно обновлен!')
        }
      })
    } else {
      this.showMessage(false, 'Заполните все поле!')
    }
  }

  close() {
    this.dialogRef.close()
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }
}
