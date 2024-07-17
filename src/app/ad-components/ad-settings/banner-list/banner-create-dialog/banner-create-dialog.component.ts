import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BannerService} from "../../../../ad-services/settings/banner.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdStatusDialogComponent} from "../../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-banner-create-dialog',
  templateUrl: './banner-create-dialog.component.html',
  styleUrls: ['./banner-create-dialog.component.scss']
})
export class BannerCreateDialogComponent implements OnInit {
  @Output() onCreate = new EventEmitter<string>()
  hasProductId:boolean = false
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
  infoTypeList:Array<{id:number,name:string}>=[]
  // @ts-ignore
  file: File = null
  translates: Array<any> = []
  createForm: FormGroup = new FormGroup({
    type: new FormControl(''),
    productId: new FormControl('', Validators.required),
    redirectKey: new FormControl('', Validators.compose([Validators.required])),
    redirectInApp: new FormControl(true),
    orderNumber: new FormControl(''),
    titleUz: new FormControl('', Validators.compose([Validators.required])),
    descriptionUz: new FormControl('', Validators.compose([Validators.required])),
    titleRu: new FormControl('', Validators.compose([Validators.required])),
    descriptionRu: new FormControl('', Validators.compose([Validators.required])),
    titleEn: new FormControl('', Validators.compose([Validators.required])),
    descriptionEn: new FormControl('', Validators.compose([Validators.required])),
    titleKaa: new FormControl('', Validators.compose([Validators.required])),
    descriptionKaa: new FormControl('', Validators.compose([Validators.required])),
    titleKrl: new FormControl('', Validators.compose([Validators.required])),
    descriptionKrl: new FormControl('', Validators.compose([Validators.required])),
  })

  constructor(
    private bannerService: BannerService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<BannerCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      collectionId: string,
      types: Array<{ productIdRequired: boolean, type: string }>
    }
  ) {
  }

  ngOnInit(): void {

  }


  createBanner() {
    if (this.createForm.valid && this.attachmentIdRus !== '') {
      this.translates = [
        {
          key: 'title',
          value: this.createForm.value.titleUz,
          lang: 'UZB'
        },
        {
          key: 'description',
          value: this.createForm.value.descriptionUz,
          lang: 'UZB'
        },
        {
          key: 'title',
          value: this.createForm.value.titleRu,
          lang: 'RUS'
        },
        {
          key: 'description',
          value: this.createForm.value.descriptionRu,
          lang: 'RUS'
        },
        {
          key: 'title',
          value: this.createForm.value.titleEn,
          lang: 'ENG'
        },
        {
          key: 'description',
          value: this.createForm.value.descriptionEn,
          lang: 'ENG'
        },
        {
          key: 'title',
          value: this.createForm.value.titleKaa,
          lang: 'KAA'
        },
        {
          key: 'description',
          value: this.createForm.value.descriptionKaa,
          lang: 'KAA'
        },
        {
          key: 'title',
          value: this.createForm.value.titleKrl,
          lang: 'KRL'
        },
        {
          key: 'description',
          value: this.createForm.value.descriptionKrl,
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
      this.bannerService.bannerCreate({
        title: this.createForm.value.titleUz,
        description: this.createForm.value.descriptionUz,
        redirectKey: this.createForm.value.redirectKey,
        redirectInApp: this.createForm.value.redirectInApp,
        orderNumber: this.createForm.value.orderNumber ? this.createForm.value.orderNumber : null,
        attachmentId: this.attachmentIdRus,
        collectionId: this.data.collectionId,
        translate: this.translates
      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Баннер успешно добавлен')
          this.onCreate.emit()
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

  getSelectedValue(event: any) {
    let data = this.data.types.find((res) => res.type === event.value)
    if (data?.productIdRequired) {
      this.hasProductId = true
      this.productId?.addValidators([Validators.required])
      this.bannerService.infoBannerType(data.type).then((res)=>{
        this.infoTypeList = res
      })
    } else {
      this.productId?.addValidators([])
      this.hasProductId = false
    }
  }

  get productId() {
    return this.createForm.get('productId')
  }
}
