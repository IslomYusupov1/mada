import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HrService} from "../../../ad-services/helper/hr.service";
import {MyAutoService} from "../../../ad-services/my-auto.service";

@Component({
  selector: 'app-auto-image-create-dialog',
  templateUrl: './auto-image-create-dialog.component.html',
  styleUrls: ['./auto-image-create-dialog.component.scss']
})
export class AutoImageCreateDialogComponent implements OnInit {
  @Output() onCreateModel: EventEmitter<any> = new EventEmitter<any>()
  uploadedImg: boolean = false
  createForm: FormGroup = this.fb.group({
    img: ['', Validators.required],
    colorId: [null, Validators.required],
    modelId: ['', Validators.required],
  })

  modelImage: string = ''
  modelImageFile!: File

  constructor(
    private dialogRef: MatDialogRef<AutoImageCreateDialogComponent>,
    private fb: FormBuilder,
    private hrService: HrService,
    private myAutoService: MyAutoService,
    @Inject(MAT_DIALOG_DATA) public data: {
      colorsList: Array<any>,
      modelId: number
    }
  ) {
  }

  ngOnInit(): void {
    this.createForm.patchValue({
      modelId: this.data.modelId
    })
  }

  createAutoModelImage(): void {
    if (this.createForm.valid) {
      this.myAutoService.addImage(this.createForm.value).then((res: any) => {
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

  close(): void {
    this.dialogRef.close()
  }
}
