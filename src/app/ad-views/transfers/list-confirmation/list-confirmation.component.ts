import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../ad-services/user.service";
import {
  TransactionLoanToolComponent
} from "../../../ad-components/ad-transactions/transaction-loan-tool/transaction-loan-tool.component";
import {MatDialog} from "@angular/material/dialog";
import {
  ListConfirmationDetailDialogComponent
} from "./list-confirmation-detail-dialog/list-confirmation-detail-dialog.component";

@Component({
  selector: 'app-list-confirmation',
  templateUrl: './list-confirmation.component.html',
  styleUrls: ['./list-confirmation.component.scss']
})
export class ListConfirmationComponent implements OnInit {
  loading: boolean = false
  dataList: Array<any> = []
  totalPages: number = 1
  currentPage: number = 1
  totalItems: number = 0
  status: string = 'PREPARE'
  reqData: any = {
    paging: {
      page: 0,
      size: 10
    },
    status: 'PREPARE'
  }

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.loading = true
    this.userService.toolPrepareList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.items
        this.totalPages = res.paging.totalPages
        this.totalItems = res.paging.totalItems
        this.loading = false
      } else {
        this.dataList = []
        this.loading = false
      }
    })
  }

  paymentToolCheck(uuid: string, operationType: string, status: string, recipientService: string): void {
    let dialogRef = this.dialog.open(TransactionLoanToolComponent, {
      width: '95%',
      height: '95%',
      data: {
        id: 1,
        uuid,
        operationType,
        status,
        recipientService,
        senderService: 'aa',
        cause: 'confirm'
      }
    })
    dialogRef.componentInstance.onConfirm.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  statusChanged(event: any) {
    if (event.value) {
      this.reqData.paging['page'] = 0
      this.reqData['status'] = event.value
      this.currentPage = 1
      this.getData()
    }
  }

  openDetailsDialog(item: any): void {
    this.dialog.open(ListConfirmationDetailDialogComponent, {
      width: '500px',
      maxWidth: '500px',
      maxHeight: '700px',
      data: {
        item
      }
    })
  }

  pageClicked(val: number) {
    if (this.currentPage !== val) {
      this.reqData.paging.page = val - 1
      this.currentPage = val
      this.getData()
    }
  }

  pagePrevTo() {
    this.reqData.paging.page--
    this.currentPage--
    this.getData()
  }

  pageNextTo() {
    this.reqData.paging.page++
    this.currentPage++
    this.getData()
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
