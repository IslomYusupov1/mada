import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GovernmentService} from "../../../../ad-services/payment/government.service";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {
  GovernmentResParamCreateComponent
} from "../../../../ad-components/ad-payment/government-service/government-res-param-create/government-res-param-create.component";
import {
  GovernmentResParamEditComponent
} from "../../../../ad-components/ad-payment/government-service/government-res-param-edit/government-res-param-edit.component";
import {
  GovernmentResParamTranslateComponent
} from "../../../../ad-components/ad-payment/government-service/government-res-param-translate/government-res-param-translate.component";
import {
  GovernmentReqParamTranslateComponent
} from "../../../../ad-components/ad-payment/government-service/government-req-param-translate/government-req-param-translate.component";
import {
  GovernmentServiceInfoCreateComponent
} from "../../../../ad-components/ad-payment/government-service/government-service-info-create/government-service-info-create.component";
import {
  GovernmentServiceInfoEditComponent
} from "../../../../ad-components/ad-payment/government-service/government-service-info-edit/government-service-info-edit.component";
import {
  GovernmentReqParamCreateComponent
} from "../../../../ad-components/ad-payment/government-service/government-req-param-create/government-req-param-create.component";
import {
  GovernmentReqParamEditComponent
} from "../../../../ad-components/ad-payment/government-service/government-req-param-edit/government-req-param-edit.component";

