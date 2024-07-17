import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TTranslate} from "../create-sms-dialog/create-sms-dialog.component";
import * as moment from "moment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../ad-services/user.service";
import {HrService} from "../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-edit-sms-dialog',
  templateUrl: './edit-sms-dialog.component.html',
  styleUrls: ['./edit-sms-dialog.component.scss']
})
export class EditSmsDialogComponent implements OnInit {
  @Output() editSMS = new EventEmitter<any>();
  loading: boolean = false
  createSMSForm: FormGroup = new FormGroup({
    message: new FormControl(''),
    enMessage: new FormControl(''),
    uzMessage: new FormControl(''),
    kaaMessage: new FormControl(''),
    krlMessage: new FormControl(''),
    timeOfDispatch: new FormControl(''),
    expireTime: new FormControl(''),
    ageFilterEnable: new FormControl(false),
    ageFrom: new FormControl(null),
    ageTo: new FormControl(null),
    zoneFilterEnable: new FormControl(false),
    zoneRed: new FormControl(false),
    zoneYellow: new FormControl(false),
    zoneGreen: new FormControl(false),
    genderFilterEnable: new FormControl(false),
    genderMale: new FormControl(false),
    genderFemale: new FormControl(false),
    genderUnknown: new FormControl(false),
    deviceFilterEnable: new FormControl(false),
    deviceAndroid: new FormControl(false),
    deviceIos: new FormControl(false),
    deviceWeb: new FormControl(false),
  })
  translate: Array<TTranslate> = []

  kaaMessage: string = ''
  krlMessage: string = ''
  uzMessage: string = ''
  enMessage: string = ''
  rusMessage: string = ''
  dateUTC!: string
  expireDateUTC!: string
  checkZone: boolean = false
  checkSex: boolean = false
  device: boolean = false
  checkAge: boolean = false

  constructor(
    private dialogRef: MatDialogRef<EditSmsDialogComponent>,
    private userService: UserService,
    private hrService: HrService,
    @Inject(MAT_DIALOG_DATA) public data: { item: any, id: string }
  ) {
  }

  ngOnInit(): void {
    console.log(this.data.item)
    this.dateUTC = this.data.item.timeOfDispatch ? moment(this.data.item.timeOfDispatch).utc().format() : ''
    this.expireDateUTC = this.data.item.expireTime ? moment(this.data.item.expireTime).utc().format() : ''
    this.patchDataTranslate()
  }

  utcDate(event: any) {
    const date = event.target.value
    this.dateUTC = moment(date).utc().format()
  }

  expireUtcDate(event: any) {
    const date = event.target.value
    this.expireDateUTC = moment(date).utc().format()
  }

  patchDataTranslate() {
    this.loading = true
    if (this.data.item && this.data.item.translate) {
      this.data.item.translate.forEach((el: any) => {
        if (el && el.lang) {
          if (el.key === 'message') {
            el.lang === "UZB" ? this.uzMessage = el.value : ''
            el.lang === "ENG" ? this.enMessage = el.value : ''
            el.lang === "KAA" ? this.kaaMessage = el.value : ''
            el.lang === "KRL" ? this.krlMessage = el.value : ''
            el.lang === "RUS" ? this.rusMessage = el.value : ''
          }
        } else {
          return
        }
      })

      this.createSMSForm.patchValue({
        ageFilterEnable: this.data.item.ageFilterEnable,
        ageFrom: this.data.item.ageFrom,
        ageTo: this.data.item.ageTo,
        zoneFilterEnable: this.data.item.zoneFilterEnable,
        zoneRed: this.data.item.zoneRed,
        zoneYellow: this.data.item.zoneYellow,
        zoneGreen: this.data.item.zoneGreen,
        genderFilterEnable: this.data.item.genderFilterEnable,
        genderMale: this.data.item.genderMale,
        genderFemale: this.data.item.genderFemale,
        genderUnknown: this.data.item.genderUnknown,
        deviceFilterEnable: this.data.item.deviceFilterEnable,
        deviceAndroid: this.data.item.deviceAndroid,
        deviceIos: this.data.item.deviceIos,
        deviceWeb: this.data.item.deviceWeb,
        timeOfDispatch: this.data.item.timeOfDispatch ? moment(this.data.item.timeOfDispatch).utc(true).format().substr(0, 16) : '',
        expireTime: this.data.item.expireTime ? moment(this.data.item.expireTime).utc(true).format().substr(0, 16) : '',
        message: this.rusMessage ? this.rusMessage : '',
        uzMessage: this.uzMessage ? this.uzMessage : '',
        enMessage: this.enMessage ? this.enMessage : '',
        kaaMessage: this.kaaMessage ? this.kaaMessage : '',
        krlMessage: this.krlMessage ? this.krlMessage : '',
      })

      this.check(this.data.item.zoneFilterEnable)
      this.checkMale(this.data.item.genderFilterEnable)
      this.checkDevice(this.data.item.deviceFilterEnable)
      this.checkAgeEvent(this.data.item.ageFilterEnable)
      this.loading = false
    }
  }

