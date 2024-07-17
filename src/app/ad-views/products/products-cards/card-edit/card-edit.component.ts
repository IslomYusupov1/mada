import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DepositService} from "../../../../ad-services/deposit.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styles: []
})
export class CardEditComponent implements OnInit {

  uzRequirement: string = ''
  kaaRequirement: string = ''
  enRequirement: string = ''
  isUnlimited: boolean = true
  imgPath: string = ''
  // @ts-ignore
  file: File = null
  attachmentId: string = ''
  text: string = 'Процент'
  cardId: string = ''
  dataObj: any = {}
  translate: Array<any> = []
  editCardForm: FormGroup = new FormGroup({
    name: new FormControl('Загрузка данных...'),
    requirements: new FormControl('Загрузка данных...'),
    periodType: new FormControl('Загрузка данных...'),
    currency: new FormControl('Загрузка данных...'),
    toPeriod: new FormControl('Загрузка данных...'),
    productId: new FormControl('Загрузка данных...'),
    fromPeriod: new FormControl({value: 'Загрузка данных...', disabled: this.dataObj.periodInterval}),
    periodInterval: new FormControl('Загрузка данных...'),
    initialPaymentType: new FormControl('Загрузка данных...'),
    initialPayment: new FormControl('Загрузка данных...'),
    cardType: new FormControl(''),
    additional: new FormControl('Загрузка данных...'),
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
      this.cardId = q.card_id
      this.getData()
    })
  }

  getData() {
    this.depositService.productCardGet(this.cardId).then(res => {
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
        this.editCardForm.patchValue({
          name: res?.name ? `${res.name}` : 'Нет данных',
          requirements: res?.requirements ? `${res.requirements}` : 'Нет данных',
          periodType: res?.periodType ? `${res.periodType}` : 'Нет данных',
          currency: res?.initialPayment.currency ? `${res.initialPayment.currency}` : 'Нет данных',
          toPeriod: res?.toPeriod ? `${res.toPeriod}` : '',
          fromPeriod: res?.fromPeriod ? `${res.fromPeriod}` : '',
          periodInterval: res?.periodInterval ? res.periodInterval : false,
          initialPaymentType: res?.initialPaymentType ? `${res.initialPaymentType}` : 'Нет данных',
          productId: res?.productId ? `${res.productId}` : 'Нет данных',
          initialPayment: res?.initialPayment.value ? (res?.initialPayment.scale === 2 ? `${res.initialPayment.value / 100}` : `${res.initialPayment.value}`) : 'Нет данных',
          cardType: res?.cardType ? `${res.cardType}` : '',
          additional: res?.additional ? res.additional : false,
          translate: {
            uzRequirements: this.uzRequirement ? this.uzRequirement : '',
            enRequirements: this.enRequirement ? this.enRequirement : '',
            kaaRequirements: this.kaaRequirement ? this.kaaRequirement : ''
          }
        })
        this.imgPath = res?.logo ? `${res?.logo.path}/${res?.logo.name}.${res?.logo.ext}` : ''
        if (res.periodInterval === true) {
          this.editCardForm.controls['fromPeriod'].enable()
        } else {
          this.editCardForm.controls['fromPeriod'].disable()
        }
        if (res.periodType === 'UNLIMITED') {
          this.isUnlimited = false
        }
      }
    })
  }

  onFileSelected(event: any) {
    this.imgPath = './assets/loader1.svg'
    this.file = event.target.files[0]
    this.depositService.productUploadImg(this.file).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        console.log(event)
        if (event.result.data) {
          // this.attachmentId = event.result.data.id
          // this.imgPath = ``
        }
      }
    })
  }

  updateCard() {
    if (this.editCardForm.valid) {
      this.editCardForm.value.requirements ? this.translate.push({
        key: 'requirements',
        value: this.editCardForm.value.requirements,
        lang: "RUS"
      }) : ''
      this.editCardForm.value.translate.uzRequirements ? this.translate.push({
        key: 'requirements',
        value: this.editCardForm.value.translate.uzRequirements,
        lang: "UZB"
      }) : ''
      this.editCardForm.value.translate.enRequirements ? this.translate.push({
        key: 'requirements',
        value: this.editCardForm.value.translate.enRequirements,
        lang: "ENG"
      }) : ''
      this.editCardForm.value.translate.kaaRequirements ? this.translate.push({
        key: 'requirements',
        value: this.editCardForm.value.translate.kaaRequirements,
        lang: "KAA"
      }) : ''
      this.depositService.productCardUpdate({
        id: this.cardId,
        name: this.editCardForm.value.name,
        requirements: this.editCardForm.value.requirements,
        periodType: this.editCardForm.value.periodType,
        currency: this.editCardForm.value.currency,
        toPeriod: this.editCardForm.value.toPeriod,
        fromPeriod: this.editCardForm.value.fromPeriod,
        productId: this.editCardForm.value.productId,
        periodInterval: this.editCardForm.value.periodInterval,
        initialPaymentType: this.editCardForm.value.initialPaymentType,
        initialPayment: this.editCardForm.value.initialPayment,
        cardType: this.editCardForm.value.cardType,
        additional: this.editCardForm.value.additional,
        translate: this.translate
      }).then((res: any) => {
        if (res) {
          this.router.navigate(['/products/cards']).then(() => {
          })
          this.showMessage(true, 'Success!')
        }
      })
    }
    console.log(this.editCardForm.value)
  }

  logger(event: any) {
    if (event.checked === true) {
      this.editCardForm.controls['fromPeriod'].enable()
    } else {
      this.editCardForm.controls['fromPeriod'].disable()
    }
  }

  periodTypeChange(event: any) {
    if (event.target.value === 'UNLIMITED') {
      this.isUnlimited = false
      this.editCardForm.value.interval = false
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

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }

}
