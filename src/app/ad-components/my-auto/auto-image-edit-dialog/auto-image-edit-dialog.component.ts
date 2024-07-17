import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HrService} from "../../../ad-services/helper/hr.service";
import {MyAutoService} from "../../../ad-services/my-auto.service";

@Component({
  selector: 'app-auto-image-edit-dialog',
  templateUrl: './auto-image-edit-dialog.component.html',
  styleUrls: ['./auto-image-edit-dialog.component.scss']
})
export class AutoImageEditDialogComponent implements OnInit {
  @Output() onCreateModel: EventEmitter<any> = new EventEmitter<any>()
  uploadedImg: boolean = false
  createForm: FormGroup = this.fb.group({
    img: ['', Validators.required],
    colorId: [null, Validators.required],
    modelId: [null, Validators.required],
    imgId: [null, Validators.required],
  })

  modelImage: string = ''
  modelImageFile!: File

  constructor(
    private dialogRef: MatDialogRef<AutoImageEditDialogComponent>,
    private fb: FormBuilder,
    private hrService: HrService,
    private myAutoService: MyAutoService,
    @Inject(MAT_DIALOG_DATA) public data: {
      info: any,
      modelId: number,
      colorsList: Array<any>
    }
  ) {
  }

  ngOnInit(): void {
    this.patchValues()
  }

  patchValues(): void {
    this.createForm.patchValue({
      img: this.data.info.image.name,
      modelId: this.data.modelId,
      colorId: this.data.info.colorId,
      imgId: this.data.info.id,
    })
    console.log(this.createForm.value)
    this.modelImage = `${this.data.info.image.path}/${this.data.info.image.name}.${this.data.info.image.ext}`
    this.uploadedImg = true
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
              img: event.result.data.id
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
          img: ''
        })
        this.modelImage = './assets/images/default-image.png'
      })
    } else {
      this.createForm.patchValue({
        img: ''
      })
      this.modelImage = './assets/images/default-image.png'
    }
  }

  editAutoModelImage(): void {
    if (this.createForm.valid) {
      this.myAutoService.editImage(this.createForm.value).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, 'Успешно обновлен!')
          this.onCreateModel.emit()
        }
      })
    }
  }

  close() {
    this.dialogRef.close()
  }
}
