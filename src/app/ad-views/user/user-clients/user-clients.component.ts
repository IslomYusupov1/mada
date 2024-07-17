import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../ad-services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";


@Component({
  selector: 'app-user-clients',
  templateUrl: './user-clients.component.html',
  styleUrls: ['./user-clients.component.scss']
})
export class UserClientsComponent implements OnInit {
  loadingList: boolean = false;
  dataList: Array<any> = [];
  totalPages: number = 1;
  currentPage: number = 1;
  from: string = ''
  to: string = ''
  addressRegionList: Array<any> = []
  regionChildList: Array<any> = []
  selectedFilterBtn: string = ''
  show: boolean = false
  search: string = '';
  totalItems: number = 0;
  reqData: any = {
    filter: {},
    paging: {
      page: 0,
      size: 20
    }
  }

  searchForm: FormGroup = new FormGroup({
    phone: new FormControl('', []),
    zone: new FormControl('', []),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    pinfl: new FormControl(''),
    regionId: new FormControl(''),
    districtId: new FormControl({value: '', disabled: true}),
    gender: new FormControl(''),
  })



  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getUserList()
    this.getAddressRegionList()
  }

  reIdentity(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы точно хотите переидентифицировать?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.activate(id)
      this.getUserList()
    })
  }

  upToVipStatus(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы действительно хотите повысить статус до Vip?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.changeToVipStatus(id)
    })
  }

  changeToVipStatus(id: string) {
    this.userService.changeToVipStatus(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'Успешно')
        this.getUserList()
      }
    })
  }

  activate(id: string) {
    this.userService.reId(id).then((res: any) => {
      if (res) {
        res.status === true ? this.showMessage(true, 'Успешно') : this.showMessage(false, 'клиент не найден')
      }
    })
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  getUserList() {
    this.loadingList = true
    this.userService.userGetList(this.reqData).then((res: any) => {
      if (res) {
        this.loadingList = false
        this.dataList = res.content
        this.totalPages = res.paging.totalPages
        this.totalItems = res.paging.totalItems
      }
    })
  }

  getAddressRegionList(): void {
    this.userService.addressRegionList().then((res: any) => {
      if (res) {
        this.addressRegionList = res
        console.log(res)
      }
    })
  }

  setDistrictValue(event: any): void {
    if (event.value) {
      this.addressRegionList.forEach(item => {
        if (item.id === event.value) {
          this.regionChildList = item.childList
          this.searchForm.get('districtId')?.enable()
          return
        }
      })
    }
  }

  exportToExcel(): void {
    localStorage.setItem('loadingCol', '1')
    this.userService.exportToExcel(this.reqData).subscribe((response) => {
      let blob: any = new Blob([response], {type: "application/octet-stream"})
      const a = document.createElement("a");
      a.download = "clients.xlsx";
      a.href = URL.createObjectURL(blob);
      a.click();
      localStorage.setItem('loadingCol', '0')
    })
  }



  clearInput() {
    this.searchForm.patchValue({
      phone: ''
    })
  }

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

  // Filter users (clients)
  filterUsers() {
    this.reqData.paging['page'] = 0
    this.currentPage = 1
    if (this.searchForm.value.phone !== '') {
      this.reqData.filter.phone = this.searchForm.value.phone
    } else {
      delete this.reqData.filter['phone']
    }

    if (this.searchForm.value.zone !== '') {
      this.reqData.filter.zone = this.searchForm.value.zone
    } else {
      delete this.reqData.filter['zone']
    }

    if (this.searchForm.value.firstName !== '') {
      this.reqData.filter.firstName = this.searchForm.value.firstName
    } else {
      delete this.reqData.filter['firstName']
    }

    if (this.searchForm.value.lastName !== '') {
      this.reqData.filter.lastName = this.searchForm.value.lastName
    } else {
      delete this.reqData.filter['lastName']
    }

    if (this.searchForm.value.pinfl !== '') {
      this.reqData.filter.pinfl = this.searchForm.value.pinfl
    } else {
      delete this.reqData.filter['pinfl']
    }

    if (this.searchForm.value.gender !== '') {
      this.reqData.filter.gender = this.searchForm.value.gender
    } else {
      delete this.reqData.filter['gender']
    }

    if (this.searchForm.value.regionId !== '') {
      this.reqData.filter.regionId = this.searchForm.value.regionId
    } else {
      delete this.reqData.filter['regionId']
    }

    if (this.searchForm.value.districtId !== '') {
      this.reqData.filter.districtId = this.searchForm.value.districtId
    } else {
      delete this.reqData.filter['districtId']
    }

    if (this.from !== '' && this.to !== '') {
      this.reqData.filter.fromTime = this.from
      this.reqData.filter.toTime = this.to
    } else {
      delete this.reqData.filter['fromTime']
      delete this.reqData.filter['toTime']
    }

    this.getUserList()
  }

  // Refresh Filter Form
  refreshFilter() {
    this.reqData = {
      filter: {},
      paging: {
        page: 0,
        size: 20
      }
    }
    this.searchForm.patchValue({
      phone: '',
      zone: '',
      firstName: '',
      lastName: '',
      pinfl: '',
      districtId: '',
      regionId: '',
      gender: ''
    })
    this.searchForm.get('districtId')?.disable()
    this.regionChildList = []
    this.currentPage = 1
    this.from = ''
    this.to = ''
    this.selectedFilterBtn = 'allPeriod'

    this.getUserList()
  }

  getStatusName(status: string) {
    switch (status) {
      case 'ACTIVE':
        return 'Активный'
      case 'BLOCK':
        return 'Заблокирован'
    }
    return status
  }

  get searchInput() {
    return this.searchForm.get('search')
  }

  pageClicked(val: number) {
    if (this.currentPage !== val) {
      this.currentPage = val
      this.reqData.paging.page = val - 1
      this.getUserList()
    }

  }

  pagePrevTo() {
    this.currentPage--
    this.reqData.paging.page--
    this.getUserList()
  }

  pageNextTo() {
    this.currentPage++
    this.reqData.paging.page++
    this.getUserList()
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
