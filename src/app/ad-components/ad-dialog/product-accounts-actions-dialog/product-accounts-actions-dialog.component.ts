import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {DepositService} from "../../../ad-services/deposit.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PointService} from "../../../ad-services/point.service";
import {HrService} from "../../../ad-services/helper/hr.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {productList} from "../../../ad-views/products/product-accounts/product-accounts.component";

@Component({
  selector: 'app-product-accounts-actions-dialog',
  templateUrl: './product-accounts-actions-dialog.component.html',
  styles: []
})
export class ProductAccountsActionsDialogComponent implements OnInit {
  @Output() createEditAccount = new EventEmitter<void>()
  type: string = ''
  imagePath: any = './assets/images/default-image.png'
  imagePathEdit: any = './assets/images/default-image.png'
  createAccountForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    productCode: new FormControl('', Validators.required),
    logo: new FormControl('', Validators.required)

  })
  editAccountForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    productCode: new FormControl('', Validators.required),
    logo: new FormControl('', Validators.required),
    active: new FormControl('', Validators.required)


  })

  constructor(
    private _depositService: DepositService,
    private _point: PointService,
    private _hr: HrService,
    @Inject(MAT_DIALOG_DATA) public data = {} as productList
  ) {
  }

  ngOnInit(): void {
    if (this.data) {
      if (this.data.logo) {
        this.imagePathEdit = `${this.data.logo.path}/${this.data.logo.name}.${this.data.logo.ext}`
      }
      this.editAccountForm.patchValue({
        id: this.data.id,
        productCode: this.data.productCode,
        title: this.data.title,
        active: this.data.active,
        logo: this.data.logo ? this.data.logo.name : ''
      })
      this.type = 'edit'
    } else {
      this.type = 'create'
    }
    console.log(this.type)
  }

  fileUpload(event: any) {
    let target = event.target
    let selectedFile = target.files[0]
    let type = selectedFile.type.split('/')[0]
    if (type != 'image') {
      alert('пожалуйста, выберите изображение')
      return
    }
    this.imagePath = './assets/loader1.svg'
    let fileReader = new FileReader()
    fileReader.readAsDataURL(selectedFile)
    fileReader.onload = () => {
      this.imagePath = fileReader.result
      this._depositService.productUploadImg(selectedFile).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          if (event.result.data) {
            this.createAccountForm.patchValue({
              logo: event.result.data.id
            })
          }
        }
      })
    }
    fileReader.onerror = () => {
      this.imagePath = './assets/images/default-image.png'
    }
  }

  fileUploadEdit(event: any) {
    let target = event.target
    let selectedFile = target.files[0]
    let type = selectedFile.type.split('/')[0]
    if (type != 'image') {
      alert('пожалуйста, выберите изображение')
      return
    }
    this.imagePathEdit = './assets/loader1.svg'
    let fileReader = new FileReader()
    fileReader.readAsDataURL(selectedFile)
    fileReader.onload = () => {
      this.imagePathEdit = fileReader.result
      this._depositService.productUploadImg(selectedFile).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          if (event.result.data) {
            this.editAccountForm.patchValue({
              logo: event.result.data.id
            })
          }
        }
      })
    }
    fileReader.onerror = () => {
      this.imagePathEdit = './assets/images/default-image.png'
    }
  }

  productAction(type: string) {
    if (type === 'create') {
      if (this.createAccountForm.valid) {
        this._point.createProductAccount(this.createAccountForm.value).then((res: any) => {
          if (res) {
            this._hr.showMessage(true, 'Успешно')
            this.createEditAccount.emit()
          }
        })
      }
    } else {
      if (this.editAccountForm.valid) {
        this._point.editProductAccount(this.editAccountForm.value).then((res: any) => {
          if (res) {
            this._hr.showMessage(true, 'Успешно')
            this.createEditAccount.emit()
          }
        })
      }
    }
  }

}
