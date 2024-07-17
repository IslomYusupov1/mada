import {Component, OnDestroy, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {PaynetService} from "../../../ad-services/paynet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
  RequestParamTitleTranslateComponent
} from "../../../ad-components/ad-payment/paynet-service/request-param-title-translate/request-param-title-translate.component";
import {Subscription} from "rxjs";
import {
  RequestParamChildCreateComponent
} from "../../../ad-components/ad-payment/paynet-service/request-param-child-create/request-param-child-create.component";
import {
  PaynetReponseParamCreateComponent
} from "../../../ad-components/ad-payment/paynet-service/paynet-reponse-param-create/paynet-reponse-param-create.component";
import {
  ResponseParamTitleTranslateComponent
} from "../../../ad-components/ad-payment/paynet-service/response-param-title-translate/response-param-title-translate.component";
import {
  PaynetResponseParamEditComponent
} from "../../../ad-components/ad-payment/paynet-service/paynet-response-param-edit/paynet-response-param-edit.component";
import {
  RequestParamChildEditComponent
} from "../../../ad-components/ad-payment/paynet-service/request-param-child-edit/request-param-child-edit.component";

@Component({
  selector: 'app-paynet-services',
  templateUrl: './paynet-services.component.html',
  styles: []
})
export class PaynetServicesComponent implements OnInit, OnDestroy {
  data: any = {}
  isDrop: boolean = false
  isDropOption: boolean = false
  isSelectChildDrop: boolean = false
  serviceId: string = ''
  private subscription = new Subscription()

  constructor(
    private paynet: PaynetService,
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
      this.serviceId = q.id
      this.getData()
    })
  }

  getData() {
    this.paynet.serviceGetOne(this.serviceId).then((res: any) => {
      this.data = res
    })
  }

  summa(minAmount: any) {
    if (minAmount['amount']) {
      return minAmount['amount'] / Math.pow(10, minAmount.scale)
    } else {
      return 0
    }
  }

  openResponseTranslate(uuid: string, translates: any) {
    let dialogRef = this.dialog.open(ResponseParamTitleTranslateComponent, {
      width: '900px',
      maxWidth: '900px',
      data: {
        uuid: uuid,
        translates: translates
      }
    })
    let sub = dialogRef.componentInstance.onTranslateTitle.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
    this.subscription.add(sub)
  }

  openParamTranslate(uuid: string, translates: any) {
    let dialogRef = this.dialog.open(RequestParamTitleTranslateComponent, {
      width: '900px',
      maxWidth: '900px',
      data: {
        uuid: uuid,
        translates: translates
      }
    })
    let sub = dialogRef.componentInstance.onTranslateTitle.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
    this.subscription.add(sub)
  }

  openParamEditDialog(uuid: string) {
    this.paynet.serviceRequestParamGetOne(uuid).then((res: any) => {
      if (res) {
        this.paynet.paymentFieldTypeList().then((response: any) => {
          if (response) {
            this.paynet.getPaymentMerchantList().then((resp: any) => {
              if (resp) {
                let dialogRef = this.dialog.open(RequestParamChildEditComponent, {
                  width: '700px',
                  height: '700px',
                  maxHeight: '700px',
                  data: {
                    requestParamId: uuid,
                    typeList: response.fieldTypes,
                    info: res,
                    merchantList: resp.serviceTypes
                  }
                })
                const sub = dialogRef.componentInstance.onEditParam.subscribe(() => {
                  dialogRef.close()
                  this.getData()
                })
                this.subscription.add(sub)
              }
            })
          }
        })
      }
    })
  }

  openCreateResponseParam() {
    this.paynet.paymentFieldTypeList().then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(PaynetReponseParamCreateComponent, {
          width: '500px',
          maxWidth: '500px',
          maxHeight: '700px',
          data: {
            serviceId: this.serviceId,
            typeList: res.fieldTypes
          }
        })
        const sub = dialogRef.componentInstance.onCreate.subscribe(() => {
          dialogRef.close()
          this.getData()
        })
        this.subscription.add(sub)
      }
    })
  }

  openParamChildCreate(uuid: string) {
    this.paynet.paymentFieldTypeList().then((res: any) => {
      if (res) {
        this.paynet.getPaymentMerchantList().then((response: any) => {
          if (response) {
            let dialogRef = this.dialog.open(RequestParamChildCreateComponent, {
              width: '700px',
              maxWidth: '700px',
              height: '700px',
              data: {
                requestId: this.serviceId,
                parentId: uuid,
                typeList: res.fieldTypes,
                merchantList: response.serviceTypes
              }
            })
            const sub = dialogRef.componentInstance.onCreateParam.subscribe(() => {
              dialogRef.close()
              this.getData()
            })
            this.subscription.add(sub)
          }
        })
      }
    })
  }

  openEditResponseParam(uuid: string) {
    this.paynet.serviceResponseParamGetOne(uuid).then((res: any) => {
      if (res) {
        this.paynet.paymentFieldTypeList().then((response: any) => {
          if (response) {
            let dialogRef = this.dialog.open(PaynetResponseParamEditComponent, {
              width: '500px',
              maxWidth: '500px',
              maxHeight: '700px',
              data: {
                responseId: uuid,
                typeList: response.fieldTypes,
                info: res
              }
            })
            const sub = dialogRef.componentInstance.onEdit.subscribe(() => {
              dialogRef.close()
              this.getData()
            })
            this.subscription.add(sub)
          }
        })
      }
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data.requestParams, event.previousIndex, event.currentIndex);
  }

  dropOption(event: CdkDragDrop<string[]>, index: number) {
    moveItemInArray(this.data.requestParams[index].selectValue, event.previousIndex, event.currentIndex);
  }

  dropSelectChildren(event: CdkDragDrop<string[]>, paramIndex: number, selectIndex: number) {
    moveItemInArray(this.data.requestParams[paramIndex].selectValue[selectIndex].children, event.previousIndex, event.currentIndex);
    console.log(event.previousIndex, event.currentIndex)
  }

  sortRequestParams() {
    this.paynet.requestParamSort(this.data.requestParams).then((res: any) => {
      if (res) {
        this.showMessage(true, 'успешно!')
        this.isDrop = false
        this.getData()
      }
    })
  }

  sortRequestParamsChild(index: number) {
    this.paynet.requestParamSort(this.data.requestParams[index].selectValue).then((res: any) => {
      if (res) {
        this.showMessage(true, 'успешно!')
        this.isDropOption = false
        this.getData()
      }
    })
  }

  sortRequestParamSelectChild(paramInd: number, selectInd: number) {
    this.paynet.requestParamSort(this.data.requestParams[paramInd].selectValue[selectInd].children).then((res: any) => {
      if (res) {
        this.showMessage(true, 'успешно!')
        this.isSelectChildDrop = false
        this.getData()
      }
    })
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

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
