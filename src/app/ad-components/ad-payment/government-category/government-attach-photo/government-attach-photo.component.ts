import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GovernmentService} from "../../../../ad-services/payment/government.service";
import {HrService} from "../../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-government-attach-photo',
  templateUrl: './government-attach-photo.component.html',
  styleUrls: ['./government-attach-photo.component.scss']
})
export class GovernmentAttachPhotoComponent implements OnInit {
  @Output() onAttachPhoto: EventEmitter<any> = new EventEmitter<any>()
  image: string = './assets/images/default-image.png'
  attachmentId: string = ''
  file!: File

  constructor(
    private dialogRef: MatDialogRef<GovernmentAttachPhotoComponent>,
    private govService: GovernmentService,
    private hrService: HrService,
    @Inject(MAT_DIALOG_DATA) public data: { uuid: string, paymentType: string, logo: any }
  ) {
  }

  ngOnInit(): void {
    if (this.data.logo) {
      this.image = `${this.data.logo.path}/${this.data.logo.name}.${this.data.logo.ext}`
    }
  }

  onFileSelected(event: any) {
    this.image = './assets/loader1.svg'
    this.file = event.target.files[0]
    this.govService.stateImageUpload(this.file).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        if (event.result.data) {
          this.attachmentId = event.result.data.id
          let logoPath = 'https://mob-file-juicer.aab.uz/file/state'
          if (this.data.logo) {
            this.image = `${this.data.logo.path}/${event.result.data.name}`
          } else {
            this.image = `${logoPath}/${event.result.data.name}`
          }
        }
      }
    })
  }

  saveAttachedImage() {
    if (this.data.paymentType === 'CATEGORY') {
      this.govService.stateCategoryAttachLogo({
        id: this.data.uuid,
        logo: this.attachmentId
      }).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, 'Фотография успешно сохранена')
          this.onAttachPhoto.emit()
        }
      })
    } else if (this.data.paymentType === 'SERVICE') {
      this.govService.stateServiceAttachLogo({
        serviceId: this.data.uuid,
        logo: this.attachmentId
      }).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, 'Фотография успешно сохранена')
          this.onAttachPhoto.emit()
        }
      })
    }
  }

  close() {
    this.dialogRef.close()
  }
}
