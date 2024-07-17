import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {
  FailCallHardDialogComponent
} from "../../../ad-components/ad-dialog/fail-call-hard-dialog/fail-call-hard-dialog.component";
import {UserService} from "../../../ad-services/user.service";

@Component({
  selector: 'app-fail-transactions-detail',
  templateUrl: './fail-transactions-detail.component.html',
  styleUrls: ['./fail-transactions-detail.component.scss']
})
export class FailTransactionsDetailComponent implements OnInit {
  @Output() failDetail = new EventEmitter<void>()

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { detail: any },
    private dialog: MatDialog,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
  }

  bgStatus(status: string) {
    switch (status) {
      case 'PENDING':
        return 'orange'
      case 'SUCCESS':
        return 'green'
      case 'ERROR':
        return 'red'
      case 'RETURNING':
        return 'gray'
      case 'RETURNED':
        return 'gray'
    }
    return status
  }

  getStatus(status: string) {
    switch (status) {
      case 'PENDING':
        return 'В ОЖИДАНИИ'
      case 'SUCCESS':
        return 'УСПЕШНО'
      case 'ERROR':
        return 'ОШИБКА'
      case 'RETURNING':
        return 'ВОЗВРАЩЕНИЕ'
      case 'RETURNED':
        return 'ВОЗВРАЩЕНО'
    }
    return status
  }

  openEditDialog(id: string) {
    if (id) {
      let dialogRef = this.dialog.open(FailCallHardDialogComponent, {
        maxWidth: '400px',
        width: '400px',
        data: {
          id: id
        }
      });
      dialogRef.componentInstance.fail.subscribe(() => {
        dialogRef.close()
        this.getList(id)
      })
    }
  }

  getList(id: any) {
    this.userService.getDetailTransactionFail(id).then((data) => {
      this.data.detail = data
    })
  }

}
