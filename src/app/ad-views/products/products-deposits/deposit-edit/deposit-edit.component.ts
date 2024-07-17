import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {DepositService} from "../../../../ad-services/deposit.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-deposit-edit',
  templateUrl: './deposit-edit.component.html',
  styles: []
})
export class DepositEditComponent implements OnInit {
  imagePath: any = './assets/images/default-image.png'
  conditionTypeList: Array<{displayName:string,code:string}> = []
  uzRequirement: string = ''
  kaaRequirement: string = ''
  enRequirement: string = ''
  documentList: Array<any> = []
  isUnlimited: boolean = true
  text: string = 'Процент'
  depositId: string = ''
  dataObj: any = {}
  translate: Array<any> = []
  editDepositForm: FormGroup = new FormGroup({
    name: new FormControl('Загрузка данных...'),
    annualRate: new FormControl('Загрузка данных...'),
    minAmount: new FormControl('0', []),
    depositCondition: new FormControl('', []),
    enableEarlyClose: new FormControl('', []),
    requirements: new FormControl('Загрузка данных...'),
    periodType: new FormControl('Загрузка данных...'),
    attachmentId: new FormControl('', []),
    currency: new FormControl('Загрузка данных...'),
    // formFile: new FormControl('', []),
    toPeriod: new FormControl('Загрузка данных...'),
    productId: new FormControl('Загрузка данных...'),
    fromPeriod: new FormControl({value: 'Загрузка данных...', disabled: this.dataObj.periodInterval}),
    periodInterval: new FormControl('Загрузка данных...'),
    initialPaymentType: new FormControl('Загрузка данных...'),
    initialPayment: new FormControl('Загрузка данных...'),
    depositType: new FormControl('Загрузка данных...'),
    additional: new FormControl(false),
    decrease: new FormControl(false),
    ofertaId: new FormControl(''),
    translate: new FormGroup({
      uzRequirements: new FormControl(''),
      enRequirements: new FormControl(''),
      kaaRequirements: new FormControl('')
    })
  })

  constructor(
    private depositService: DepositService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(q => {
      this.depositId = q.deposit_id
      this.getData()
      this.getActiveOffers()
      this.getConditions()
    })
  }

  getData() {
    this.depositService.productDepositGet(this.depositId).then(res => {
      if (res) {
        if (res.translate) {
          res.translate.forEach((el: any) => {
            if (el && el.lang) {
              el.lang === "UZB" ? this.uzRequirement = el.value : ''
              el.lang === "ENG" ? this.enRequirement = el.value : ''
              el.lang === "KAA" ? this.kaaRequirement = el.value : ''
            }
          })
        }

        this.dataObj = res
        this.imagePath = res?.imgUrl
        this.editDepositForm.patchValue({
          name: res?.name ? `${res.name}` : 'Нет данных',
          annualRate: res?.annualRate ? `${res.annualRate}` : 'Нет данных',
          minAmount: res?.minAmount ? `${res.minAmount / 100}` : 'Нет данных',
          depositCondition: res?.depositCondition ?res?.depositCondition : '',
          enableEarlyClose: res?.enableEarlyClose ? 'yes' : 'no',
          requirements: res?.requirements ? `${res.requirements}` : 'Нет данных',
          periodType: res?.periodType ? `${res.periodType}` : 'Нет данных',
          attachmentId: res?.attachmentId ? `${res.attachmentId}` : '',
          currency: res?.initialPayment.currency ? `${res.initialPayment.currency}` : 'Нет данных',
          // formFile: new FormControl('', []),
          toPeriod: res?.toPeriod ? `${res.toPeriod}` : '',
          fromPeriod: res?.fromPeriod ? `${res.fromPeriod}` : '',
          periodInterval: res?.periodInterval ? res.periodInterval : false,
          initialPaymentType: res?.initialPaymentType ? `${res.initialPaymentType}` : 'Нет данных',
          productId: res?.productId ? `${res.productId}` : 'Нет данных',
          initialPayment: res?.initialPayment.value ? (res?.initialPayment.scale === 2 ? `${res.initialPayment.value / 100}` : `${res.initialPayment.value}`) : 'Нет данных',
          depositType: res?.depositType ? `${res.depositType}` : 'Нет данных',
          additional: res?.additional ? res.additional : false,
          decrease: res?.decrease ? res.decrease : false,
          ofertaId: res?.ofertaId ? res.ofertaId : '',
          translate: {
            uzRequirements: this.uzRequirement ? this.uzRequirement : '',
            enRequirements: this.enRequirement ? this.enRequirement : '',
            kaaRequirements: this.kaaRequirement ? this.kaaRequirement : ''
          }
        })
        if (res.periodInterval === true) {
          this.editDepositForm.controls['fromPeriod'].enable()
        } else {
          this.editDepositForm.controls['fromPeriod'].disable()
        }
        if (res.periodType === 'UNLIMITED') {
          this.isUnlimited = false
        }
      }
    })
  }

