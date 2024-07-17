import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LoanService} from "../../../../ad-services/loan.service";
import {MatDialog} from "@angular/material/dialog";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {Location} from "@angular/common";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {DepositService} from "../../../../ad-services/deposit.service";

@Component({
  selector: 'app-loans-edit',
  templateUrl: './loans-edit.component.html',
  styles: []
})
export class LoansEditComponent implements OnInit {
  translate: Array<any> = []
  documentList: Array<any> = []
  loanId: string = ''
  loanTypeId: string = ''
  imagePath: any = './assets/images/default-image.png'
  uzPrivilegedPeriodDescription: string = ''
  enPrivilegedPeriodDescription: string = ''
  kaaPrivilegedPeriodDescription: string = ''
  text: string = 'Первоначальный взнос'
  uzRequirement: string = ''
  kaaRequirement: string = ''
  enRequirement: string = ''
  uzAgeRequirement: string = ''
  kaaAgeRequirement: string = ''
  enAgeRequirement: string = ''
  loanEditForm: FormGroup = new FormGroup({
    name: new FormControl('Загрузка данных...', []),
    annualRate: new FormControl('0', []),
    insurancePercent: new FormControl('0', []),
    requirements: new FormControl('Загрузка данных...', []),
    ageRequirement: new FormControl('Загрузка данных...', []),
    privilegedPeriodDescription: new FormControl('Загрузка данных...', []),
    privilegedPeriod: new FormControl('0', []),
    attachmentId: new FormControl('0', []),
    currency: new FormControl('Загрузка данных...', []),
    minValue: new FormControl('0', []),
    maxValue: new FormControl('0', []),
    initialPaymentType: new FormControl('Загрузка данных...', []),
    initialPayment: new FormControl('0', []),
    periodType: new FormControl('Загрузка данных...', []),
    periodInterval: new FormControl(false, []),
    fromPeriod: new FormControl({value: 'Загрузка данных...', disabled: false}, []),
    productId: new FormControl('Загрузка данных...', []),
    toPeriod: new FormControl('0', []),
    ofertaId: new FormControl('', []),
    translate: new FormGroup({
      uzRequirements: new FormControl(),
      kaaRequirements: new FormControl(),
      enRequirements: new FormControl(),
      uzAgeRequirement: new FormControl(),
      enAgeRequirement: new FormControl(),
      kaaAgeRequirement: new FormControl(),
      uzPrivilegedPeriodDescription: new FormControl(),
      enPrivilegedPeriodDescription: new FormControl(),
      kaaPrivilegedPeriodDescription: new FormControl(),
    })
  })

  constructor(
    private route: ActivatedRoute,
    private loanService: LoanService,
    private depositService: DepositService,
    private _location: Location,
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
    this.route.queryParams.subscribe(q => {
      this.loanId = q.loan_id
      this.getData(q.loan_id)
      this.getActiveOffers()
    })
  }

