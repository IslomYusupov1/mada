import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../ad-services/user.service";
import * as moment from "moment";
import {AdStatusDialogComponent} from "../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-edit-notification',
  templateUrl: './edit-notification.component.html',
  styles: [`
    .attached-image {
      width: 100px;
      height: 100px;
      border: 1px solid #cccccc;
      overflow: hidden;

      img {
        width: 100px;
        height: 100px;
        object-fit: contain;
      }
    }
  `]
})
export class EditNotificationComponent implements OnInit {
  loading: boolean = false
  soundList: Array<any> = [
    {name: 'juicer', value: 'juicer'},
    {name: 'juicer conrats', value: 'juicer_conrats'},
    {name: 'juicer message', value: 'juicer_message'},
    {name: 'juicer transfer', value: 'juicer_transfer'},
    {name: 'juicer cashbacks', value: 'juicer_cashbacks'},
  ]
  @Output() editNotification = new EventEmitter<string>();
  imagePath: any = this.data.data.img || './assets/images/default-image.png'
  attachmentRuId: string = ''
  attachmentKrlId: string = ''
  attachmentEnId: string = ''
  attachmentKaaId: string = ''
  attachmentUzId: string = ''
  imagePathEn: any = './assets/images/default-image.png'
  imagePathKrl: any = './assets/images/default-image.png'
  imagePathKaa: any = './assets/images/default-image.png'
  imagePathUz: any = './assets/images/default-image.png'

  translate: Array<any> = []
  kaaShortBody: string = ''
  krlShortBody: string = ''
  uzShortBody: string = ''
  enShortBody: string = ''
  kaaBody: string = ''
  krlBody: string = ''
  uzBody: string = ''
  enBody: string = ''
  kaaTitle: string = ''
  krlTitle: string = ''
  uzTitle: string = ''
  enTitle: string = ''
  dateUTC: any
  checkZone: boolean = false
  checkSex: boolean = false
  device: boolean = false

  editNotificationForm: FormGroup = new FormGroup({
    zoneFilterEnable: new FormControl(false, Validators.required),
    zoneRed: new FormControl(false),
    zoneYellow: new FormControl(false),
    zoneGreen: new FormControl(false),
    zoneGold: new FormControl(false),
    genderFilterEnable: new FormControl(false),
    genderMale: new FormControl(false),
    genderFemale: new FormControl(false),
    genderUnknown: new FormControl(false),
    deviceFilterEnable: new FormControl(false),
    deviceAndroid: new FormControl(false),
    deviceIos: new FormControl(false),
    title: new FormControl(this.data.data.title),
    body: new FormControl(this.data.data.body),
    shortBody: new FormControl(this.data.data.shortBody),
    isCritical: new FormControl(this.data.data.isCritical),
    attachmentId: new FormControl(this.data.data.attachmentId || ''),
    sound: new FormControl(this.data.data.sound),
    timeOfDispatch: new FormControl(this.data.data.timeOfDispatch ? moment(this.data.data.timeOfDispatch).utc(true).format().substr(0, 16) : ''),
    translate: new FormGroup({
      uzTitle: new FormControl(''),
      enTitle: new FormControl(''),
      kaaTitle: new FormControl(''),
      kaaBody: new FormControl(''),
      uzBody: new FormControl(''),
      enBody: new FormControl(''),
      kaaShortBody: new FormControl(''),
      enShortBody: new FormControl(''),
      uzShortBody: new FormControl(''),
      krlTitle: new FormControl(''),
      krlBody: new FormControl(''),
      krlShortBody: new FormControl(''),
    })
  })

