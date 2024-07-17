import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";
import {LoanService} from "../../../../ad-services/loan.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-loan-type-edit',
  templateUrl: './loan-type-edit.component.html',
  styles: []
})
export class LoanTypeEditComponent implements OnInit {
  loanId: string = '';
  loanType: string = '';

  editLoanTypeForm: FormGroup = new FormGroup({
    loanName: new FormControl('Загрузка...', []),
    loanType: new FormControl({value: 'Загрузка...', disabled: true}, []),
    description: new FormControl('Загрузка...', [])
  })

  constructor(
    private _location: Location,
    private loanService: LoanService,
    private route: ActivatedRoute,
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
      this.loanId = q.loan
      this.getData(q.loan)
    })
  }

  getData(id: string) {
    this.loanService.productLoanTypeGetOne(id).then((res: any) => {
      if (res) {
        this.loanType = res.loanType
        this.editLoanTypeForm.patchValue({
          loanName: res?.loanName ? `${res.loanName}` : 'Нет данных',
          loanType: res?.loanType ? `${res.loanType}` : 'Нет данных',
          description: res?.description ? `${res.description}` : 'Нет данных',
        })
      }
    })
  }

  editLoanType() {
    if (this.editLoanTypeForm.valid) {
      this.loanService.productLoanTypeUpdate({
        id: this.loanId,
        name: this.editLoanTypeForm.value.loanName,
        loanType: this.loanType,
        description: this.editLoanTypeForm.value.description
      }).then((res: any) => {
        console.log(res)
        if (res) {
          this.showMessage(true, 'Тип кредита успешно изменен!')
          setTimeout(() => {
            this.backUrl()
          }, 1000)
        }
      })
    }
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
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
