import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../ad-services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import * as moment from "moment";
import {AdStatusDialogComponent} from "../../ad-status-dialog/ad-status-dialog.component";

export type TTranslate = {
  key: string,
  value: string,
  lang: 'UZB' | 'RUS' | 'ENG' | 'KAA' | 'KRL'
}

@Component({
  selector: 'app-create-sms-dialog',
  templateUrl: './create-sms-dialog.component.html',
  styles: []
})


export class CreateSmsDialogComponent implements OnInit {
  @Output() createSMs = new EventEmitter<string>();
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
    public router: Router,
    public dialogCreateSMS: MatDialogRef<CreateSmsDialogComponent>,
    private userService: UserService,
    protected dialog: MatDialog,
  ) {
  }

  utcDate(event: any) {
    const date = event.target.value
    this.dateUTC = moment(date).utc().format()
  }

  expireUtcDate(event: any) {
    const date = event.target.value
    this.expireDateUTC = moment(date).utc().format()
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogCreateSMS.close()
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
      this.userService.createSms({
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
          this.showMessage(true, res.message ? res.message : 'Успешно добавлен!')
          this.createSMs.emit()
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

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

}
