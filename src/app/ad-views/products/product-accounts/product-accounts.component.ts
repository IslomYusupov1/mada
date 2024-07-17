import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {PointService} from "../../../ad-services/point.service";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {
  ProductAccountsActionsDialogComponent
} from "../../../ad-components/ad-dialog/product-accounts-actions-dialog/product-accounts-actions-dialog.component";
import {
  TranslateFaqDialogComponent
} from "../../../ad-components/ad-dialog/translate-faq-dialog/translate-faq-dialog.component";
import {Subscription} from "rxjs";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

export interface productList {
  id: number
  productCode: number
  active: number
  translates: {}
  title: string
  logo: {
    suffix: null
    path: string
    name: string
    extraSuffix: []
    ext: string
    contentType: string
  }
}

@Component({
  selector: 'app-product-accounts',
  templateUrl: './product-accounts.component.html',
  styles: []
})
export class ProductAccountsComponent implements OnInit,OnDestroy {
  loadingList: boolean = false;
  dataList: Array<productList> = [];
  private subscription = new Subscription()

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private pointService: PointService
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.pointService.getProductAccounts().then((res) => {
      this.dataList = res.accounts
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

  openCreateDialog(id: number | null) {
    if (id === null) {
      let createAccountOrEdit = this.dialog.open(ProductAccountsActionsDialogComponent, {
        maxWidth: '500px',
        width: '500px',
      });
      createAccountOrEdit.componentInstance.createEditAccount.subscribe(() => {
        createAccountOrEdit.close()
        this.getList()
      })
    } else {
      this.pointService.getProductAccount(id).then((res = {} as productList) => {
        let createAccountOrEdit = this.dialog.open(ProductAccountsActionsDialogComponent, {
          maxWidth: '500px',
          width: '500px',
          data: res
        });
        createAccountOrEdit.componentInstance.createEditAccount.subscribe(() => {
          createAccountOrEdit.close()
          this.getList()
        })
      })
    }
  }
  accountTitleDialog(id: number) {
    this.pointService.getProductAccount(id).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(TranslateFaqDialogComponent, {
          width: '900px',
          maxWidth: '900px',
          data: {
            translates: res.translates? res.translates : '',
            id: res.id,
            type:"ACCOUNT"
          }
        })
        const sub = dialogRef.componentInstance.onTranslateTitle.subscribe((event) => {
          dialogRef.close()
          this.getList()
        })
        this.subscription.add(sub)
      }
    })
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataList, event.previousIndex, event.currentIndex);
    this.pointService.orderProductAccount(this.dataList).then((res) => {
      console.log(this.dataList)
      if (res) {
        this.getList()
      }
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