  constructor(
    public router: Router,
    public dialogEdit: MatDialogRef<EditNotificationComponent>,
    private userService: UserService,
    protected dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      id: string,
      data: any
    }
  ) {
  }

  ngOnInit(): void {
    this.patchDataTranslate()
    this.dateUTC = this.data.data.timeOfDispatch ? moment(this.data.data.timeOfDispatch).utc().format() : ''
  }

  fnChange(event: any, lang: string) {
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
      this.userService.uploadImageNotify(selectedFile).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          if (event.result.data) {
            if (lang === 'RU') {
              this.attachmentRuId = event.result.data.id
              this.imagePath = fileReader.result
              this.editNotificationForm.patchValue({
                attachmentId: event.result.data.id
              })
            } else if (lang === 'KAA') {
              this.attachmentKaaId = event.result.data.id
              this.imagePathKaa = fileReader.result
            } else if (lang === 'KRL') {
              this.attachmentKrlId = event.result.data.id
              this.imagePathKrl = fileReader.result
            } else if (lang === 'UZ') {
              this.attachmentUzId = event.result.data.id
              this.imagePathUz = fileReader.result
            } else if (lang === 'ENG') {
              this.attachmentEnId = event.result.data.id
              this.imagePathEn = fileReader.result
            } else {
              return
            }

          }
        }
      })
    }
    fileReader.onerror = () => {
      this.imagePath = './assets/images/default-image.png'
    }
  }

  check(check: boolean) {
    this.checkZone = check
    if (!check) {
      this.editNotificationForm.patchValue({
        zoneRed: false,
        zoneYellow: false,
        zoneGreen: false,
        zoneGold: false
      })
    }
  }

  getImageFile(id: string, lang: string) {
    this.userService.notificationFileGet(id).then((res: any) => {
      if (res) {
        switch (lang) {
          case 'ENG':
            this.imagePathEn = res.fullPath
            break;
          case 'UZB':
            this.imagePathUz = res.fullPath
            break;
          case 'KAA':
            this.imagePathKaa = res.fullPath
            break;
          case 'KRL':
            this.imagePathKrl = res.fullPath
            break;
          default:
            return
        }
      }
    })
  }

  checkMale(check: boolean) {
    this.checkSex = check
    if (!check) {
      this.editNotificationForm.patchValue({
        genderMale: false,
        genderFemale: false,
        genderUnknown: false
      })
    }
  }

  checkDevice(check: boolean) {
    this.device = check
    if (!check) {
      this.editNotificationForm.patchValue({
        deviceAndroid: false,
        deviceIos: false
      })
    }
  }

  patchDataTranslate() {
    this.loading = true
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
          } else if (el.key === 'shortBody') {
            el.lang === "UZB" ? this.uzShortBody = el.value : ''
            el.lang === "ENG" ? this.enShortBody = el.value : ''
            el.lang === "KAA" ? this.kaaShortBody = el.value : ''
            el.lang === "KRL" ? this.krlShortBody = el.value : ''
          } else if (el.key === 'attachmentId') {
            el.lang === 'UZB' ? this.getImageFile(el.value, 'UZB') : './assets/images/default-image.png'
            el.lang === 'ENG' ? this.getImageFile(el.value, 'ENG') : './assets/images/default-image.png'
            el.lang === 'KAA' ? this.getImageFile(el.value, 'KAA') : './assets/images/default-image.png'
            el.lang === 'KRL' ? this.getImageFile(el.value, 'KRL') : './assets/images/default-image.png'
          }
        } else {
          return
        }
      })

      this.editNotificationForm.patchValue({
        zoneFilterEnable: this.data.data.zoneFilterEnable,
        zoneRed: this.data.data.zoneRed,
        zoneYellow: this.data.data.zoneYellow,
        zoneGreen: this.data.data.zoneGreen,
        zoneGold: this.data.data.zoneGold,
        genderFilterEnable: this.data.data.genderFilterEnable,
        genderMale: this.data.data.genderMale,
        genderFemale: this.data.data.genderFemale,
        genderUnknown: this.data.data.genderUnknown,
        deviceFilterEnable: this.data.data.deviceFilterEnable,
        deviceAndroid: this.data.data.deviceAndroid,
        deviceIos: this.data.data.deviceIos,
        translate: {
          uzTitle: this.uzTitle ? this.uzTitle : '',
          enTitle: this.enTitle ? this.enTitle : '',
          kaaTitle: this.kaaTitle ? this.kaaTitle : '',
          krlTitle: this.krlTitle ? this.krlTitle : '',

          uzShortBody: this.uzShortBody ? this.uzShortBody : '',
          enShortBody: this.enShortBody ? this.enShortBody : '',
          kaaShortBody: this.kaaShortBody ? this.kaaShortBody : '',
          krlShortBody: this.krlShortBody ? this.krlShortBody : '',

          uzBody: this.uzBody ? this.uzBody : '',
          enBody: this.enBody ? this.enBody : '',
          kaaBody: this.kaaBody ? this.kaaBody : '',
          krlBody: this.krlBody ? this.krlBody : '',
        }
      })

      this.checkZone = this.data.data.zoneFilterEnable
      this.checkSex = this.data.data.genderFilterEnable
      this.device = this.data.data.deviceFilterEnable
      this.loading = false
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
      //shortBody translate
      this.editNotificationForm.value.shortBody ? this.translate.push({
        key: 'shortBody',
        value: this.editNotificationForm.value.shortBody,
        lang: "RUS"
      }) : ''
      this.editNotificationForm.value.translate.uzShortBody ? this.translate.push({
        key: 'shortBody',
        value: this.editNotificationForm.value.translate.uzShortBody,
        lang: "UZB"
      }) : ''
      this.editNotificationForm.value.translate.enShortBody ? this.translate.push({
        key: 'shortBody',
        value: this.editNotificationForm.value.translate.enShortBody,
        lang: "ENG"
      }) : ''
      this.editNotificationForm.value.translate.kaaShortBody ? this.translate.push({
        key: 'shortBody',
        value: this.editNotificationForm.value.translate.kaaShortBody,
        lang: "KAA"
      }) : ''
      this.editNotificationForm.value.translate.krlShortBody ? this.translate.push({
        key: 'shortBody',
        value: this.editNotificationForm.value.translate.krlShortBody,
        lang: "KRL"
      }) : ''
      // attachmentId
      this.attachmentRuId ? this.translate.push({
        key: 'attachmentId',
        value: this.attachmentRuId,
        lang: "RUS"
      }) : ''
      this.attachmentUzId ? this.translate.push({
        key: 'attachmentId',
        value: this.attachmentUzId,
        lang: "UZB"
      }) : ''
      this.attachmentEnId ? this.translate.push({
        key: 'attachmentId',
        value: this.attachmentEnId,
        lang: "ENG"
      }) : ''
      this.attachmentKaaId ? this.translate.push({
        key: 'attachmentId',
        value: this.attachmentKaaId,
        lang: "KAA"
      }) : ''
      this.attachmentKrlId ? this.translate.push({
        key: 'attachmentId',
        value: this.attachmentKrlId,
        lang: "KRL"
      }) : ''
      this.userService.editNotification({
        uuid: this.data.id,
        sound: this.editNotificationForm.value.sound,
        body: this.editNotificationForm.value.body,
        shortBody: this.editNotificationForm.value.shortBody,
        isCritical: false,
        attachmentId: this.editNotificationForm.value.attachmentId,
        iconId: null,
        title: this.editNotificationForm.value.title,
        timeOfDispatch: this.dateUTC,
        translate: this.translate,
        zoneFilterEnable: this.editNotificationForm.value.zoneFilterEnable,
        zoneRed: this.editNotificationForm.value.zoneRed,
        zoneYellow: this.editNotificationForm.value.zoneYellow,
        zoneGreen: this.editNotificationForm.value.zoneGreen,
        zoneGold: this.editNotificationForm.value.zoneGold,
        genderFilterEnable: this.editNotificationForm.value.genderFilterEnable,
        genderMale: this.editNotificationForm.value.genderMale,
        genderFemale: this.editNotificationForm.value.genderFemale,
        genderUnknown: this.editNotificationForm.value.genderUnknown,
        deviceFilterEnable: this.editNotificationForm.value.deviceFilterEnable,
        deviceAndroid: this.editNotificationForm.value.deviceAndroid,
        deviceIos: this.editNotificationForm.value.deviceIos,
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

  closeDialog() {
    this.dialogEdit.close()
  }
}
