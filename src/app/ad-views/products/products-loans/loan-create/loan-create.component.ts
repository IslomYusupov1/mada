import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoanService} from "../../../../ad-services/loan.service";
import {MatDialog} from "@angular/material/dialog";
import {Location} from "@angular/common";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {DepositService} from "../../../../ad-services/deposit.service";

@Component({
  selector: 'app-loan-create',
  templateUrl: './loan-create.component.html',
  styles: []
})
export class LoanCreateComponent implements OnInit {
  loanTypeId: string = ''
  text: string = 'Первоначальный взнос'
  loanName: string = 'Загрузка данных...'
  documentList: Array<any> = []
  imagePath: any = './assets/images/default-image.png'
  translate: Array<any> = []
  loanCreateForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    annualRate: new FormControl('', [Validators.required]),
    insurancePercent: new FormControl('', [Validators.required]),
    requirements: new FormControl('', [Validators.required]),
    ageRequirement: new FormControl('', [Validators.required]),
    privilegedPeriodDescription: new FormControl('', [Validators.required]),
    attachmentId: new FormControl('', [Validators.required]),
    privilegedPeriod: new FormControl('', [Validators.required]),
    currency: new FormControl('', [Validators.required]),
    minValue: new FormControl('', [Validators.required]),
    maxValue: new FormControl('', [Validators.required]),
    initialPaymentType: new FormControl('', [Validators.required]),
    initialPayment: new FormControl('', [Validators.required]),
    periodType: new FormControl('', [Validators.required]),
    productId: new FormControl('', [Validators.required]),
    periodInterval: new FormControl(false, [Validators.required]),
    fromPeriod: new FormControl({value: '', disabled: true}, []),
    toPeriod: new FormControl('', [Validators.required]),
    ofertaId: new FormControl('', [Validators.required]),
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
    public dialog: MatDialog,
    private router: Router,
    public hr: HrService,
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(q => {
      this.loanTypeId = q.loan
      this.getData(q.loan)
      this.getActiveOffers()
    })
  }

  getData(id: string) {
    this.loanService.productLoanTypeGetOne(id).then((res: any) => {
      if (res && res.loanName) {
        this.loanName = res.loanName
      } else {
        this.loanName = '...'
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
      this.imagePath = fileReader.result
      this.depositService.productUploadImg(selectedFile).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          if (event.result.data) {
            this.loanCreateForm.patchValue({
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

  createLoan() {
    if (this.loanCreateForm.valid) {
      this.loanCreateForm.value.requirements ? this.translate.push({
        key: 'requirements',
        value: this.loanCreateForm.value.requirements,
        lang: "RUS"
      }) : ''
      this.loanCreateForm.value.translate.uzRequirements ? this.translate.push({
        key: 'requirements',
        value: this.loanCreateForm.value.translate.uzRequirements,
        lang: "UZB"
      }) : ''
      this.loanCreateForm.value.translate.enRequirements ? this.translate.push({
        key: 'requirements',
        value: this.loanCreateForm.value.translate.enRequirements,
        lang: "ENG"
      }) : ''
      this.loanCreateForm.value.translate.kaaRequirements ? this.translate.push({
        key: 'requirements',
        value: this.loanCreateForm.value.translate.kaaRequirements,
        lang: "KAA"
      }) : ''

      this.loanCreateForm.value.ageRequirement ? this.translate.push({
        key: 'ageRequirement',
        value: this.loanCreateForm.value.ageRequirement,
        lang: "RUS"
      }) : ''
      this.loanCreateForm.value.translate.uzAgeRequirement ? this.translate.push({
        key: 'ageRequirement',
        value: this.loanCreateForm.value.translate.uzAgeRequirement,
        lang: "UZB"
      }) : ''
      this.loanCreateForm.value.translate.enAgeRequirement ? this.translate.push({
        key: 'ageRequirement',
        value: this.loanCreateForm.value.translate.enAgeRequirement,
        lang: "ENG"
      }) : ''
      this.loanCreateForm.value.translate.kaaAgeRequirement ? this.translate.push({
        key: 'ageRequirement',
        value: this.loanCreateForm.value.translate.kaaAgeRequirement,
        lang: "KAA"
      }) : ''

      this.loanCreateForm.value.privilegedPeriodDescription ? this.translate.push({
        key: 'privilegedPeriodDescription',
        value: this.loanCreateForm.value.privilegedPeriodDescription,
        lang: "RUS"
      }) : ''
      this.loanCreateForm.value.translate.uzPrivilegedPeriodDescription ? this.translate.push({
        key: 'privilegedPeriodDescription',
        value: this.loanCreateForm.value.translate.uzPrivilegedPeriodDescription,
        lang: "UZB"
      }) : ''
      this.loanCreateForm.value.translate.enPrivilegedPeriodDescription ? this.translate.push({
        key: 'privilegedPeriodDescription',
        value: this.loanCreateForm.value.translate.enPrivilegedPeriodDescription,
        lang: "ENG"
      }) : ''
      this.loanCreateForm.value.translate.kaaPrivilegedPeriodDescription ? this.translate.push({
        key: 'privilegedPeriodDescription',
        value: this.loanCreateForm.value.translate.kaaPrivilegedPeriodDescription,
        lang: "KAA"
      }) : ''

      this.loanService.productLoanCreate({
        loanTypeId: this.loanTypeId,
        name: this.loanCreateForm.value.name,
        periodInterval: this.loanCreateForm.value.periodInterval,
        fromPeriod: this.loanCreateForm.value.fromPeriod,
        productId: this.loanCreateForm.value.productId,
        toPeriod: this.loanCreateForm.value.toPeriod,
        periodType: this.loanCreateForm.value.periodType,
        annualRate: this.loanCreateForm.value.annualRate,
        insurancePercent: this.loanCreateForm.value.insurancePercent,
        initialPayment: this.loanCreateForm.value.initialPayment,
        initialPaymentType: this.loanCreateForm.value.initialPaymentType,
        requirements: this.loanCreateForm.value.requirements,
        privilegedPeriod: this.loanCreateForm.value.privilegedPeriod,
        privilegedPeriodDescription: this.loanCreateForm.value.privilegedPeriodDescription,
        minValue: this.loanCreateForm.value.minValue * 100,
        maxValue: this.loanCreateForm.value.maxValue * 100,
        ageRequirement: this.loanCreateForm.value.ageRequirement,
        currency: this.loanCreateForm.value.currency,
        ofertaId: this.loanCreateForm.value.ofertaId,
        attachmentId: this.loanCreateForm.value.attachmentId ? this.loanCreateForm.value.attachmentId : null,
        translate: this.translate
      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Кредит успешно добавлен!')
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
      this.loanCreateForm.controls['fromPeriod'].enable()
    } else {
      this.loanCreateForm.controls['fromPeriod'].disable()
    }
  }

  backUrl() {
    this._location.back()
  }

  get name() {
    return this.loanCreateForm.get('name')
  }

  get annualRate() {
    return this.loanCreateForm.get('annualRate')
  }

  get insurancePercent() {
    return this.loanCreateForm.get('insurancePercent')
  }

  get requirements() {
    return this.loanCreateForm.get('requirements')
  }

  get privilegedPeriodDescription() {
    return this.loanCreateForm.get('privilegedPeriodDescription')
  }

  get ageRequirement() {
    return this.loanCreateForm.get('ageRequirement')
  }

  get privilegedPeriod() {
    return this.loanCreateForm.get('privilegedPeriod')
  }

  get currency() {
    return this.loanCreateForm.get('currency')
  }

  get minValue() {
    return this.loanCreateForm.get('minValue')
  }

  get maxValue() {
    return this.loanCreateForm.get('maxValue')
  }

  get initialPaymentType() {
    return this.loanCreateForm.get('initialPaymentType')
  }

  get initialPayment() {
    return this.loanCreateForm.get('initialPayment')
  }

  get periodType() {
    return this.loanCreateForm.get('periodType')
  }

  get productId() {
    return this.loanCreateForm.get('productId')
  }

  get toPeriod() {
    return this.loanCreateForm.get('toPeriod')
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
