import {Component, OnInit} from '@angular/core';
import {PointService} from "../../../ad-services/point.service";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {HrService} from "../../../ad-services/helper/hr.service";
import {
  DetailVirtualCardDialogComponent
} from "../../../ad-components/ad-dialog/detail-virtual-card-dialog/detail-virtual-card-dialog.component";


@Component({
  selector: 'app-virtual-condition-cards',
  templateUrl: './virtual-condition-cards.component.html',
  styles: []
})
export class VirtualConditionCardsComponent implements OnInit {
  dataList: Array<{ key: string, name: string, order: number, uuid: string, description: string }> = []
  loadingList: boolean = false
  title: string = ''
  type: string = 'UZCARD'

  constructor(
    private _point: PointService,
    private _dialog: MatDialog,
    private _hr: HrService
  ) {
  }

  ngOnInit(): void {
    this.getVirtualCardConditionList({value: this.type})
  }

  getVirtualCardConditionList(event: { value: string }) {
    this.type = event.value
    console.log(this.type)
    this.loadingList = true
    this._point.VirtualConditionCardGet(event.value).then((res: any) => {
      if (res) {
        this.loadingList = false
        this.dataList = res.condition
        this.title = res.title
      } else {
        this.loadingList = false
      }
    })
  }

  deleteVirtualCard(uuid: string) {
    let dialogRef = this._dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы точно хотите удалить?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.delete(uuid)
    })
  }

  delete(uuid: string) {
    this._point.VirtualConditionCardDelete(uuid).then((res: any) => {
      if (res) {
        this._hr.showMessage(true, 'успешно удален', '', [])
      } else {
        this._hr.showMessage(false, res.message, '', [])
      }
      this.getVirtualCardConditionList({value: this.type})
    })
  }

  detail(uuid: string) {
    this._point.VirtualConditionCardOne(uuid).then((res) => {
      if (res) {
        console.log(res)
        let dialogRef = this._dialog.open(DetailVirtualCardDialogComponent, {
          width: '800px',
          maxWidth: '800px',
          data: res
        });
        dialogRef.componentInstance.detail.subscribe(() => {
          dialogRef.close()
        })
      }
    })

  }
}