  getActiveOffers(): void {
    this.depositService.documentActiveListByType('DEPOSIT').then((res: any) => {
      if (res) {
        this.documentList = res.body.data
      }
    })
  }

  updateDeposit() {
    if (this.editDepositForm.valid) {
      this.editDepositForm.value.requirements ? this.translate.push({
        key: 'requirements',
        value: this.editDepositForm.value.requirements,
        lang: "RUS"
      }) : ''
      this.editDepositForm.value.translate.uzRequirements ? this.translate.push({
        key: 'requirements',
        value: this.editDepositForm.value.translate.uzRequirements,
        lang: "UZB"
      }) : ''
      this.editDepositForm.value.translate.enRequirements ? this.translate.push({
        key: 'requirements',
        value: this.editDepositForm.value.translate.enRequirements,
        lang: "ENG"
      }) : ''
      this.editDepositForm.value.translate.kaaRequirements ? this.translate.push({
        key: 'requirements',
        value: this.editDepositForm.value.translate.kaaRequirements,
        lang: "KAA"
      }) : ''
      this.depositService.productDepositUpdate({
        id: this.depositId,
        name: this.editDepositForm.value.name,
        annualRate: this.editDepositForm.value.annualRate,
        minAmount: this.editDepositForm.value.minAmount * 100,
        depositCondition: this.editDepositForm.value.depositCondition,
        enableEarlyClose: this.editDepositForm.value.enableEarlyClose === 'yes',
        requirements: this.editDepositForm.value.requirements,
        periodType: this.editDepositForm.value.periodType,
        currency: this.editDepositForm.value.currency,
        toPeriod: this.editDepositForm.value.toPeriod,
        fromPeriod: this.editDepositForm.value.fromPeriod,
        productId: this.editDepositForm.value.productId,
        periodInterval: this.editDepositForm.value.periodInterval,
        initialPaymentType: this.editDepositForm.value.initialPaymentType,
        initialPayment: this.editDepositForm.value.initialPayment,
        depositType: this.editDepositForm.value.depositType,
        attachmentId: this.editDepositForm.value.attachmentId,
        additional: this.editDepositForm.value.additional,
        decrease: this.editDepositForm.value.decrease,
        ofertaId: this.editDepositForm.value.ofertaId,
        translate: this.translate
      }).then((res: any) => {
        if (res) {
          this.router.navigate(['/products/deposits']).then(() => {
          })
          this.showMessage(true, 'Success!')
        }
      })
    }
  }

  logger(event: any) {
    if (event.checked === true) {
      this.editDepositForm.controls['fromPeriod'].enable()
    } else {
      this.editDepositForm.controls['fromPeriod'].disable()
    }
  }

  periodTypeChange(event: any) {
    if (event.value === 'UNLIMITED') {
      this.isUnlimited = false
      this.editDepositForm.value.interval = false
    } else {
      this.isUnlimited = true
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
            this.editDepositForm.patchValue({
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

  initialPaymentTypeChange(event: any) {
    if (event.value === 'AMOUNT') {
      this.text = 'Сумма'
    } else if (event.value === 'RATE') {
      this.text = 'Процент'
    } else {
      this.text = 'Процент'
    }
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }
  getConditions(){
    this.depositService.getConditionTypes().then((res)=>{
      console.log(res)
      this.conditionTypeList = res.conditions
    })
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
