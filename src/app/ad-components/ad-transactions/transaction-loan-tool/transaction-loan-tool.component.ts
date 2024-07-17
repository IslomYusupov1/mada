import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoanService} from "../../../ad-services/loan.service";
import {HrService} from "../../../ad-services/helper/hr.service";
import {AdAgreeDialogComponent} from "../../ad-agree-dialog/ad-agree-dialog.component";
import {TransactionLoanToolCauseComponent} from "./transaction-loan-tool-cause/transaction-loan-tool-cause.component";

@Component({
  selector: 'app-transaction-loan-tool',
  templateUrl: './transaction-loan-tool.component.html',
  styleUrls: ['./transaction-loan-tool.component.scss']
})
export class TransactionLoanToolComponent implements OnInit {
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>()

  changedLoader: boolean = false
  changedData: any
  loanLoader: boolean = false
  loanData: any
  transactionLoader: boolean = false
  transactionData: any
  transactionId!: number
  transactionUUID!: string

  constructor(
    private loanService: LoanService,
    private hrService: HrService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<TransactionLoanToolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      id: number,
      uuid: string,
      operationType: string,
      recipientService: string,
      senderService: string,
      status: string,
      cause: string
    }
  ) {
    if (this.data.id && this.data.uuid) {
      this.transactionId = this.data.id
      this.transactionUUID = this.data.uuid
    }
  }

  ngOnInit(): void {
    if (this.transactionId && this.transactionUUID) {
      this.changedBy()
      this.checkCreditTransaction()

      if (this.data.senderService !== 'inps_outcome' && this.data.operationType !== 'Wallet2P') {
        this.paymentTransactionCheck()
      }
    }
  }

  paymentAnorCheck(): void {
    this.loanLoader = true
    this.loanService.paymentCheckAnor(this.transactionUUID).then((res: any) => {
      if (res) {
        console.log(res)
        this.loanData = res
        this.loanLoader = false
      } else {
        this.loanLoader = false
      }
    })
  }

  checkCreditTransaction(): void {
    if (this.data.operationType === 'Wallet2P' || this.data.operationType === 'P2P') {
      this.paymentCheckCreditTransaction()
    } else {
      this.paymentCheckByService()
    }
  }

  paymentCheckByService(): void {
    if (this.data.recipientService === 'uzasbo_child' || this.data.recipientService === 'uzasbo_student' || this.data.recipientService === 'account' || this.data.recipientService === 'budget') {
      this.paymentAnorCheck()
    } else {
      this.paymentLoanCheck()
    }
  }

  paymentCheckCreditTransaction(): void {
    if (this.data.recipientService === 'paynet') {
      return
    }
    this.loanLoader = true
    this.loanService.paymentCheckCreditTransaction(this.transactionUUID).then((res: any) => {
      if (res) {
        this.loanData = res
        this.loanLoader = false
      } else {
        this.loanLoader = false
      }
    })
  }

  paymentLoanCheck(): void {
    if (this.data.recipientService === 'paynet') {
      return
    }
    this.loanLoader = true
    this.loanService.paymentAbsCheck(this.transactionUUID).then((res: any) => {
      if (res) {
        this.loanData = res
        this.loanLoader = false
      } else {
        this.loanLoader = false
      }
    })
  }

  paymentTransactionCheck(): void {
    this.transactionLoader = true
    this.loanService.paymentCheckTransaction(this.transactionUUID).then((res: any) => {
      if (res) {
        this.transactionData = res
        this.transactionLoader = false
      } else {
        this.transactionLoader = false
      }
    })
  }

  changedBy(): void {
    this.changedLoader = true
    this.loanService.paymentToolChangedBy(this.transactionUUID).then((res: any) => {
      if (res) {
        this.changedData = res.message
        this.changedLoader = false
      } else {
        this.changedLoader = false
      }
    })
  }

  openCauseDialog(): void {
    let dialogRef = this.dialog.open(TransactionLoanToolCauseComponent, {
      width: '400px',
      data: {
        id: this.transactionUUID
      }
    })
    dialogRef.componentInstance.onPrepare.subscribe(() => {
      dialogRef.close()
    })
  }

  openAgreeDialog(): void {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы действительно хотите вернуть деньги?'
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.openCauseDialog()
    })
  }

  openConfirmDialog(): void {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы действительно хотите вернуть деньги?'
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.paymentTransactionConfirm()
    })
  }

  // paymentTransactionPrepare(): void {
  //   this.loanService.paymentToolPrepareTransaction(this.transactionUUID).then((res: any) => {
  //     if (res) {
  //       this.hrService.showMessage(true, res.message ? res.message : 'Успешно!')
  //     }
  //   })
  // }

  paymentTransactionConfirm(): void {
    this.loanService.paymentToolConfirmTransaction(this.transactionUUID).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, res.message ? res.message : 'Успешно!')
        this.onConfirm.emit()
      }
    })
  }

  paymentTransactionCancel(): void {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы точно хотите отменить ?'
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.loanService.paymentToolCancelTransaction(this.transactionUUID).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, res.message ? res.message : 'Успешно!')
        }
      })
    })
  }

  close(): void {
    this.dialogRef.close()
  }
}
