import { Component, OnInit } from '@angular/core';
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {DepositService} from "../../../../ad-services/deposit.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styles: [
  ]
})
export class CardCreateComponent implements OnInit {
  isUnlimited: boolean = true
  text: string = 'Процент'
  translate: Array<any> = []
  createCardForm: FormGroup = new FormGroup({
    name: new FormControl('', []),
    requirements: new FormControl('', []),
    periodType: new FormControl('', []),
    currency: new FormControl('', []),
    toPeriod: new FormControl('', []),
    fromPeriod: new FormControl({value: '', disabled: true}, []),
    periodInterval: new FormControl(false, []),
    initialPaymentType: new FormControl('', []),
    initialPayment: new FormControl('', []),
    cardType: new FormControl('', []),
    productId: new FormControl('', []),
    additional: new FormControl('', []),
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
  }

  createDeposit() {
    if (this.createCardForm.valid) {
      this.createCardForm.value.requirements ? this.translate.push({
        key: 'requirements',
        value: this.createCardForm.value.requirements,
        lang: "RUS"
      }) : ''
      this.createCardForm.value.translate.uzRequirements ? this.translate.push({
        key: 'requirements',
        value: this.createCardForm.value.translate.uzRequirements,
        lang: "UZB"
      }) : ''
      this.createCardForm.value.translate.enRequirements ? this.translate.push({
        key: 'requirements',
        value: this.createCardForm.value.translate.enRequirements,
        lang: "ENG"
      }) : ''
      this.createCardForm.value.translate.kaaRequirements ? this.translate.push({
        key: 'requirements',
        value: this.createCardForm.value.translate.kaaRequirements,
        lang: "KAA"
      }) : ''
      this.depositService.cardCreate({
        name: this.createCardForm.value.name,
        requirements: this.createCardForm.value.requirements,
        periodType: this.createCardForm.value.periodType,
        currency: this.createCardForm.value.currency,
        toPeriod: this.createCardForm.value.toPeriod,
        fromPeriod: this.createCardForm.value.fromPeriod,
        periodInterval: this.createCardForm.value.periodInterval,
        initialPaymentType: this.createCardForm.value.initialPaymentType,
        initialPayment: this.createCardForm.value.initialPayment,
        cardType: this.createCardForm.value.cardType,
        productId: this.createCardForm.value.productId,
        additional: this.createCardForm.value.additional,
        translate: this.translate
      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Success!')
          this.router.navigate(['/products/cards']).then(() => {
          })
        }
      })
    }
  }

  logger(event: any) {
    if (event.checked === true) {
      this.createCardForm.controls['fromPeriod'].enable()
    } else {
      this.createCardForm.controls['fromPeriod'].disable()
    }
  }

  periodTypeChange(event: any) {
    if (event.target.value === 'UNLIMITED') {
      this.isUnlimited = false
      this.createCardForm.value.interval = false
    } else {
      this.isUnlimited = true
    }
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

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  get name() {
    return this.createCardForm.get('name')
  }

  get annualRate() {
    return this.createCardForm.get('annualRate')
  }

  get requirements() {
    return this.createCardForm.get('requirements')
  }

  get periodType() {
    return this.createCardForm.get('periodType')
  }

  get currency() {
    return this.createCardForm.get('currency')
  }

  get initialPaymentType() {
    return this.createCardForm.get('initialPaymentType')
  }

  get cardType() {
    return this.createCardForm.get('cardType')
  }

  get initialPayment() {
    return this.createCardForm.get('initialPayment')
  }

  get productId() {
    return this.createCardForm.get('productId')
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