  getData(id: string) {
    this.loanService.productLoanGet(id).then((res: any) => {
      if (res) {
        if (res.translate) {
          res.translate.forEach((el: any) => {
            if (el && el.lang) {
              if (el.key === 'requirements') {
                el.lang === "UZB" ? this.uzRequirement = el.value : ''
                el.lang === "ENG" ? this.enRequirement = el.value : ''
                el.lang === "KAA" ? this.kaaRequirement = el.value : ''
              } else if (el.key === 'ageRequirement') {
                el.lang === "UZB" ? this.uzAgeRequirement = el.value : ''
                el.lang === "ENG" ? this.enAgeRequirement = el.value : ''
                el.lang === "KAA" ? this.kaaAgeRequirement = el.value : ''
              } else if (el.key === 'privilegedPeriodDescription') {
                el.lang === "UZB" ? this.uzPrivilegedPeriodDescription = el.value : ''
                el.lang === "ENG" ? this.enPrivilegedPeriodDescription = el.value : ''
                el.lang === "KAA" ? this.kaaPrivilegedPeriodDescription = el.value : ''
              }
            } else {
              return
            }
          })
        }
        this.imagePath = res?.imgUrl ? res?.imgUrl : './assets/images/default-image.png'
        this.loanEditForm.patchValue({
          name: res.name ? `${res.name}` : 'Нет данных',
          annualRate: res.annualRate ? `${res.annualRate}` : '0',
          attachmentId: res.attachmentId ? `${res.attachmentId}` : '',
          insurancePercent: res.insurancePercent ? `${res.insurancePercent}` : '0',
          requirements: res.requirements ? `${res.requirements}` : 'Нет данных',
          ageRequirement: res.ageRequirement ? `${res.ageRequirement}` : 'Нет данных',
          privilegedPeriodDescription: res.privilegedPeriodDescription ? `${res.privilegedPeriodDescription}` : 'Нет данных',
          privilegedPeriod: res.privilegedPeriod ? `${res.privilegedPeriod}` : '0',
          currency: res.currency ? `${res.currency}` : 'Нет данных',
          minValue: res.minValue ? `${res.minValue / 100}` : '0',
          maxValue: res.maxValue ? `${res.maxValue / 100}` : '0',
          initialPaymentType: res.initialPaymentType ? `${res.initialPaymentType}` : 'Нет данных',
          initialPayment: res.initialPayment ? (res.initialPayment === 'AMOUNT' ? res.initialPayment / 100 : res.initialPayment) : '0',
          periodType: res.periodType ? `${res.periodType}` : 'Нет данных',
          periodInterval: res.periodInterval ? res.periodInterval : false,
          productId: res.productId ? `${res.productId}` : 'Нет данных',
          fromPeriod: res.fromPeriod ? `${res.fromPeriod}` : '',
          toPeriod: res.toPeriod ? `${res.toPeriod}` : '0',
          ofertaId: res.ofertaId ? `${res.ofertaId}` : '',
          translate: {
            uzRequirements: this.uzRequirement ? this.uzRequirement : '',
            enRequirements: this.enRequirement ? this.enRequirement : '',
            kaaRequirements: this.kaaRequirement ? this.kaaRequirement : '',

            uzAgeRequirement: this.uzAgeRequirement ? this.uzAgeRequirement : '',
            enAgeRequirement: this.enAgeRequirement ? this.enAgeRequirement : '',
            kaaAgeRequirement: this.kaaAgeRequirement ? this.kaaAgeRequirement : '',

            uzPrivilegedPeriodDescription: this.uzPrivilegedPeriodDescription ? this.uzPrivilegedPeriodDescription : '',
            kaaPrivilegedPeriodDescription: this.kaaPrivilegedPeriodDescription ? this.kaaPrivilegedPeriodDescription : '',
            enPrivilegedPeriodDescription: this.enPrivilegedPeriodDescription ? this.enPrivilegedPeriodDescription : '',
          }
        })
        if (res.periodInterval === true) {
          this.loanEditForm.controls['fromPeriod'].enable()
        } else {
          this.loanEditForm.controls['fromPeriod'].disable()
        }
        this.loanTypeId = res.loanTypeId
      }
    })
  }

  getActiveOffers(): void {
    this.depositService.documentActiveListByType('LOAN').then((res: any) => {
      if (res) {
        this.documentList = res.body.data
      }
    })
  }

