import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PointService} from "../../../ad-services/point.service";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-create-bank-atm',
  templateUrl: './create-bank-atm.component.html',
  styleUrls: ['./create-bank-atm.component.scss']
})
export class CreateBankAtmComponent implements OnInit {
  time: NgbTimeStruct = {hour: 13, minute: 30, second: 30};
  regionType:Array<string> = []
  createATMForm: FormGroup = new FormGroup({
    name: new FormControl('', []),
    mail: new FormControl('', []),
    fax: new FormControl('', []),
    region: new FormControl('', []),
    city: new FormControl('', []),
    street: new FormControl('', []),
    closedAt: new FormControl('', []),
    openedAt: new FormControl('', []),
    longitude: new FormControl('', []),
    latitude: new FormControl('', []),
    phone: new FormControl('', []),
    regionType: new FormControl('', []),
    pointType: new FormControl('ATM', []),
    orientation: new FormControl('', []),
    closedDays: new FormControl([], [])
  })
  weekDays: Array<{ value: string, name: string }> = [{
    name: 'Понедельник',
    value: 'MONDAY'
  }, {
    name: 'Вторник',
    value: 'TUESDAY'
  }, {
    name: 'Среда',
    value: 'WEDNESDAY'
  }, {
    name: 'Четверг',
    value: 'THURSDAY'
  }, {
    name: 'Пятница',
    value: 'FRIDAY'
  }, {
    name: 'Суббота',
    value: 'SATURDAY'
  }, {
    name: 'Воскресенье',
    value: 'SUNDAY'
  }]
  constructor(
    private pointService: PointService,
    protected dialog: MatDialog,
    private router: Router
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getRegions()
  }
  getRegions(){
    this.pointService.pointRegionTypeList().then((res:any)=>{
      this.regionType = res.data
    })
  }
  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  formSubmit() {
    if (this.createATMForm.valid) {
      this.pointService.createATMBranch(this.createATMForm.value).then((res) => {
        if (res) {
          this.showMessage(true, 'ATM успешно создан')
          this.router.navigate(['bank/atms']).then(() => {
          })
        } else {
          this.showMessage(false)
        }
      })
    }
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
