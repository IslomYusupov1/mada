import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DepositService} from "../../../../ad-services/deposit.service";
import {Router} from "@angular/router";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {HrService} from "../../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-deposit-create',
  templateUrl: './deposit-create.component.html',
  styles: []
})
export class DepositCreateComponent implements OnInit {
  isUnlimited: boolean = true
  imagePath: any = './assets/images/default-image.png'
  text: string = 'Процент'
  translate: Array<any> = []
  documentList: Array<any> = []
  conditionTypeList: Array<{displayName:string,code:string}> = []
  createDepositForm: FormGroup = new FormGroup({
    name: new FormControl('', []),
    annualRate: new FormControl('', []),
    minAmount: new FormControl('', []),
    depositCondition: new FormControl('', []),
    enableEarlyClose: new FormControl('', []),
    requirements: new FormControl('', []),
    periodType: new FormControl('', []),
    attachmentId: new FormControl('', []),
    currency: new FormControl('', []),
    // formFile: new FormControl('', []),
    toPeriod: new FormControl('', []),
    fromPeriod: new FormControl({value: '', disabled: true}, []),
    periodInterval: new FormControl(false, []),
    initialPaymentType: new FormControl('', []),
    initialPayment: new FormControl('', []),
    depositType: new FormControl('', []),
    productId: new FormControl('', []),
    additional: new FormControl('', []),
    decrease: new FormControl(false, []),
    ofertaId: new FormControl('', []),
    translate: new FormGroup({
      uzRequirements: new FormControl(''),
      enRequirements: new FormControl(''),
      kaaRequirements: new FormControl('')
    })
  })

  constructor(
    private depositService: DepositService,
    private router: Router,
    public dialog: MatDialog,
    public hr: HrService,
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getActiveOffers()
    this.getConditions()
    this.createDepositForm.patchValue({
      currency:'UZS',
      enableEarlyClose:'yes',
      depositType:'TERM'
    })
  }
  getConditions(){
    this.depositService.getConditionTypes().then((res)=>{
      console.log(res)
      this.conditionTypeList = res.conditions
    })
  }

  createDeposit() {
    if (this.createDepositForm.valid) {
      this.createDepositForm.value.requirements ? this.translate.push({
        key: 'requirements',
        value: this.createDepositForm.value.requirements,
        lang: "RUS"
      }) : ''
      this.createDepositForm.value.translate.uzRequirements ? this.translate.push({
        key: 'requirements',
        value: this.createDepositForm.value.translate.uzRequirements,
        lang: "UZB"
      }) : ''
      this.createDepositForm.value.translate.enRequirements ? this.translate.push({
        key: 'requirements',
        value: this.createDepositForm.value.translate.enRequirements,
        lang: "ENG"
      }) : ''
      this.createDepositForm.value.translate.kaaRequirements ? this.translate.push({
        key: 'requirements',
        value: this.createDepositForm.value.translate.kaaRequirements,
        lang: "KAA"
      }) : ''
      this.depositService.depositCreate({
        name: this.createDepositForm.value.name,
        annualRate: this.createDepositForm.value.annualRate,
        minAmount: this.createDepositForm.value.minAmount * 100,
        depositCondition: this.createDepositForm.value.depositCondition,
        enableEarlyClose: this.createDepositForm.value.enableEarlyClose === 'yes',
        requirements: this.createDepositForm.value.requirements,
        periodType: this.createDepositForm.value.periodType,
        currency: this.createDepositForm.value.currency,
        toPeriod: this.createDepositForm.value.toPeriod,
        fromPeriod: this.createDepositForm.value.fromPeriod,
        periodInterval: this.createDepositForm.value.periodInterval,
        initialPaymentType: this.createDepositForm.value.initialPaymentType,
        initialPayment: this.createDepositForm.value.initialPayment,
        depositType: this.createDepositForm.value.depositType,
        productId: this.createDepositForm.value.productId,
        additional: this.createDepositForm.value.additional,
        decrease: this.createDepositForm.value.decrease,
        ofertaId: this.createDepositForm.value.ofertaId,
        attachmentId: this.createDepositForm.value.attachmentId ? this.createDepositForm.value.attachmentId : null,
        translate: this.translate
      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Success!')
          this.router.navigate(['/products/deposits']).then(() => {
          })
        }
        else {
          this.createDepositForm.patchValue({
            currency:'UZS',
            enableEarlyClose:'yes',
            depositType:'TERM'
          })
        }
      })
    }
  }

  getActiveOffers(): void {
    this.depositService.documentActiveListByType('DEPOSIT').then((res: any) => {
      if (res) {
        this.documentList = res.body.data
      }
    })
  }

  logger(event: any) {
    if (event.checked === true) {
      this.createDepositForm.controls['fromPeriod'].enable()
    } else {
      this.createDepositForm.controls['fromPeriod'].disable()
    }
  }

  periodTypeChange(event: any) {
    if (event.value === 'UNLIMITED') {
      this.isUnlimited = false
      this.createDepositForm.value.interval = false
    } else {
      this.isUnlimited = true
    }
  }

  initialPaymentTypeChange(event: any) {
    console.log(event)
    if (event.value === 'AMOUNT') {
      this.text = 'Сумма'
    } else if (event.value === 'RATE') {
      this.text = 'Процент'
    } else {
      this.text = 'Процент'
    }
  }

  fileUpload(event: any) {
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
      this.imagePath = fileReader.result
      this.depositService.productUploadImg(selectedFile).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          if (event.result.data) {
            this.createDepositForm.patchValue({
              attachmentId: event.result.data.id
            })
          }
        }
      })
    }
    fileReader.onerror = () => {
      this.imagePath = './assets/images/default-image.png'
    }
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  get name() {
    return this.createDepositForm.get('name')
  }

  get annualRate() {
    return this.createDepositForm.get('annualRate')
  }

  get minAmount() {
    return this.createDepositForm.get('minAmount')
  }

  get requirements() {
    return this.createDepositForm.get('requirements')
  }

  get periodType() {
    return this.createDepositForm.get('periodType')
  }

  get currency() {
    return this.createDepositForm.get('currency')
  }

  get initialPaymentType() {
    return this.createDepositForm.get('initialPaymentType')
  }

  get depositType() {
    return this.createDepositForm.get('depositType')
  }

  get initialPayment() {
    return this.createDepositForm.get('initialPayment')
  }

  get depositCondition() {
    return this.createDepositForm.get('depositCondition')
  }

  get enableEarlyClose() {
    return this.createDepositForm.get('enableEarlyClose')
  }

  get productId() {
    return this.createDepositForm.get('productId')
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
