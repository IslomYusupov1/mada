import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {HrService} from "../../../ad-services/helper/hr.service";
import {UserService} from "../../../ad-services/user.service";
import {
  InternationalTransferInfoComponent
} from "../../../ad-components/ad-transactions/international-transfer-info/international-transfer-info.component";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-international-transfers',
  templateUrl: './international-transfers.component.html',
  styleUrls: ['./international-transfers.component.scss']
})
export class InternationalTransfersComponent implements OnInit {
  dataList: Array<any> = []
  typesList: Array<any> = []
  loadingList: boolean = false
  isFilter: boolean = false
  selectedFilterBtn: string = ''
  from: string = ''
  to: string = ''
  totalPages: number = 1
  currentPage: number = 1
  totalItems: number = 0
  merchantList: Array<string> = []
  serviceId!: number | null

  filterForm: FormGroup = this.fb.group({
    firstName: '',
    lastName: '',
    transferDirection: '',
    country: '',
    refNum: '',
    clientCode: '',
    currency: '',
    clientId: '',
    service: ''
  })

  reqData: any = {
    filter: {},
    paging: {
      page: 0,
      size: 10
    }
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private hrService: HrService,
    private fb: FormBuilder
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.loadingList = true
    this.userService.imtHistory(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.dataList.forEach(item => {
          item.date = this.hrService.reqDataWithTime(item.date)
        })
        this.loadingList = false
      } else {
        this.dataList = []
        this.loadingList = false
      }
    })
  }

  filter(): void {
    if (this.to && this.from) {
      this.reqData.filter['fromDate'] = this.from
      this.reqData.filter['endDate'] = this.to
    } else {
      delete this.reqData.filter['fromDate']
      delete this.reqData.filter['endDate']
    }

    if (this.filterForm.value.firstName) {
      this.reqData.filter['firstName'] = this.filterForm.value.firstName
    } else {
      delete this.reqData.filter['firstName']
    }

    if (this.filterForm.value.lastName) {
      this.reqData.filter['lastName'] = this.filterForm.value.lastName
    } else {
      delete this.reqData.filter['lastName']
    }

    if (this.filterForm.value.country) {
      this.reqData.filter['country'] = this.filterForm.value.country
    } else {
      delete this.reqData.filter['country']
    }

    if (this.filterForm.value.clientCode) {
      this.reqData.filter['clientCode'] = this.filterForm.value.clientCode
    } else {
      delete this.reqData.filter['clientCode']
    }

    if (this.filterForm.value.clientId) {
      this.reqData.filter['clientId'] = this.filterForm.value.clientId
    } else {
      delete this.reqData.filter['clientId']
    }

    if (this.filterForm.value.transferDirection) {
      this.reqData.filter['transferDirection'] = this.filterForm.value.transferDirection
    } else {
      delete this.reqData.filter['transferDirection']
    }

    if (this.filterForm.value.currency) {
      this.reqData.filter['currency'] = this.filterForm.value.currency
    } else {
      delete this.reqData.filter['currency']
    }

    this.getData()
  }

  clearFilter(): void {
    this.reqData = {
      filter: {},
      paging: {
        page: 0,
        size: 10
      }
    }
    this.filterForm.patchValue({
      firstName: '',
      lastName: '',
      transferDirection: '',
      country: '',
      refNum: '',
      clientCode: '',
      currency: '',
      clientId: '',
      service: '',
    })
    this.currentPage = 1
    this.from = ''
    this.to = ''
    this.selectedFilterBtn = 'allPeriod'

    this.getData()
  }

  exportToExcel(): void {
    localStorage.setItem('loadingCol', '1')
    this.userService.transactionExportToExcel(this.reqData, '/imt/download/excel').subscribe((response) => {
      let blob: any = new Blob([response], {type: "application/octet-stream"})
      const a = document.createElement("a");
      a.download = "imt-transfers.xlsx";
      a.href = URL.createObjectURL(blob);
      a.click();
      localStorage.setItem('loadingCol', '0')
    })
  }

  openDetailsDialog(id: number): void {
    this.userService.imtHistoryGetOne(id).then((res: any) => {
      if (res) {
        this.dialog.open(InternationalTransferInfoComponent, {
          width: '80%',
          maxWidth: '80%',
          maxHeight: '700px',
          data: {
            info: res
          }
        })
      }
    })
  }

  // Pagination
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

  // Time filter buttons
  setTime(event: any) {
    this.selectedFilterBtn = ''
    this.from = event.fromTime
    this.to = event.toTime
  }

  setFromTime(event: string) {
    this.selectedFilterBtn = ''
    this.from = event ? event : ''
  }

  setToTime(event: string) {
    this.selectedFilterBtn = ''
    this.to = event ? event : ''
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
