import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output
} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BannerService} from "../../../../ad-services/settings/banner.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdStatusDialogComponent} from "../../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-banner-edit-dialog',
  templateUrl: './banner-edit-dialog.component.html',
  styleUrls: ['./banner-edit-dialog.component.scss']
})
export class BannerEditDialogComponent implements OnInit{
  @Output() onEdit = new EventEmitter<string>()
  infoTypeList:Array<{id:number,name:string}>=[]
  hasProductId:boolean = false
  imageRus: string = './assets/images/default-image.png'
  imageUzb: string = './assets/images/default-image.png'
  imageEng: string = './assets/images/default-image.png'
  imageKaa: string = './assets/images/default-image.png'
  imageKr: string = './assets/images/default-image.png'
  attachmentId: string = ''
  attachmentIdRus: string = ''
  attachmentIdEng: string = ''
  attachmentIdUzb: string = ''
  attachmentIdKaa: string = ''
  attachmentIdKr: string = ''
  // @ts-ignore
  file: File = null
  translates: Array<any> = []
  editForm: FormGroup = new FormGroup({

    redirectKey: new FormControl('', Validators.compose([Validators.required])),
    type: new FormControl('', Validators.compose([Validators.required])),
    orderNumber: new FormControl(''),
    productId: new FormControl(''),
    redirectInApp: new FormControl(),
    titleUz: new FormControl('', Validators.compose([Validators.required])),
    titleRu: new FormControl('', Validators.compose([Validators.required])),
    titleEn: new FormControl('', Validators.compose([Validators.required])),
    titleKaa: new FormControl('', Validators.compose([Validators.required])),
    titleKrl: new FormControl('', Validators.compose([Validators.required])),
    descriptionUz: new FormControl('', Validators.compose([Validators.required])),
    descriptionRu: new FormControl('', Validators.compose([Validators.required])),
    descriptionEn: new FormControl('', Validators.compose([Validators.required])),
    descriptionKaa: new FormControl('', Validators.compose([Validators.required])),
    descriptionKrl: new FormControl('', Validators.compose([Validators.required])),
  })

  titleUzb: string = ''
  titleEng: string = ''
  titleKaa: string = ''
  titleKr: string = ''
  titleRu: string = ''
  descriptionUzb: string = ''
  descriptionEng: string = ''
  descriptionKaa: string = ''
  descriptionKr: string = ''
  descriptionRu: string = ''

  constructor(
    private bannerService: BannerService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<BannerEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { info: any ,types:Array<{ type:string ,productIdRequired: boolean}>}
  ) {
  }

  ngOnInit(): void {
    const objInfo = this.data.info
    if (objInfo) {

      this.imageRus = objInfo.iconFullPath
      this.attachmentIdRus = objInfo.attachmentId

      this.patchValues()

    }
    this.includeProductType()
  }

