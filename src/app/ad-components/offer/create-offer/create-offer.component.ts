import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../ad-services/auth.service";
import {
  CommissionDetailUpdateDialogComponent
} from "../../ad-dialog/commission-detail-update-dialog/commission-detail-update-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
  CommissionConditionUpdateDialogComponent
} from "../../ad-dialog/commission-condition-update-dialog/commission-condition-update-dialog.component";


@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styles: []
})

export class CreateOfferComponent implements OnInit {
  data:any
  panelOpenState = false;
  queryId!: number
  details: Array<{
    detailId: number,
    currency: string,
    fixAmount: number,
    isFixAmount: boolean,
    isSender: boolean,
    rate: number,
    conditions: Array<{
      conditionId: number,
      isActive: boolean,
      isMainRate: boolean,
      limitAmount: number,
      rate: number,
      type: string,
    }>
  }> = []

  constructor(
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private _dialog: MatDialog
  ) {


  }

  ngOnInit() {
    const sub = this._route.queryParams.subscribe(q => {
      this.queryId = q.id
      this.getList(this.queryId)
    })
  }

  getList(id: number) {
    this._auth.getCommissionOne(id).then((res: any) => {
      this.details = res.details
      this.data = res
    })

  }

  updateDetail(detail: {
    currency: string,
    detailId: number,
    fixAmount: number,
    isFixAmount: boolean,
    isSender: boolean,
    rate: number
  }) {
    let dialogRef = this._dialog.open(CommissionDetailUpdateDialogComponent, {
      maxWidth: '445px',
      width: '445px',
      data: detail
    });
    dialogRef.componentInstance.updateDetail.subscribe(() => {
      dialogRef.close()
      this.getList(this.queryId)
    })
  }

  updateCondition(detail: {
    conditionId: number,
    limitAmount: number,
    rate: number,
    isMainRate: boolean,
    isActive: boolean,
    type: string
  }) {
    let dialogRef = this._dialog.open(CommissionConditionUpdateDialogComponent, {
      maxWidth: '445px',
      width: '445px',
      data: detail
    });
    dialogRef.componentInstance.updateCondition.subscribe(() => {
      dialogRef.close()
      this.getList(this.queryId)
    })
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