  formSubmit(): void {
    if (this.createSMSForm.valid) {
      //title translate
      this.translate = []
      this.createSMSForm.value.message ? this.translate.push({
        key: 'message',
        value: this.createSMSForm.value.message,
        lang: "RUS"
      }) : ''
      this.createSMSForm.value.uzMessage ? this.translate.push({
        key: 'message',
        value: this.createSMSForm.value.uzMessage,
        lang: "UZB"
      }) : ''
      this.createSMSForm.value.enMessage ? this.translate.push({
        key: 'message',
        value: this.createSMSForm.value.enMessage,
        lang: "ENG"
      }) : ''
      this.createSMSForm.value.kaaMessage ? this.translate.push({
        key: 'message',
        value: this.createSMSForm.value.kaaMessage,
        lang: "KAA"
      }) : ''
      this.createSMSForm.value.krlMessage ? this.translate.push({
        key: 'message',
        value: this.createSMSForm.value.krlMessage,
        lang: "KRL"
      }) : ''
      this.userService.editSms({
        uuid: this.data.id,
        body: this.createSMSForm.value.body,
        message: this.createSMSForm.value.message,
        timeOfDispatch: this.dateUTC,
        expireTime: this.expireDateUTC,
        translate: this.translate,
        zoneFilterEnable: this.createSMSForm.value.zoneFilterEnable,
        zoneRed: this.createSMSForm.value.zoneRed,
        zoneYellow: this.createSMSForm.value.zoneYellow,
        zoneGreen: this.createSMSForm.value.zoneGreen,
        genderFilterEnable: this.createSMSForm.value.genderFilterEnable,
        genderMale: this.createSMSForm.value.genderMale,
        genderFemale: this.createSMSForm.value.genderFemale,
        genderUnknown: this.createSMSForm.value.genderUnknown,
        deviceFilterEnable: this.createSMSForm.value.deviceFilterEnable,
        deviceAndroid: this.createSMSForm.value.deviceAndroid,
        deviceIos: this.createSMSForm.value.deviceIos,
        deviceWeb: this.createSMSForm.value.deviceWeb,
        ageFilterEnable: this.createSMSForm.value.ageFilterEnable,
        ageFrom: this.createSMSForm.value.ageFrom,
        ageTo: this.createSMSForm.value.ageTo
      }).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, res.message ? res.message : 'Успешно обновлен!')
          this.editSMS.emit()
        }
      })
    }
  }

  checkMale(check: boolean) {
    this.checkSex = check
    if (!check) {
      this.createSMSForm.patchValue({
        genderMale: false,
        genderFemale: false,
        genderUnknown: false
      })
    }
  }

  checkDevice(check: boolean) {
    this.device = check
    if (!check) {
      this.createSMSForm.patchValue({
        deviceAndroid: false,
        deviceIos: false
      })
    }
  }

  checkAgeEvent(check: boolean) {
    this.checkAge = check
    if (!check) {
      this.createSMSForm.patchValue({
        ageFrom: '',
        ageTo: ''
      })
    }
  }

  check(check: boolean) {
    this.checkZone = check
    if (!check) {
      this.createSMSForm.patchValue({
        zoneRed: false,
        zoneYellow: false,
        zoneGreen: false
      })
    }
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
