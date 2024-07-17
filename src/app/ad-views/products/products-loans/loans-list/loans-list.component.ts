import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {LoanService} from "../../../../ad-services/loan.service";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AdAgreeDialogComponent} from "../../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";

@Component({
  selector: 'app-loans-list',
  templateUrl: './loans-list.component.html',
  styles: []
})
export class LoansListComponent implements OnInit {
  type_id: string = ''
  text: string = 'Загрузка...'
  loanName: string = 'Загрузка...'
  defaultImg: string = './assets/images/microloan.png'
  loansList: Array<any> = []
  currentPage: number = 1

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private loanService: LoanService,
    private router: Router,
    public dialog: MatDialog
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(q => {
      this.type_id = q.list
      this.getLoanName(q.list)
      this.getLoans({
        filter: {
          loanTypeId: q.list
        },
        paging: {
          page: this.currentPage - 1,
          size: 10
        }
      })
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
    this.loanService.productLoanDelete(id).then(res => {
      if (res) {
        this.showMessage(true, 'Депозит успешно удален', '', [])
        this.getLoans({
          filter: {
            loanTypeId: this.type_id
          },
          paging: {
            page: this.currentPage - 1,
            size: 10
          }
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }

  deactivate(id: string) {
    this.loanService.productLoanDeactivate(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'Депозит успешно деактивирован!')
        this.getLoans({
          filter: {
            loanTypeId: this.type_id
          },
          paging: {
            page: this.currentPage - 1,
            size: 10
          }
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }

  activate(id: string) {
    this.loanService.productLoanActivate(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'Депозит успешно активирован!')
        this.getLoans({
          filter: {
            loanTypeId: this.type_id
          },
          paging: {
            page: this.currentPage - 1,
            size: 10
          }
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  getLoans(data: any) {
    this.loanService.productLoansGet(data).then((res: any) => {
      if (res) {
        this.loansList = res.content
        if (this.loansList.length === 0) {
          this.text = 'Список пуст'
        }
      }
    })
  }

  getLoanName(id: string) {
    this.loanService.productLoanTypeGetOne(id).then((res: any) => {
      if (res && res.loanName) {
        this.loanName = res.loanName
      }
    })
  }

  backUrl() {
    this._location.back()
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
