import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LoanService} from "../../../../ad-services/loan.service";
import {MatDialog} from "@angular/material/dialog";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-loan-type-create',
  templateUrl: './loan-type-create.component.html',
  styles: []
})
export class LoanTypeCreateComponent implements OnInit {
  loanType: string = ''
  createLoanTypeForm: FormGroup = new FormGroup({
    name: new FormControl('', []),
    loanType: new FormControl({value: '', disabled: true}, []),
    description: new FormControl('', []),
  })

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
      this.createLoanTypeForm.patchValue({
        loanType: q.loan
      })
      this.loanType = q.loan
    })
  }

  createLoanType() {
    if (this.createLoanTypeForm.valid) {
      this.loanService.productLoanTypeCreate({
        name: this.createLoanTypeForm.value.name,
        loanType: this.loanType,
        description: this.createLoanTypeForm.value.description
      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Success!')
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
    this._location.back();
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