@Component({
  selector: 'app-government-service',
  templateUrl: './government-service.component.html',
  styles: []
})
export class GovernmentServiceComponent implements OnInit {
  public serviceId!: string
  public loading: boolean = false
  public data: any = {}
  public isDrop: boolean = false
  public isDropOption: boolean = false
  public isSelectChildDrop: boolean = false
  public stateFieldTypeList: Array<any> = []
  public serviceInfo: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private govService: GovernmentService,
    private dialog: MatDialog
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
    this.serviceId = this.route.snapshot.queryParams['id']
  }

  ngOnInit(): void {
    this.getData()
    this.getFieldTypeList()
  }

  getData() {
    this.loading = true
    this.govService.stateServiceOne(this.serviceId).then((res: any) => {
      if (res) {
        this.data = res
        this.serviceInfo = this.data.serviceInfos.find((el: any) => el.lang === 'RUS')
        this.loading = false
      } else {
        this.loading = false
      }
    })
  }

  getFieldTypeList() {
    this.govService.stateFieldTypeList().then((res: any) => {
      if (res) {
        this.stateFieldTypeList = res.fieldTypes
      }
    })
  }

  summa(minAmount: any) {
    if (minAmount['amount']) {
      return minAmount['amount'] / Math.pow(10, minAmount.scale)
    } else {
      return 0
    }
  }

  editServiceInfo(serviceInfos: Array<any>) {
    let dialogRef = this.dialog.open(GovernmentServiceInfoEditComponent, {
      width: '900px',
      maxWidth: '900px',
      maxHeight: '700px',
      data: {
        serviceId: this.serviceId,
        serviceInfos
      }
    })
    dialogRef.componentInstance.onCreate.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  openResponseTranslate(uuid: string, translates: any) {
    let dialogRef = this.dialog.open(GovernmentResParamTranslateComponent, {
      width: '900px',
      maxWidth: '900px',
      data: {
        uuid: uuid,
        translates: translates
      }
    })
    dialogRef.componentInstance.onTranslateTitle.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  openParamTranslate(uuid: string, translates: any) {
    let dialogRef = this.dialog.open(GovernmentReqParamTranslateComponent, {
      width: '900px',
      maxWidth: '900px',
      data: {
        uuid: uuid,
        translates: translates
      }
    })
    dialogRef.componentInstance.onTranslateTitle.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  openParamEditDialog(uuid: string) {
    // this.paynet.serviceRequestParamGetOne(uuid).then((res: any) => {
    //   if (res) {
    //     this.paynet.paymentFieldTypeList().then((response: any) => {
    //       if (response) {
    //         this.paynet.getPaymentMerchantList().then((resp: any) => {
    //           if (resp) {
    //             let dialogRef = this.dialog.open(RequestParamChildEditComponent, {
    //               width: '700px',
    //               height: '700px',
    //               maxHeight: '700px',
    //               data: {
    //                 requestParamId: uuid,
    //                 typeList: response.fieldTypes,
    //                 info: res,
    //                 merchantList: resp.serviceTypes
    //               }
    //             })
    //             const sub = dialogRef.componentInstance.onEditParam.subscribe(() => {
    //               dialogRef.close()
    //               this.getData()
    //             })
    //             this.subscription.add(sub)
    //           }
    //         })
    //       }
    //     })
    //   }
    // })
  }

  openCreateRequestParam() {
    let dialogRef = this.dialog.open(GovernmentReqParamCreateComponent, {
      width: '800px',
      height: '800px',
      maxHeight: '560px',
      data: {
        serviceId: this.serviceId,
        typeList: this.stateFieldTypeList,
        parent: null
      }
    })
    dialogRef.componentInstance.onCreate.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  openEditRequestParam(uuid: string) {
    this.govService.stateReqParamOne(uuid).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(GovernmentReqParamEditComponent, {
          width: '800px',
          height: '800px',
          maxHeight: '560px',
          data: {
            reqParamInfo: res,
            typeList: this.stateFieldTypeList,
          }
        })
        dialogRef.componentInstance.onEdit.subscribe(() => {
          dialogRef.close()
          this.getData()
        })
      }
    })
  }

  openCreateResponseParam() {
    let dialogRef = this.dialog.open(GovernmentResParamCreateComponent, {
      width: '500px',
      maxWidth: '500px',
      maxHeight: '700px',
      data: {
        serviceId: this.serviceId,
        typeList: this.stateFieldTypeList
      }
    })
    dialogRef.componentInstance.onCreate.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  openCreateServiceInfo() {
    let dialogRef = this.dialog.open(GovernmentServiceInfoCreateComponent, {
      width: '900px',
      maxWidth: '900px',
      maxHeight: '700px',
      data: {
        serviceId: this.serviceId
      }
    })
    dialogRef.componentInstance.onCreate.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  openParamChildCreate(uuid: string) {
    let dialogRef = this.dialog.open(GovernmentReqParamCreateComponent, {
      width: '800px',
      height: '800px',
      maxHeight: '560px',
      data: {
        serviceId: this.serviceId,
        typeList: this.stateFieldTypeList,
        parent: uuid
      }
    })
    dialogRef.componentInstance.onCreate.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  openEditResponseParam(uuid: string, title: string, type: string, keyName: string) {
    let dialogRef = this.dialog.open(GovernmentResParamEditComponent, {
      width: '500px',
      maxWidth: '500px',
      maxHeight: '700px',
      data: {
        typeList: this.stateFieldTypeList,
        responseParamId: uuid,
        title,
        type,
        keyName
      }
    })
    dialogRef.componentInstance.onEdit.subscribe(() => {
      dialogRef.close()
      this.getData()
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
    this.govService.stateReqParamOrder(this.data.requestParams).then((res: any) => {
      if (res) {
        this.showMessage(true, 'успешно!')
        this.isDrop = false
        this.getData()
      }
    })
  }

  sortRequestParamsChild(index: number) {
    // this.paynet.requestParamSort(this.data.requestParams[index].selectValue).then((res: any) => {
    //   if (res) {
    //     this.showMessage(true, 'успешно!')
    //     this.isDropOption = false
    //     this.getData()
    //   }
    // })
  }

  sortRequestParamSelectChild(paramInd: number, selectInd: number) {
    // this.paynet.requestParamSort(this.data.requestParams[paramInd].selectValue[selectInd].children).then((res: any) => {
    //   if (res) {
    //     this.showMessage(true, 'успешно!')
    //     this.isSelectChildDrop = false
    //     this.getData()
    //   }
    // })
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
