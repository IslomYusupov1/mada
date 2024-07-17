import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PaynetService} from "../../../../ad-services/paynet.service";
import {AdStatusDialogComponent} from "../../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-attach-photo-dialog',
  templateUrl: './attach-photo-dialog.component.html',
  styleUrls: ['./attach-photo-dialog.component.scss']
})
export class AttachPhotoDialogComponent implements OnInit {
  @Output() onAttachPhoto = new EventEmitter<string>()

  image: string = './assets/images/default-image.png'
  attachmentId: string = ''
  // @ts-ignore
  file: File = null

  constructor(
    private dialogRef: MatDialogRef<AttachPhotoDialogComponent>,
    private paymentService: PaynetService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { uuid: string, paymentType: string, logo: any }
  ) {
  }

  ngOnInit(): void {
    if (this.data.logo)
      this.image = `${this.data.logo.path}/${this.data.logo.name}.${this.data.logo.ext}`
  }

  onFileSelected(event: any) {
    this.image = './assets/loader1.svg'
    this.file = event.target.files[0]
    this.paymentService.uploadImg(this.file).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        if (event.result.data) {
          this.attachmentId = event.result.data.id
          this.image = `${this.data.logo.path}/${event.result.data.name}`
        }
      }
    })
  }

  saveAttachedImage() {
    if (this.data.paymentType === 'CATEGORY') {
      this.paymentService.categoryAttachLogo({
        paymentCategoryId: this.data.uuid,
        logo: this.attachmentId
      }).then((res: any) => {
        if (res) {
          this.showMessage(true,'Фотография успешно сохранена')
          this.onAttachPhoto.emit()
        }
      })
    } else if (this.data.paymentType === 'SERVICE') {
      this.paymentService.serviceAttachLogo({
        paymentServiceId: this.data.uuid,
        logo: this.attachmentId
      }).then((res: any) => {
        if (res) {
          this.showMessage(true,'Фотография успешно сохранена')
          this.onAttachPhoto.emit()
        }
      })
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
