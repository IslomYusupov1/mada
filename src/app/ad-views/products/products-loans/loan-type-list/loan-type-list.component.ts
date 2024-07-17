import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoanService} from "../../../../ad-services/loan.service";
import {MatDialog} from "@angular/material/dialog";
import {AdAgreeDialogComponent} from "../../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-loan-type-list',
  templateUrl: './loan-type-list.component.html',
  styles: []
})
export class LoanTypeListComponent implements OnInit {
  defaultImg: string = './assets/images/xalqLogo.png'
  loanType: string = ''
  loanTypeList: Array<any> = []

  constructor(
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
      this.loanType = q.loan
      this.getLoanTypes({
        loanType: q.loan
      })
    })
  }

  getLoanTypes(data: any) {
    this.loanService.productLoanTypeGet(data).then((res: any) => {
      if (res) {
        this.loanTypeList = res
      }
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

  delete(id: string) {
    this.loanService.productLoanTypeDelete(id).then(res => {
      if (res) {
        this.showMessage(true, 'Тип кредита успешно удален', '', [])
        this.getLoanTypes({loanType: this.loanType})
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

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
