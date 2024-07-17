import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HrService} from "../../../ad-services/helper/hr.service";
import {MyAutoService} from "../../../ad-services/my-auto.service";
import {IModel} from "../../../ad-views/my-auto/models/models.component";

@Component({
  selector: 'app-auto-model-edit-dialog',
  templateUrl: './auto-model-edit-dialog.component.html',
  styleUrls: ['./auto-model-edit-dialog.component.scss']
})
export class AutoModelEditDialogComponent implements OnInit {
  @Output() onEditModel: EventEmitter<any> = new EventEmitter<any>()
  uploadedImg: boolean = false
  uploadedBrandLogo: boolean = false

  createForm: FormGroup = this.fb.group({
    modelId: [null, Validators.required],
    name: ['', Validators.required],
    modelImg: ['', Validators.required],
    modelLogo: ['', Validators.required],
  })

  modelImage: string = ''
  brandLogo: string = ''
  modelImageFile!: File
  brandLogoFile!: File

  constructor(
    private dialogRef: MatDialogRef<AutoModelEditDialogComponent>,
    private fb: FormBuilder,
    private hrService: HrService,
    private myAutoService: MyAutoService,
    @Inject(MAT_DIALOG_DATA) public data: { item: IModel }
  ) {

  }

  ngOnInit(): void {
    this.patchValues()
  }

  patchValues(): void {
    this.createForm.patchValue({
      modelId: this.data.item.id,
      name: this.data.item.name,
      modelImg: this.data.item.image.name,
      modelLogo: this.data.item.modelLogo.name,
    })
    this.brandLogo = `${this.data.item.modelLogo.path}/${this.data.item.modelLogo.name}.${this.data.item.modelLogo.ext}`
    this.modelImage = `${this.data.item.image.path}/${this.data.item.image.name}.${this.data.item.image.ext}`
    this.uploadedImg = true
    this.uploadedBrandLogo = true
    console.log(this.createForm.value)
  }

  createAutoModel(): void {
    if (this.createForm.valid) {
      this.myAutoService.editModel(this.createForm.value).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, 'Успешно обновлен')
          this.onEditModel.emit()
        }
      })
    }
  }

  uploadModelImage(event: any): void {
    this.modelImage = './assets/loader1.svg'
    this.modelImageFile = event.target.files[0]
    this.uploadedImg = true
    if (this.modelImageFile) {
      this.myAutoService.modelImageUpload(this.modelImageFile).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          if (event.result.data) {
            this.createForm.patchValue({
              modelImg: event.result.data.id
            })
            let logoPath = 'https://mob-file-juicer.aab.uz/file/myauto'
            this.modelImage = `${logoPath}/${event.result.data.name}`
          } else {
            this.modelImage = './assets/images/default-image.png'
          }
        }
      }, (e) => {
        console.log(e)
        this.createForm.patchValue({
          modelImg: ''
        })
        this.modelImage = './assets/images/default-image.png'
      })
    } else {
      this.createForm.patchValue({
        modelImg: event.result.data.id
      })
      this.modelImage = './assets/images/default-image.png'
    }
  }

  uploadBrandLogo(event: any): void {
    this.brandLogo = './assets/loader1.svg'
    this.brandLogoFile = event.target.files[0]
    this.uploadedBrandLogo = true
    if (this.brandLogoFile) {
      this.myAutoService.modelImageUpload(this.brandLogoFile).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          if (event.result.data) {
            this.createForm.patchValue({
              modelLogo: event.result.data.id
            })
            let logoPath = 'https://mob-file-juicer.aab.uz/file/myauto'
            this.brandLogo = `${logoPath}/${event.result.data.name}`
          } else {
            this.brandLogo = './assets/images/default-image.png'
          }
        }
      }, (e) => {
        console.log(e)
        this.createForm.patchValue({
          modelLogo: ''
        })
        this.brandLogo = './assets/images/default-image.png'
      })
    } else {
      this.createForm.patchValue({
        modelLogo: event.result.data.id
      })
      this.brandLogo = './assets/images/default-image.png'
    }
  }

  close(): void {
    this.dialogRef.close()
  }
}
