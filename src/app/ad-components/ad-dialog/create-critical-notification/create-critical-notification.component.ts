import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { AdStatusDialogComponent } from '../../ad-status-dialog/ad-status-dialog.component';
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../../ad-services/user.service";
import * as moment from "moment";

@Component({
  selector: 'app-create-critical-notification',
  templateUrl: './create-critical-notification.component.html',
  styleUrls: ['./create-critical-notification.component.scss']
})
export class CreateCriticalNotificationComponent implements OnInit {
  @Output() createNotification = new EventEmitter<string>();
  iconPath: string | ArrayBuffer | null = './assets/images/default-image.png'
  dateUTC: any
  expiryUTC!: string
  translate: Array<any> = []
  createNotificationForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
    iconId: new FormControl(''),
    timeOfDispatch: new FormControl(''),
    expiryDate: new FormControl(''),
    translate: new FormGroup({
      uzTitle: new FormControl(''),
      uzBody: new FormControl(''),
      krlBody: new FormControl(''),
      krlTitle: new FormControl(''),
      kaaTitle: new FormControl(''),
      kaaBody: new FormControl(''),
      enTitle: new FormControl(''),
      enBody: new FormControl(''),
    })
  })

  constructor(
    public router: Router,
    public dialogCreate: MatDialogRef<CreateCriticalNotificationComponent>,
    private userService: UserService,
    protected dialog: MatDialog,
  ) {

  }

  iconUploadFn(event: any) {
    let target = event.target
    let selectedFile = target.files[0]
    let type = selectedFile.type.split('/')[0]
    if (type != 'image') {
      alert('пожалуйста, выберите изображение')
      return
    }
    let fileReader = new FileReader()
    fileReader.readAsDataURL(selectedFile)
    fileReader.onload = () => {
      this.iconPath = './assets/loader1.svg'
      this.userService.uploadImageNotify(selectedFile).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          if (event.result.data) {
            this.iconPath = fileReader.result
            this.createNotificationForm.patchValue({
              iconId: event.result.data.id
            })
          }
        }
      })
    }
    fileReader.onerror = () => {
      this.iconPath = './assets/images/default-image.png'
    }
  }

  utcDate(event: any) {
    const date = event.target.value
    this.dateUTC = moment(date).utc().format()
    console.log(this.dateUTC)
  }

  expiryDate(event: any) {
    const date = event.target.value
    this.expiryUTC = moment(date).utc().format()
    console.log(this.expiryUTC)
  }

  formSubmit() {
    if (this.createNotificationForm.valid) {
      //title translate
      this.translate = []
      this.createNotificationForm.value.title ? this.translate.push({
        key: 'title',
        value: this.createNotificationForm.value.title,
        lang: "RUS"
      }) : ''
      this.createNotificationForm.value.translate.uzTitle ? this.translate.push({
        key: 'title',
        value: this.createNotificationForm.value.translate.uzTitle,
        lang: "UZB"
      }) : ''
      this.createNotificationForm.value.translate.enTitle ? this.translate.push({
        key: 'title',
        value: this.createNotificationForm.value.translate.enTitle,
        lang: "ENG"
      }) : ''
      this.createNotificationForm.value.translate.kaaTitle ? this.translate.push({
        key: 'title',
        value: this.createNotificationForm.value.translate.kaaTitle,
        lang: "KAA"
      }) : ''
      this.createNotificationForm.value.translate.krlTitle ? this.translate.push({
        key: 'title',
        value: this.createNotificationForm.value.translate.krlTitle,
        lang: "KRL"
      }) : ''
      //body translate
      this.createNotificationForm.value.body ? this.translate.push({
        key: 'body',
        value: this.createNotificationForm.value.body,
        lang: "RUS"
      }) : ''
      this.createNotificationForm.value.translate.uzBody ? this.translate.push({
        key: 'body',
        value: this.createNotificationForm.value.translate.uzBody,
        lang: "UZB"
      }) : ''
      this.createNotificationForm.value.translate.enBody ? this.translate.push({
        key: 'body',
        value: this.createNotificationForm.value.translate.enBody,
        lang: "ENG"
      }) : ''
      this.createNotificationForm.value.translate.kaaBody ? this.translate.push({
        key: 'body',
        value: this.createNotificationForm.value.translate.kaaBody,
        lang: "KAA"
      }) : ''
      this.createNotificationForm.value.translate.krlBody ? this.translate.push({
        key: 'body',
        value: this.createNotificationForm.value.translate.krlBody,
        lang: "KRL"
      }) : ''

      this.userService.createNotification({
        sound: this.createNotificationForm.value.sound,
        body: this.createNotificationForm.value.body,
        isCritical: true,
        iconId: this.createNotificationForm.value.iconId,
        title: this.createNotificationForm.value.title,
        timeOfDispatch: this.dateUTC,
        expiryDate: this.expiryUTC,
        translate: this.translate
      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Уведомление успешно добавлено')
          this.createNotification.emit()
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

  closeDialog() {
    this.dialogCreate.close()
  }

  ngOnInit(): void {
  }
}
