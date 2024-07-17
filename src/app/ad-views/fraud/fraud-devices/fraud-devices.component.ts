import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FraudService} from "../../../ad-services/fraud.service";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {HrService} from "../../../ad-services/helper/hr.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-fraud-devices',
  templateUrl: './fraud-devices.component.html',
  styles: []
})
export class FraudDevicesComponent implements OnInit {
  filterForm: FormGroup = new FormGroup({
    deviceId: new FormControl('', []),
    deviceModel: new FormControl('', []),

  })
  dataList: Array<any> = []
  loadingList: boolean = false
  totalPages: number = 1
  currentPage: number = 1
  reqData: any = {
    page: 0,
    size: 10
  }
  params: any = {
    deviceId: null,
    deviceModel: null,
    status: null,
  }

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public fraudService: FraudService,
    private hrService: HrService
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getList()
  }

  filterDevice() {
    this.params['deviceId'] = this.filterForm.value.deviceId
    this.params['deviceModel'] = this.filterForm.value.deviceModel
    if (this.params['deviceId'].length || this.params['deviceModel'].length) {
      this.getList()
    } else {
      this.params['deviceId'] = null
      this.params['deviceModel'] = null
      this.getList()
    }
  }

  clear() {
    this.filterForm.patchValue({
      deviceId: null,
      deviceModel: null
    })
    this.params['deviceId'] = null
    this.params['deviceModel'] = null
    this.params.status = null
    this.getList()
  }

  filter() {
    if (this.params.status === 'Все') {
      this.params.status = null
      this.getList()
    } else {
      this.getList()
    }
  }

  setText(status: string) {
    switch (status) {
      case 'BLOCKED':
        return 'Заблокирован'
      case 'ACTIVE':
        return 'Активный'
    }
    return status
  }

  changeStatusDevice(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы точно хотите изменить ?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.changeStatus(id)
    })
  }

  changeStatus(id: string) {
    this.fraudService.changeStatusDevice(id).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, 'успешно изменено', '', [])
      }
      this.getList()
    })
  }

  getList() {
    this.loadingList = true
    this.fraudService.getFraudDeviceList(this.reqData, this.params).then((res: any) => {
      if (res) {
        this.dataList = res.items
        this.totalPages = res.paging.totalPages
        this.loadingList = false
      }
    })
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
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
}