  fileUpload(event: any) {
    let target = event.target
    let selectedFile = target.files[0]
    let type = selectedFile.type.split('/')[0]
    if (type != 'image') {
      alert('пожалуйста, выберите изображение')
      return
    }
    this.imagePath = './assets/loader1.svg'
    let fileReader = new FileReader()
    fileReader.readAsDataURL(selectedFile)
    fileReader.onload = () => {
      this.depositService.productUploadImg(selectedFile).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          if (event.result.data) {
            this.imagePath = fileReader.result
            this.loanEditForm.patchValue({
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

  editLoan() {
    if (this.loanEditForm.valid) {
      this.loanEditForm.value.requirements ? this.translate.push({
        key: 'requirements',
        value: this.loanEditForm.value.requirements,
        lang: "RUS"
      }) : ''
      this.loanEditForm.value.translate.uzRequirements ? this.translate.push({
        key: 'requirements',
        value: this.loanEditForm.value.translate.uzRequirements,
        lang: "UZB"
      }) : ''
      this.loanEditForm.value.translate.enRequirements ? this.translate.push({
        key: 'requirements',
        value: this.loanEditForm.value.translate.enRequirements,
        lang: "ENG"
      }) : ''
      this.loanEditForm.value.translate.kaaRequirements ? this.translate.push({
        key: 'requirements',
        value: this.loanEditForm.value.translate.kaaRequirements,
        lang: "KAA"
      }) : ''

      this.loanEditForm.value.ageRequirement ? this.translate.push({
        key: 'ageRequirement',
        value: this.loanEditForm.value.ageRequirement,
        lang: "RUS"
      }) : ''
      this.loanEditForm.value.translate.uzAgeRequirement ? this.translate.push({
        key: 'ageRequirement',
        value: this.loanEditForm.value.translate.uzAgeRequirement,
        lang: "UZB"
      }) : ''
      this.loanEditForm.value.translate.enAgeRequirement ? this.translate.push({
        key: 'ageRequirement',
        value: this.loanEditForm.value.translate.enAgeRequirement,
        lang: "ENG"
      }) : ''
      this.loanEditForm.value.translate.kaaAgeRequirement ? this.translate.push({
        key: 'ageRequirement',
        value: this.loanEditForm.value.translate.kaaAgeRequirement,
        lang: "KAA"
      }) : ''

      this.loanEditForm.value.privilegedPeriodDescription ? this.translate.push({
        key: 'privilegedPeriodDescription',
        value: this.loanEditForm.value.privilegedPeriodDescription,
        lang: "RUS"
      }) : ''
      this.loanEditForm.value.translate.uzPrivilegedPeriodDescription ? this.translate.push({
        key: 'privilegedPeriodDescription',
        value: this.loanEditForm.value.translate.uzPrivilegedPeriodDescription,
        lang: "UZB"
      }) : ''
      this.loanEditForm.value.translate.enPrivilegedPeriodDescription ? this.translate.push({
        key: 'privilegedPeriodDescription',
        value: this.loanEditForm.value.translate.enPrivilegedPeriodDescription,
        lang: "ENG"
      }) : ''
      this.loanEditForm.value.translate.kaaPrivilegedPeriodDescription ? this.translate.push({
        key: 'privilegedPeriodDescription',
        value: this.loanEditForm.value.translate.kaaPrivilegedPeriodDescription,
        lang: "KAA"
      }) : ''

      this.loanService.productLoanUpdate({
        id: this.loanId,
        loanTypeId: this.loanTypeId,
        name: this.loanEditForm.value.name,
        periodInterval: this.loanEditForm.value.periodInterval,
        fromPeriod: this.loanEditForm.value.fromPeriod,
        toPeriod: this.loanEditForm.value.toPeriod,
        periodType: this.loanEditForm.value.periodType,
        productId: this.loanEditForm.value.productId,
        annualRate: this.loanEditForm.value.annualRate,
        insurancePercent: this.loanEditForm.value.insurancePercent,
        initialPayment: this.loanEditForm.value.initialPayment,
        initialPaymentType: this.loanEditForm.value.initialPaymentType,
        requirements: this.loanEditForm.value.requirements,
        privilegedPeriod: this.loanEditForm.value.privilegedPeriod,
        privilegedPeriodDescription: this.loanEditForm.value.privilegedPeriodDescription,
        attachmentId: this.loanEditForm.value.attachmentId ? this.loanEditForm.value.attachmentId : null,
        minValue: this.loanEditForm.value.minValue * 100,
        maxValue: this.loanEditForm.value.maxValue * 100,
        ageRequirement: this.loanEditForm.value.ageRequirement,
        currency: this.loanEditForm.value.currency,
        ofertaId: this.loanEditForm.value.ofertaId,
        translate: this.translate
      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Кредит успешно изменен')
          setTimeout(() => {
            this.backUrl()
          }, 1000)
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

  initialPaymentTypeChange(event: any) {
    if (event.target.value === 'AMOUNT') {
      this.text = 'Сумма'
    } else if (event.target.value === 'RATE') {
      this.text = 'Процент'
    } else {
      this.text = 'Процент'
    }
  }

  logger(event: any) {
    if (event.checked === true) {
      this.loanEditForm.controls['fromPeriod'].enable()
    } else {
      this.loanEditForm.controls['fromPeriod'].disable()
    }
  }

  backUrl() {
    this._location.back()
  }

  get name() {
    return this.loanEditForm.get('name')
  }

  get annualRate() {
    return this.loanEditForm.get('annualRate')
  }

  get insurancePercent() {
    return this.loanEditForm.get('insurancePercent')
  }

  get requirements() {
    return this.loanEditForm.get('requirements')
  }

  get privilegedPeriodDescription() {
    return this.loanEditForm.get('privilegedPeriodDescription')
  }

  get ageRequirement() {
    return this.loanEditForm.get('ageRequirement')
  }

  get privilegedPeriod() {
    return this.loanEditForm.get('privilegedPeriod')
  }

  get currency() {
    return this.loanEditForm.get('currency')
  }

  get minValue() {
    return this.loanEditForm.get('minValue')
  }

  get maxValue() {
    return this.loanEditForm.get('maxValue')
  }

  get initialPaymentType() {
    return this.loanEditForm.get('initialPaymentType')
  }

  get initialPayment() {
    return this.loanEditForm.get('initialPayment')
  }

  get productId() {
    return this.loanEditForm.get('productId')
  }

  get periodType() {
    return this.loanEditForm.get('periodType')
  }

  get toPeriod() {
    return this.loanEditForm.get('toPeriod')
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
