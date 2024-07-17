import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FraudService} from "../../../ad-services/fraud.service";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {
  EditCreateFraudDialogComponent
} from "../../../ad-components/ad-dialog/edit-create-fraud-dialog/edit-create-fraud-dialog.component";

@Component({
  selector: 'app-frauds',
  templateUrl: './frauds.component.html',
  styles: []
})
export class FraudsComponent implements OnInit {
  dataList: Array<any> = []
  isDrop: boolean = false
  loadingList: boolean = false
  dataListDefault: Array<any> = []
  dragonDropList: Array<any> = []
  isTypeDragonDropList: Array<any> = []

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public fraudService: FraudService
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getList()
  }

  drop(event: CdkDragDrop<string[]>,index:any) {
    moveItemInArray(this.dataList[index].fraudLimitChild,  event.previousIndex, event.currentIndex);
  }

  sortData(index:any) {
    this.fraudService.fraudSort(this.dataList[index].fraudLimitChild).then((res: any) => {
      if (res) {
        this.showMessage(true, 'успешно!')
        this.isDrop = false
        this.getList()
      }
    })
  }

  minimize() {
    this.isDrop = !this.isDrop
    this.dataList = Object.assign([], this.dataListDefault)
  }

  openDialogEditFraud(nameOrId: string) {
    if (nameOrId === 'create') {
      this.fraudService.limitType().then((response: any) => {
        if (response) {
          const editCreateDialog = this.dialog.open(EditCreateFraudDialogComponent, {
            width: "500px",
            maxWidth: "500px",
            data: {
              responseLimitType: response.fraudLimits
            }
          })
          editCreateDialog.componentInstance.onEditCreateFraud.subscribe(() => {
            editCreateDialog.close()
            this.getList()
          })
        }
      })
    } else {
      this.fraudService.getOneFraud(nameOrId).then((res: any) => {
        if (res) {
          const editCreateDialog = this.dialog.open(EditCreateFraudDialogComponent, {
            width: "500px",
            maxWidth: "500px",
            data: {
              tryLimit: res.tryLimit,
              blockTime: res.blockTime,
              isForever: res.isForever,
              id: res.uuid,
              isEditModule: 'edit',
            }
          })
          editCreateDialog.componentInstance.onEditCreateFraud.subscribe(() => {
            editCreateDialog.close()
            this.getList()
          })
        }
      })
    }
  }

  showCancelDialog(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы точно хотите удалить ?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.delete(id)
    })
  }

  delete(id: string) {
    this.fraudService.delete(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'успешно удален', '', [])
      }
      this.getList()
    })
  }

  getList() {
    this.loadingList = true
    this.fraudService.getFrauds().then((res: any) => {
      if (res) {
        this.dataList = res.fraudLimits
        this.dataListDefault = res.fraudLimits
        this.loadingList = false
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

}
