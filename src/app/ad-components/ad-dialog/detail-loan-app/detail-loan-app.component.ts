import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LoanService} from "../../../ad-services/loan.service";
import {HrService} from "../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-detail-loan-app',
  templateUrl: './detail-loan-app.component.html',
  styles: []
})
export class DetailLoanAppComponent implements OnInit {
  @Output() onDetail = new EventEmitter<string>()
  detail: boolean = true
  insurance:boolean  = false
  constructor(
    public dialogDetail: MatDialogRef<DetailLoanAppComponent>,
    private loanService: LoanService,
    private hrService: HrService,
    @Inject(MAT_DIALOG_DATA) public data: { items: any, detail: string, id: number, state: string }
  ) {
  }


  ngOnInit(): void {
    if (this.data.detail === 'insurance') {
      this.insurance = true
      this.detail = false
    } else {
      this.detail = true
      this.insurance = false
    }
  }

  closeDialog() {
    this.dialogDetail.close()
  }

  getInsuranceFile() {
    this.loanService.getLoanAppInsuranceFile(this.data.id).then((res: any) => {
      if (res && res.message) {
        window.open(res.message)
      } else {
        this.hrService.showMessage(false, 'Ошибка!')
      }
    })
  }
}
