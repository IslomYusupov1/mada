import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BannerService} from "../../../../ad-services/settings/banner.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdStatusDialogComponent} from "../../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-banner-content-create',
  templateUrl: './banner-content-create.component.html',
  styleUrls: ['./banner-content-create.component.scss']
})
export class BannerContentCreateComponent implements OnInit {
  @Output() onCreate = new EventEmitter<string>()
  imageRus: string = './assets/images/default-image.png'
  imageUzb: string = './assets/images/default-image.png'
  imageEng: string = './assets/images/default-image.png'
  imageKaa: string = './assets/images/default-image.png'
  imageKr: string = './assets/images/default-image.png'
  attachmentIdRus: string = ''
  attachmentIdEng: string = ''
  attachmentIdUzb: string = ''
  attachmentIdKaa: string = ''
  attachmentIdKr: string = ''
  translate: Array<any> = []
  // @ts-ignore
  file: File = null

  languagesForm: FormGroup = new FormGroup({
    titleRus: new FormControl('', Validators.required),
    titleUzb: new FormControl('', Validators.required),
    titleEng: new FormControl('', Validators.required),
    titleKaa: new FormControl('', Validators.required),
    titleKrl: new FormControl('', Validators.required),
    descriptionRus: new FormControl('', Validators.required),
    descriptionUzb: new FormControl('', Validators.required),
    descriptionEng: new FormControl('', Validators.required),
    descriptionKaa: new FormControl('', Validators.required),
    descriptionKrl: new FormControl('', Validators.required),
  })

  constructor(
    private bannerService: BannerService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<BannerContentCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bannerId: string }
  ) {
  }

  ngOnInit(): void {
  }

  onUploadFileRus(event: any) {
    this.imageRus = './assets/loader1.svg'
    this.file = event.target.files[0]
    this.bannerService.bannerFileUpload(this.file).subscribe((res: any) => {
      if (res && res.data) {
        this.imageRus = res.data.fullPath
        this.attachmentIdRus = res.data.id
      }
    })
  }

  onUploadFileUzb(event: any) {
    this.imageUzb = './assets/loader1.svg'
    this.file = event.target.files[0]
    this.bannerService.bannerFileUpload(this.file).subscribe((res: any) => {
      if (res && res.data) {
        this.imageUzb = res.data.fullPath
        this.attachmentIdUzb = res.data.id
      }
    })
  }

  onUploadFileEng(event: any) {
    this.imageEng = './assets/loader1.svg'
    this.file = event.target.files[0]
    this.bannerService.bannerFileUpload(this.file).subscribe((res: any) => {
      if (res && res.data) {
        this.imageEng = res.data.fullPath
        this.attachmentIdEng = res.data.id
      }
    })
  }
  onUploadFileKr(event: any) {
    this.imageKr = './assets/loader1.svg'
    this.file = event.target.files[0]
    this.bannerService.bannerFileUpload(this.file).subscribe((res: any) => {
      if (res && res.data) {
        this.imageKr = res.data.fullPath
        this.attachmentIdKr = res.data.id
      }
    })
  }

  onUploadFileKaa(event: any) {
    this.imageKaa = './assets/loader1.svg'
    this.file = event.target.files[0]
    this.bannerService.bannerFileUpload(this.file).subscribe((res: any) => {
      if (res && res.data) {
        this.imageKaa = res.data.fullPath
        this.attachmentIdKaa = res.data.id
      }
    })
  }

  createBannerContent() {
    if (this.languagesForm.valid) {
      if (this.attachmentIdRus !== '') {
        this.translate.push({key: 'title', value: this.languagesForm.value.titleRus, lang: 'RUS'})
        this.translate.push({key: 'description', value: this.languagesForm.value.descriptionRus, lang: 'RUS'})
        this.translate.push({key: 'attachmentId', value: this.attachmentIdRus, lang: 'RUS'})
      } else {
        this.showMessage(false, 'Прикрепите фото к русскоязычному контенту!')
        return
      }

      if (this.attachmentIdEng !== '') {
        this.translate.push({key: 'title', value: this.languagesForm.value.titleEng, lang: 'ENG'})
        this.translate.push({key: 'description', value: this.languagesForm.value.descriptionEng, lang: 'ENG'})
        this.translate.push({key: 'attachmentId', value: this.attachmentIdEng, lang: 'ENG'})
      } else {
        this.showMessage(false, 'Прикрепите фото к английскому контенту!')
        return
      }

      if (this.attachmentIdUzb !== '') {
        this.translate.push({key: 'title', value: this.languagesForm.value.titleUzb, lang: 'UZB'})
        this.translate.push({key: 'description', value: this.languagesForm.value.descriptionUzb, lang: 'UZB'})
        this.translate.push({key: 'attachmentId', value: this.attachmentIdUzb, lang: 'UZB'})
      } else {
        this.showMessage(false, 'Прикрепите фото к узбекскому контенту!')
        return
      }

      if (this.attachmentIdKaa !== '') {
        this.translate.push({key: 'title', value: this.languagesForm.value.titleKaa, lang: 'KAA'})
        this.translate.push({key: 'description', value: this.languagesForm.value.descriptionKaa, lang: 'KAA'})
        this.translate.push({key: 'attachmentId', value: this.attachmentIdKaa, lang: 'KAA'})
      } else {
        this.showMessage(false, 'Прикрепите фото к каракалпакскому контенту!')
        return
      }
      if (this.attachmentIdKr !== '') {
        this.translate.push({key: 'title', value: this.languagesForm.value.titleKrl, lang: 'KRL'})
        this.translate.push({key: 'description', value: this.languagesForm.value.descriptionKrl, lang: 'KRL'})
        this.translate.push({key: 'attachmentId', value: this.attachmentIdKr, lang: 'KRL'})
      } else {
        this.showMessage(false, 'Прикрепите фото к кирилскому контенту!')
        return
      }

      this.bannerService.bannerContentCreate({
        title: this.languagesForm.value.titleRus,
        description: this.languagesForm.value.descriptionRus,
        attachmentId: this.attachmentIdRus,
        bannerId: this.data.bannerId,
        translate: this.translate
      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Контент баннера успешно добавлен!')
          this.onCreate.emit()
        }
      })
    } else {
      this.showMessage(false, 'Заполните все поле контента!')
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
