import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../ad-services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import * as moment from "moment";
import {AdStatusDialogComponent} from "../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-create-notification-dialog',
  templateUrl: './create-notification-dialog.component.html',
  styles: []
})
export class CreateNotificationDialogComponent implements OnInit {
  soundList: Array<any> = [
    {name: 'juicer', value: 'juicer'},
    {name: 'juicer conrats', value: 'juicer_conrats'},
    {name: 'juicer message', value: 'juicer_message'},
    {name: 'juicer transfer', value: 'juicer_transfer'},
    {name: 'juicer cashbacks', value: 'juicer_cashbacks'},

  ]
  attachmentRuId: string = ''
  attachmentKrlId: string = ''
  attachmentEnId: string = ''
  attachmentKaaId: string = ''
  attachmentUzId: string = ''
  imagePathEn: any = './assets/images/default-image.png'
  imagePathKrl: any = './assets/images/default-image.png'
  imagePathKaa: any = './assets/images/default-image.png'
  imagePathUz: any = './assets/images/default-image.png'
  imagePath: any = './assets/images/default-image.png'
  @Output() createNotification = new EventEmitter<string>();
  dateUTC: any
  expiryUTC!: string
  checkZone: boolean = false
  checkSex: boolean = false
  device: boolean = false
  translate: Array<any> = []
  createNotificationForm: FormGroup = new FormGroup({
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
    title: new FormControl(''),
    body: new FormControl(''),
    shortBody: new FormControl(''),
    attachmentId: new FormControl(''),
    iconId: new FormControl(''),
    sound: new FormControl(''),
    isCritical: new FormControl(false),
    timeOfDispatch: new FormControl(''),
    expiryDate: new FormControl(''),
    translate: new FormGroup({
      uzTitle: new FormControl(''),
      enTitle: new FormControl(''),
      kaaTitle: new FormControl(''),
      krlTitle: new FormControl(''),
      kaaBody: new FormControl(''),
      uzBody: new FormControl(''),
      enBody: new FormControl(''),
      krlBody: new FormControl(''),
      kaaShortBody: new FormControl(''),
      enShortBody: new FormControl(''),
      uzShortBody: new FormControl(''),
      krlShortBody: new FormControl(''),
    })
  })

  constructor(
    public router: Router,
    public dialogCreate: MatDialogRef<CreateNotificationDialogComponent>,
    private userService: UserService,
    protected dialog: MatDialog,
  ) {

  }

  check(check: boolean) {
    this.checkZone = check
    if (!check) {
      this.createNotificationForm.patchValue({
        zoneRed: false,
        zoneYellow: false,
        zoneGreen: false,
        zoneGold:false
      })
    }
  }

  checkMale(check: boolean) {
    this.checkSex = check
    if (!check) {
      this.createNotificationForm.patchValue({
        genderMale: false,
        genderFemale: false,
        genderUnknown: false
      })
    }
  }

  checkDevice(check: boolean) {
    this.device = check
    if (!check) {
      this.createNotificationForm.patchValue({
        deviceAndroid: false,
        deviceIos: false
      })
    }
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
              this.createNotificationForm.patchValue({
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

  utcDate(event: any) {
    const date = event.target.value
    this.dateUTC = moment(date).utc().format()
  }

  formSubmit() {
    if (this.createNotificationForm.valid) {
      //title translate
      this.translate = []
      this.createNotificationForm.value.title ? this.translate.push({
        key: 'title',
        value: this.createNotificationForm.value.title,
        lang: "RUS",
      }) : ''
      this.createNotificationForm.value.translate.uzTitle ? this.translate.push({
        key: 'title',
        value: this.createNotificationForm.value.translate.uzTitle,
        lang: "UZB",
      }) : ''
      this.createNotificationForm.value.translate.enTitle ? this.translate.push({
        key: 'title',
        value: this.createNotificationForm.value.translate.enTitle,
        lang: "ENG",
      }) : ''
      this.createNotificationForm.value.translate.kaaTitle ? this.translate.push({
        key: 'title',
        value: this.createNotificationForm.value.translate.kaaTitle,
        lang: "KAA",
      }) : ''
      this.createNotificationForm.value.translate.krlTitle ? this.translate.push({
        key: 'title',
        value: this.createNotificationForm.value.translate.krlTitle,
        lang: "KRL",
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
      //shortBody translate
      this.createNotificationForm.value.shortBody ? this.translate.push({
        key: 'shortBody',
        value: this.createNotificationForm.value.shortBody,
        lang: "RUS"
      }) : ''
      this.createNotificationForm.value.translate.uzShortBody ? this.translate.push({
        key: 'shortBody',
        value: this.createNotificationForm.value.translate.uzShortBody,
        lang: "UZB"
      }) : ''
      this.createNotificationForm.value.translate.enShortBody ? this.translate.push({
        key: 'shortBody',
        value: this.createNotificationForm.value.translate.enShortBody,
        lang: "ENG"
      }) : ''
      this.createNotificationForm.value.translate.kaaShortBody ? this.translate.push({
        key: 'shortBody',
        value: this.createNotificationForm.value.translate.kaaShortBody,
        lang: "KAA"
      }) : ''
      this.createNotificationForm.value.translate.krlShortBody ? this.translate.push({
        key: 'shortBody',
        value: this.createNotificationForm.value.translate.krlShortBody,
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


      this.userService.createNotification({
        sound: this.createNotificationForm.value.sound,
        body: this.createNotificationForm.value.body,
        shortBody: this.createNotificationForm.value.shortBody,
        isCritical: false,
        attachmentId: this.createNotificationForm.value.attachmentId,
        iconId: null,
        title: this.createNotificationForm.value.title,
        timeOfDispatch: this.dateUTC,
        expiryDate: this.expiryUTC,
        translate: this.translate,
        zoneFilterEnable: this.createNotificationForm.value.zoneFilterEnable,
        zoneRed: this.createNotificationForm.value.zoneRed,
        zoneYellow: this.createNotificationForm.value.zoneYellow,
        zoneGreen: this.createNotificationForm.value.zoneGreen,
        zoneGold: this.createNotificationForm.value.zoneGold,
        genderFilterEnable: this.createNotificationForm.value.genderFilterEnable,
        genderMale: this.createNotificationForm.value.genderMale,
        genderFemale: this.createNotificationForm.value.genderFemale,
        genderUnknown: this.createNotificationForm.value.genderUnknown,
        deviceFilterEnable: this.createNotificationForm.value.deviceFilterEnable,
        deviceAndroid: this.createNotificationForm.value.deviceAndroid,
        deviceIos: this.createNotificationForm.value.deviceIos,
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