  patchValues() {
    if (this.data.info && this.data.info.translate) {
      console.log(this.data.info.translate)
      this.data.info.translate.forEach((el: any) => {
        if (el && el.lang) {
          if (el.key === 'title') {
            el.lang === "UZB" ? this.titleUzb = el.value : ''
            el.lang === "ENG" ? this.titleEng = el.value : ''
            el.lang === "KAA" ? this.titleKaa = el.value : ''
            el.lang === "KRL" ? this.titleKr = el.value : ''
            el.lang === "RUS" ? this.titleRu = el.value : ''
          } else if (el.key === 'description') {
            el.lang === "UZB" ? this.descriptionUzb = el.value : ''
            el.lang === "ENG" ? this.descriptionEng = el.value : ''
            el.lang === "KAA" ? this.descriptionKaa = el.value : ''
            el.lang === "KRL" ? this.descriptionKr = el.value : ''
            el.lang === "RUS" ? this.descriptionRu = el.value : ''
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

      this.editForm.patchValue({
        titleUz: this.titleUzb,
        titleRu: this.titleRu,
        titleEn: this.titleEng,
        titleKaa: this.titleKaa,
        titleKrl: this.titleKr,
        descriptionRu: this.descriptionRu,
        descriptionUz: this.descriptionUzb,
        descriptionEn: this.descriptionEng,
        descriptionKaa: this.descriptionKaa,
        descriptionKrl: this.descriptionKr,
        redirectKey: this.data.info.redirectKey,
        redirectInApp: this.data.info.redirectInApp,
        orderNumber: this.data.info.orderNumber,
        type: this.data.info['productType'] ? this.data.info['productType'] : '',
        productId: this.data.info.productId ? this.data.info.productId : ''
      })
      if (this.attachmentIdRus !== '') {
        this.imageDownloadUzb()
        this.imageDownloadEng()
        this.imageDownloadKaa()
      }
      if (this.attachmentIdKr !== '') {
        this.imageDownloadKr()
      }
    }
  }


  updateBanner() {
    if (this.imageRus !== '' && this.editForm.valid) {
      this.translates = [
        {
          key: 'title',
          value: this.editForm.value.titleUz,
          lang: 'UZB'
        },
        {
          key: 'description',
          value: this.editForm.value.descriptionUz,
          lang: 'UZB'
        },
        {
          key: 'title',
          value: this.editForm.value.titleRu,
          lang: 'RUS'
        },
        {
          key: 'description',
          value: this.editForm.value.descriptionRu,
          lang: 'RUS'
        },
        {
          key: 'title',
          value: this.editForm.value.titleEn,
          lang: 'ENG'
        },
        {
          key: 'description',
          value: this.editForm.value.descriptionEn,
          lang: 'ENG'
        },
        {
          key: 'title',
          value: this.editForm.value.titleKaa,
          lang: 'KAA'
        },
        {
          key: 'description',
          value: this.editForm.value.descriptionKaa,
          lang: 'KAA'
        },
        {
          key: 'title',
          value: this.editForm.value.titleKrl,
          lang: 'KRL'
        },
        {
          key: 'description',
          value: this.editForm.value.descriptionKrl,
          lang: 'KRL'
        },

      ]
      if (this.attachmentIdRus !== '') {
        this.translates.push({key: 'attachmentId', value: this.attachmentIdRus, lang: 'RUS'})
      } else {
        this.showMessage(false, 'Прикрепите фото к русскоязычному контенту!')
        return
      }

      if (this.attachmentIdEng !== '') {
        this.translates.push({key: 'attachmentId', value: this.attachmentIdEng, lang: 'ENG'})
      } else {
        this.showMessage(false, 'Прикрепите фото к английскому контенту!')
        return
      }

      if (this.attachmentIdUzb !== '') {
        this.translates.push({key: 'attachmentId', value: this.attachmentIdUzb, lang: 'UZB'})
      } else {
        this.showMessage(false, 'Прикрепите фото к узбекскому контенту!')
        return
      }

      if (this.attachmentIdKaa !== '') {
        this.translates.push({key: 'attachmentId', value: this.attachmentIdKaa, lang: 'KAA'})
      } else {
        this.showMessage(false, 'Прикрепите фото к каракалпакскому контенту!')
        return
      }
      if (this.attachmentIdKr !== '') {
        this.translates.push({key: 'attachmentId', value: this.attachmentIdKr, lang: 'KRL'})
      } else {
        this.showMessage(false, 'Прикрепите фото к кирилскому контенту!')
        return
      }
      this.bannerService.bannerUpdate({
        id: this.data.info.id,
        title: this.editForm.value.titleUz,
        type: this.editForm.value.type,
        productId: this.editForm.value.productId,
        description: this.editForm.value.descriptionUz,
        redirectKey: this.editForm.value.redirectKey,
        redirectInApp: this.editForm.value.redirectInApp,
        orderNumber: this.editForm.value.orderNumber ? this.editForm.value.orderNumber : null,
        attachmentId: this.attachmentIdRus,
        translate: this.translates
      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Баннер успешно обновлен!')
          this.onEdit.emit()
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

  close() {
    this.dialogRef.close()
  }

  onUploadFileRus(event: any) {
    this.imageRus = './assets/loader1.svg'
    this.file = event.target.files[0]
    this.bannerService.bannerUpload(this.file).subscribe((res: any) => {
      if (res && res.result.data) {
        this.imageRus = res.result.data.url
        this.attachmentIdRus = res.result.data.id
      }
    })
  }

  onUploadFileUzb(event: any) {
    this.imageUzb = './assets/loader1.svg'
    this.file = event.target.files[0]
    this.bannerService.bannerUpload(this.file).subscribe((res: any) => {
      if (res && res.result.data) {
        this.imageUzb = res.result.data.url
        this.attachmentIdUzb = res.result.data.id
      }
    })
  }

  onUploadFileEng(event: any) {
    this.imageEng = './assets/loader1.svg'
    this.file = event.target.files[0]
    this.bannerService.bannerUpload(this.file).subscribe((res: any) => {
      if (res && res.result.data) {
        this.imageEng = res.result.data.url
        this.attachmentIdEng = res.result.data.id
      }
    })
  }

  onUploadFileKr(event: any) {
    this.imageKr = './assets/loader1.svg'
    this.file = event.target.files[0]
    this.bannerService.bannerUpload(this.file).subscribe((res: any) => {
      if (res && res.result.data) {
        this.imageKr = res.result.data.url
        this.attachmentIdKr = res.result.data.id
      }
    })
  }

  onUploadFileKaa(event: any) {
    this.imageKaa = './assets/loader1.svg'
    this.file = event.target.files[0]
    this.bannerService.bannerUpload(this.file).subscribe((res: any) => {
      if (res && res.result.data) {
        this.imageKaa = res.result.data.url
        this.attachmentIdKaa = res.result.data.id
      }
    })
  }

  imageDownloadUzb() {
    if (this.attachmentIdUzb !== '') {
      this.bannerService.bannerFileDownload(this.attachmentIdUzb).then((res: any) => {
        if (res) {
          this.imageUzb = res['fullPath']
        }
      })
    }
  }

  imageDownloadEng() {
    if (this.attachmentIdEng !== '') {
      this.bannerService.bannerFileDownload(this.attachmentIdEng).then((res: any) => {
        if (res) {
          this.imageEng = res['fullPath']
        }
      })
    }
  }

  imageDownloadKaa() {
    if (this.attachmentIdKaa !== '') {
      this.bannerService.bannerFileDownload(this.attachmentIdKaa).then((res: any) => {
        if (res) {
          this.imageKaa = res['fullPath']
        }
      })
    }
  }

  imageDownloadKr() {
    if (this.attachmentIdKr !== '') {
      this.bannerService.bannerFileDownload(this.attachmentIdKr).then((res: any) => {
        if (res) {
          this.imageKr = res['fullPath']
        }
      })
    }
  }
  getSelected(event: any) {
    let data = this.data.types.find((res) => res.type === event.value)
    console.log(data?.productIdRequired)
    if (data?.productIdRequired) {
      this.hasProductId = true
      this.productId?.addValidators([Validators.required])
      this.bannerService.infoBannerType(data.type).then((res)=>{
        this.infoTypeList = res
      })
    } else {
      this.productId?.setValidators(null)
      this.productId?.updateValueAndValidity()
      this.hasProductId = false
    }
  }

  get productId() {
    return this.editForm.get('productId')
  }

  includeProductType(){
   if (this.data.info['productType'] === 'LOAN' || this.data.info['productType'] === 'DEPOSIT'){
     this.bannerService.infoBannerType(this.data.info['productType']).then((res)=>{
       this.infoTypeList = res
       this.hasProductId = true
     })
   }
  }
}
