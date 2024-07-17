import {Component, OnInit} from '@angular/core';
import {DepositService} from "../../../ad-services/deposit.service";
import {MatDialog} from "@angular/material/dialog";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products-deposits',
  templateUrl: './products-deposits.component.html',
  styles: []
})
export class ProductsDepositsComponent implements OnInit {
  depositsList: Array<any> = [];
  text: string = 'Загрузка ...';
  defaultImg: string = './assets/images/xalqLogo.png';
  isFilter: boolean = false
  currentPage: number = 1;
  totalPages: number = 1;

  currency = new FormControl('');
  depositType = new FormControl('');

  currencyList: string[] = ['UZS','USD','EUR','GBP','RUB'];
  filterForm: FormGroup = new FormGroup({
    active: new FormControl('', []),
    annualRate: new FormControl('', []),
  })
  refreshFilter(){
    this.currency.reset()
    this.filterForm.reset()
    this.getDeposits()
  }
  constructor(
    private depositService: DepositService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getDeposits()
  }

  filter() {
    this.depositService.productDepositFilter({
      currency: this.currency.value ? this.currency.value : undefined,
      // depositType: !this.depositType.value || (this.depositType.value == '' || this.depositType.value == []) ? undefined : this.depositType.value,
      // periodType: this.filterForm.value.periodType ? this.filterForm.value.periodType : undefined,
      active: this.filterForm.value.active ? this.filterForm.value.active : false,
      // additional: this.filterForm.value.additional ? this.filterForm.value.additional : undefined,
      annualRate: this.filterForm.value.annualRate && this.filterForm.value.annualRate > 0 ? this.filterForm.value.annualRate : undefined,
    }).then((res: any) => {
      if (res) {
        this.depositsList = res
        if (res.length === 0) {
          this.text = 'Депозит не найден'
        }
      }
    })
  }

  getDeposits() {
    this.depositService.productDepositList({
      filter: {},
      paging: {
        page: this.currentPage - 1,
        size: 100
      }
    }).then((res: any) => {
      if (res) {
        this.depositsList = res.content

        this.depositsList[0].logoUrl = 'https://finlit.uz/upload/iblock/23a/deposite_full.jpg'
        this.depositsList[1].logoUrl = 'https://advice.uz/uploads/q9crHjTv.jpg'
        this.totalPages = res.paging.totalPages
        if (res.content.length === 0) {
          this.text = 'Список пусть'
        }
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
    this.depositService.productDepositDelete(id).then(res => {
      if (res) {
        this.showMessage(true, 'Депозит успешно удален', '', [])
        this.getDeposits()
      }
    }).catch(error => {
      console.log(error)
    })
  }

  deactivate(id: string) {
    this.depositService.productDepositDeactivate(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'Депозит успешно деактивирован!')
        this.getDeposits()
      }
    }).catch(error => {
      console.log(error)
    })
  }

  activate(id: string) {
    this.depositService.productDepositActivate(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'Депозит успешно активирован!')
        this.getDeposits()
      }
    }).catch(error => {
      console.log(error)
    })
  }

  pageClicked(val: number) {
    this.currentPage = val
    this.getDeposits()
  }

  pagePrevTo() {
    // @ts-ignore
    this.currentPage--
    this.getDeposits()
  }

  pageNextTo() {
    // @ts-ignore
    this.currentPage++
    this.getDeposits()
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
