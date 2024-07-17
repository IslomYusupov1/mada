import { Component, OnInit } from '@angular/core';
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {UserService} from "../../../ad-services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {DepositService} from "../../../ad-services/deposit.service";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";

@Component({
  selector: 'app-products-cards',
  templateUrl: './products-cards.component.html',
  styles: [
  ]
})
export class ProductsCardsComponent implements OnInit {
  dataList: Array<any> = [];
  loadingList: boolean = false
  text: string = 'Загрузка ...';
  defaultImg: string = './assets/images/xalqLogo.png';
  isFilter: boolean = false
  currentPage: number = 1;
  totalPages: number = 1;

  currency = new FormControl('');
  depositType = new FormControl('');

  currencyList: string[] = ['UZS', 'USD'];
  depositTypeList: string[] = ['UZCARD', 'HUMO'];
  filterForm: FormGroup = new FormGroup({
    periodType: new FormControl('', []),
    active: new FormControl('', []),
    additional: new FormControl('', []),
  })
  constructor(
    private depositService: DepositService,
    private router: Router,
    public dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.getCards()
  }
  filter() {
    this.depositService.productCardFilter({
      page: this.currentPage - 1,
      size: 10,
      currency: this.currency.value ? this.currency.value : undefined,
      cardType: !this.depositType.value || (this.depositType.value == '' || this.depositType.value == []) ? undefined : this.depositType.value,
      periodType: this.filterForm.value.periodType ? this.filterForm.value.periodType : undefined,
      active: this.filterForm.value.active ? this.filterForm.value.active : undefined,
      additional: this.filterForm.value.additional ? this.filterForm.value.additional : undefined,

    }).then((res: any) => {
      if (res) {
        this.dataList = res
        if (res.length === 0) {
          this.text = 'Не найден'
        }
      }
    })
  }

  getCards() {
    this.loadingList= true
    this.depositService.getProductCard({
      filter: {},
      paging: {
        page: this.currentPage - 1,
        size: 10
      }
    }).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.totalPages = res.paging.totalPages
        for (let i = 0; i < this.dataList.length; i++) {
          this.dataList[i].imgPath = this.dataList[i].logo.path+'/'+this.dataList[i].logo.name+'.'+this.dataList[i].logo.ext
        }
        this.loadingList = false
      } else {
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

  showDeactivateDialog(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы точно хотите деактивировать ?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.deactivate(id)
    })
  }

  showActivateDialog(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы точно хотите активировать ?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.activate(id)
    })
  }

  delete(id: string) {
    this.depositService.productCardDelete(id).then(res => {
      if (res) {
        this.showMessage(true, 'успешно удален', '', [])
        this.getCards()
      }
    }).catch(error => {
      console.log(error)
    })
  }

  deactivate(id: string) {
    this.depositService.productCardDeactivate(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'успешно деактивирован!')
        this.getCards()
      }
    }).catch(error => {
      console.log(error)
    })
  }

  activate(id: string) {
    this.depositService.productCardActivate(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'успешно активирован!')
        this.getCards()
      }
    }).catch(error => {
      console.log(error)
    })
  }

  pageClicked(val: number) {
    this.currentPage = val
    this.getCards()
  }

  pagePrevTo() {
    // @ts-ignore
    this.currentPage--
    this.getCards()
  }

  pageNextTo() {
    // @ts-ignore
    this.currentPage++
    this.getCards()
  }

}
