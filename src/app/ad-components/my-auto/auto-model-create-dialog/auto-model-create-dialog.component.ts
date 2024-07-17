import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MyAutoService} from "../../../ad-services/my-auto.service";
import {HrService} from "../../../ad-services/helper/hr.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auto-model-create-dialog',
  templateUrl: './auto-model-create-dialog.component.html',
  styleUrls: ['./auto-model-create-dialog.component.scss']
})
export class AutoModelCreateDialogComponent implements OnInit {
  @Output() onCreateModel: EventEmitter<any> = new EventEmitter<any>()
  uploadedImg: boolean = false
  uploadedBrandLogo: boolean = false

  createForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    modelImg: ['', Validators.required],
    modelLogo: ['', Validators.required],
  })

  modelImage: string = ''
  brandLogo: string = ''
  modelImageFile!: File
  brandLogoFile!: File

  constructor(
    private dialogRef: MatDialogRef<AutoModelCreateDialogComponent>,
    private fb: FormBuilder,
    private hrService: HrService,
    private myAutoService: MyAutoService
  ) {
  }

  ngOnInit(): void {
  }

  createAutoModel(): void {
    if (this.createForm.valid) {
      this.myAutoService.addModel(this.createForm.value).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, 'Успешно добавлен')
          this.onCreateModel.emit()
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
