import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../ad-services/user.service";
import * as moment from "moment";
import {AdStatusDialogComponent} from "../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-edit-critical-notification',
  templateUrl: './edit-critical-notification.component.html',
  styleUrls: ['./edit-critical-notification.component.scss']
})
export class EditCriticalNotificationComponent implements OnInit {
  @Output() editNotification = new EventEmitter<string>();
  iconPath: any = this.data.data.iconFullPath || './assets/images/default-image.png'
  translate: Array<any> = []
  kaaBody: string = ''
  uzBody: string = ''
  enBody: string = ''
  kaaTitle: string = ''
  uzTitle: string = ''
  enTitle: string = ''
  krlTitle: string = ''
  krlBody: string = ''
  dateUTC: any
  expiryUTC!: string
  isCritical: boolean = true
  editNotificationForm: FormGroup = new FormGroup({
    title: new FormControl(this.data.data.title),
    body: new FormControl(this.data.data.body),
    isCritical: new FormControl(this.data.data.isCritical),
    attachmentId: new FormControl(this.data.data.attachmentId || ''),
    iconId: new FormControl(this.data.data.iconId || ''),
    sound: new FormControl(this.data.data.sound),
    timeOfDispatch: new FormControl(this.data.data.timeOfDispatch ? moment(this.data.data.timeOfDispatch).utc(true).format().substr(0,16) : ''),
    expiryDate: new FormControl(this.data.data.expiryDate ? moment(this.data.data.expiryDate).utc(true).format().substr(0,16) : ''),
    translate: new FormGroup({
      uzTitle: new FormControl(''),
      enTitle: new FormControl(''),
      kaaTitle: new FormControl(''),
      krlTitle: new FormControl(''),
      kaaBody: new FormControl(''),
      uzBody: new FormControl(''),
      enBody: new FormControl(''),
      krlBody: new FormControl(''),
    })
  })

  constructor(
    public router: Router,
    public dialogEdit: MatDialogRef<EditCriticalNotificationComponent>,
    private userService: UserService,
    protected dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      id: string,
      data: any
    }
  ) { }

  ngOnInit(): void {
    this.patchDataTranslate()
    this.isCritical = this.data.data.isCritical
    this.dateUTC = this.data.data.timeOfDispatch ? moment(this.data.data.timeOfDispatch).utc().format() : ''
    this.expiryUTC = this.data.data.expiryDate ? moment(this.data.data.expiryDate).utc().format() : ''
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
            this.editNotificationForm.patchValue({
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

  patchDataTranslate() {
    if (this.data.data && this.data.data.translate) {
      this.data.data.translate.forEach((el: any) => {
        if (el && el.lang) {
          if (el.key === 'title') {
            el.lang === "UZB" ? this.uzTitle = el.value : ''
            el.lang === "ENG" ? this.enTitle = el.value : ''
            el.lang === "KAA" ? this.kaaTitle = el.value : ''
            el.lang === "KRL" ? this.krlTitle = el.value : ''
          } else if (el.key === 'body') {
            el.lang === "UZB" ? this.uzBody = el.value : ''
            el.lang === "ENG" ? this.enBody = el.value : ''
            el.lang === "KAA" ? this.kaaBody = el.value : ''
            el.lang === "KRL" ? this.krlBody = el.value : ''
          }
        } else {
          return
        }
      })

      this.editNotificationForm.patchValue({
        translate: {
          uzTitle: this.uzTitle ? this.uzTitle : '',
          enTitle: this.enTitle ? this.enTitle : '',
          kaaTitle: this.kaaTitle ? this.kaaTitle : '',
          krlTitle: this.krlTitle ? this.krlTitle : '',


          uzBody: this.uzBody ? this.uzBody : '',
          enBody: this.enBody ? this.enBody : '',
          kaaBody: this.kaaBody ? this.kaaBody : '',
          krlBody: this.krlBody ? this.krlBody : '',
        }
      })
    }
  }

  formSubmit() {
    if (this.editNotificationForm.valid) {
      //title translate
      this.translate = []
      this.editNotificationForm.value.title ? this.translate.push({
        key: 'title',
        value: this.editNotificationForm.value.title,
        lang: "RUS"
      }) : ''
      this.editNotificationForm.value.translate.uzTitle ? this.translate.push({
        key: 'title',
        value: this.editNotificationForm.value.translate.uzTitle,
        lang: "UZB"
      }) : ''
      this.editNotificationForm.value.translate.enTitle ? this.translate.push({
        key: 'title',
        value: this.editNotificationForm.value.translate.enTitle,
        lang: "ENG"
      }) : ''
      this.editNotificationForm.value.translate.kaaTitle ? this.translate.push({
        key: 'title',
        value: this.editNotificationForm.value.translate.kaaTitle,
        lang: "KAA"
      }) : ''
      this.editNotificationForm.value.translate.krlTitle ? this.translate.push({
        key: 'title',
        value: this.editNotificationForm.value.translate.krlTitle,
        lang: "KRL"
      }) : ''
      //body translate
      this.editNotificationForm.value.body ? this.translate.push({
        key: 'body',
        value: this.editNotificationForm.value.body,
        lang: "RUS"
      }) : ''
      this.editNotificationForm.value.translate.uzBody ? this.translate.push({
        key: 'body',
        value: this.editNotificationForm.value.translate.uzBody,
        lang: "UZB"
      }) : ''
      this.editNotificationForm.value.translate.enBody ? this.translate.push({
        key: 'body',
        value: this.editNotificationForm.value.translate.enBody,
        lang: "ENG"
      }) : ''
      this.editNotificationForm.value.translate.kaaBody ? this.translate.push({
        key: 'body',
        value: this.editNotificationForm.value.translate.kaaBody,
        lang: "KAA"
      }) : ''
      this.editNotificationForm.value.translate.krlBody ? this.translate.push({
        key: 'body',
        value: this.editNotificationForm.value.translate.krlBody,
        lang: "KRL"
      }) : ''
      this.userService.editNotification({
        uuid: this.data.id,
        body: this.editNotificationForm.value.body,
        isCritical: true,
        iconId: this.editNotificationForm.value.iconId ? this.editNotificationForm.value.iconId : null,
        title: this.editNotificationForm.value.title,
        timeOfDispatch: this.dateUTC,
        expiryDate: this.expiryUTC,
        translate: this.translate
      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Уведомление успешно изменено')
          this.editNotification.emit()
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

  utcDate(event: any) {
    const date = event.target.value
    this.dateUTC = moment(date).utc().format()
  }

  expiryDate(event: any) {
    const date = event.target.value
    this.expiryUTC = moment(date).utc().format()
  }

  closeDialog() {
    this.dialogEdit.close()
  }
}
