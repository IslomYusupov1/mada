import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BannerService} from "../../../../ad-services/settings/banner.service";
import {AdStatusDialogComponent} from "../../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-banner-content-edit',
  templateUrl: './banner-content-edit.component.html',
  styleUrls: ['./banner-content-edit.component.scss']
})
export class BannerContentEditComponent implements OnInit {
  @Output() onEdit = new EventEmitter<string>()

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
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<BannerContentEditComponent>,
    private bannerService: BannerService,
    @Inject(MAT_DIALOG_DATA) public data: { bannerInfo: any }
  ) {
  }

  titleUzb: string = ''
  titleEng: string = ''
  titleKaa: string = ''
  titleKr: string = ''
  descriptionUzb: string = ''
  descriptionEng: string = ''
  descriptionKaa: string = ''
  descriptionKr: string = ''

  ngOnInit(): void {
    this.patchValues()
  }


  patchValues() {
    if (this.data.bannerInfo && this.data.bannerInfo.translate) {
      console.log(this.data.bannerInfo.translate)
      this.data.bannerInfo.translate.forEach((el: any) => {
        if (el && el.lang) {
          if (el.key === 'title') {
            el.lang === "UZB" ? this.titleUzb = el.value : ''
            el.lang === "ENG" ? this.titleEng = el.value : ''
            el.lang === "KAA" ? this.titleKaa = el.value : ''
            el.lang === "KRL" ? this.titleKr = el.value : ''
          } else if (el.key === 'description') {
            el.lang === "UZB" ? this.descriptionUzb = el.value : ''
            el.lang === "ENG" ? this.descriptionEng = el.value : ''
            el.lang === "KAA" ? this.descriptionKaa = el.value : ''
            el.lang === "KRL" ? this.descriptionKr = el.value : ''
          } else if (el.key === 'attachmentId') {
            el.lang === "UZB" ? this.attachmentIdUzb = el.value : ''
            el.lang === "ENG" ? this.attachmentIdEng = el.value : ''
            el.lang === "KAA" ? this.attachmentIdKaa = el.value : ''
            el.lang === "KRL" ? this.attachmentIdKr = el.value : ''
          }
        } else {
          return
        }
      })

      this.languagesForm.patchValue({
        titleRus: this.data.bannerInfo.title,
        titleUzb: this.titleUzb,
        titleEng: this.titleEng,
        titleKaa: this.titleKaa,
        titleKrl: this.titleKr,
        descriptionRus: this.data.bannerInfo.description,
        descriptionUzb: this.descriptionUzb,
        descriptionEng: this.descriptionEng,
        descriptionKaa: this.descriptionKaa,
        descriptionKrl: this.descriptionKr,
      })

      this.attachmentIdRus = this.data.bannerInfo.attachmentId
      this.imageRus = this.data.bannerInfo.attachmentFullPath
      if (this.attachmentIdRus !== '') {
        this.imageDownloadUzb()
        this.imageDownloadEng()
        this.imageDownloadKaa()
      }
      if (this.attachmentIdKr !== ''){
        this.imageDownloadKr()
      }
    }
  }

  imageDownloadUzb() {
    this.bannerService.bannerFileDownload(this.attachmentIdUzb).then((res: any) => {
      if (res) {
        this.imageUzb = res.fullPath
      }
    })
  }

  imageDownloadEng() {
    this.bannerService.bannerFileDownload(this.attachmentIdEng).then((res: any) => {
      if (res) {
        this.imageEng = res.fullPath
      }
    })
  }

  imageDownloadKaa() {
    this.bannerService.bannerFileDownload(this.attachmentIdKaa).then((res: any) => {
      if (res) {
        this.imageKaa = res.fullPath
      }
    })
  }
  imageDownloadKr() {
    this.bannerService.bannerFileDownload(this.attachmentIdKr).then((res: any) => {
      if (res) {
        this.imageKr = res.fullPath
      }
    })
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

  updateBannerContent() {
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
        this.showMessage(false, 'Прикрепите фото к каракалпакскому контенту!')
        return
      }

      this.bannerService.bannerContentUpdate({
        id: this.data.bannerInfo.id,
        title: this.languagesForm.value.titleRus,
        description: this.languagesForm.value.descriptionRus,
        attachmentId: this.attachmentIdRus,
        bannerId: this.data.bannerInfo.bannerId,
        translate: this.translate
      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Контент баннера успешно обновлен!')
          this.onEdit.emit()
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
