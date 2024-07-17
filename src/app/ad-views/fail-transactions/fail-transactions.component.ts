import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {UserService} from "../../ad-services/user.service";
import {AdStatusDialogComponent} from "../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {FailTransactionsDetailComponent} from "./fail-transactions-detail/fail-transactions-detail.component";
import {DatePipe, formatDate} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HrService} from "../../ad-services/helper/hr.service";

interface Post {
  from: Date
  to: Date
}

@Component({
  selector: 'app-fail-transactions',
  templateUrl: './fail-transactions.component.html',
  styleUrls: ['./fail-transactions.component.scss']
})

export class FailTransactionsComponent implements OnInit {
  dateForm!: FormGroup;
  post: Post = {
    from: new Date(Date.now()),
    to: new Date(Date.now())
  }
  dataList: Array<any> = []
  loadingList: boolean = false
  totalPages: number = 1
  currentPage: number = 1
  reqData: any = {
    page: 0,
    size: 10
  }


  constructor(
    public dialog: MatDialog,
    private router: Router,
    public userService: UserService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private hr: HrService
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
    this.dateForm = this.formBuilder.group({
      from: [formatDate(this.post.from, 'yyyy-MM-dd', 'en'), [Validators.required]],
      to: [formatDate(this.post.to, 'yyyy-MM-dd', 'en'), [Validators.required]]
    });
  }

  ngOnInit(): void {
    // const now = new Date()
    // this.firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0]
    // this.lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0]
    this.getList()
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

  search() {
    const start = this.dateForm.value.from
    const end = this.dateForm.value.to
    const first = new Date(this.dateForm.value.from)
    const last = new Date(this.dateForm.value.to)
    let diff = this.monthDiff(first, last)
    if (diff > 1) {
      this.hr.showMessage(false, 'пожалуйста, выберите правильный период максимум месяц')
      this.dateForm = this.formBuilder.group({
        from: [formatDate(this.post.from, 'yyyy-MM-dd', 'en'), [Validators.required]],
        to: [formatDate(this.post.to, 'yyyy-MM-dd', 'en'), [Validators.required]]
      });
    }
    if (end < start) {
      this.hr.showMessage(false, 'Пожалуйста, выберите правильную дату')
      this.dateForm = this.formBuilder.group({
        from: [formatDate(this.post.from, 'yyyy-MM-dd', 'en'), [Validators.required]],
        to: [formatDate(this.post.to, 'yyyy-MM-dd', 'en'), [Validators.required]]
      });
    }
    this.getList()
  }

  monthDiff(d1: any, d2: any) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  getList() {
    this.loadingList = true
    this.userService.getFailTransactions(this.reqData, this.dateForm.value).then((res: any) => {
      if (res) {
        this.dataList = res.trans
        this.totalPages = res.paging.totalPages
        this.loadingList = false
      }
    })
  }

  detail(id: string) {
    this.userService.getDetailTransactionFail(id).then((data) => {
      if (data) {
        let dialogRef = this.dialog.open(FailTransactionsDetailComponent, {
          maxWidth: '800px',
          width: '800px',
          height: '600px',
          data: {
            detail: data
          }
        });
        dialogRef.componentInstance.failDetail.subscribe(() => {
          dialogRef.close()
        })
      }
    })

  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  pageClicked(val: number) {
    this.reqData.page = val - 1
    this.currentPage = val
    this.getList()
  }

  pagePrevTo() {
    // @ts-ignore
    this.reqData.page--
    this.currentPage--
    this.getList()
  }

  pageNextTo() {
    // @ts-ignore
    this.reqData.page++
    this.currentPage++
    this.getList()
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
