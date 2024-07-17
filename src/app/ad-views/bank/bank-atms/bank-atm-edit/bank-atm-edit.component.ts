import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PointService} from "../../../../ad-services/point.service";
import {MatDialog} from "@angular/material/dialog";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-bank-atm-edit',
  templateUrl: './bank-atm-edit.component.html',
  styles: []
})
export class BankAtmEditComponent implements OnInit {
  pointId: string = ''
  regionType:Array<string> = []
  selected = new FormControl([]);
  editATMForm: FormGroup = new FormGroup({
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
    closedDays: new FormControl('', [])

  })
  weekDays: Array<any> = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']

  constructor(
    private route: ActivatedRoute,
    private pointService: PointService,
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
      this.pointId = q.id
      this.getData(q.id)
    })
    this.getRegions()
  }
  getLanguage(week:any){
    if (week){
      switch (week){
        case "MONDAY":
          return "Понедельник"
        case "TUESDAY":
          return "Вторник"
        case "WEDNESDAY":
          return "Среда"
        case "THURSDAY":
          return "Четверг"
        case "FRIDAY":
          return "Пятница"
        case "SATURDAY":
          return "Суббота"
        case "SUNDAY":
          return "Воскресенье"
      }
      return week
    }
  }
  getRegions(){
    this.pointService.pointRegionTypeList().then((res:any)=>{
      this.regionType = res.data
    })
  }
  getData(id: string) {
    this.pointService.pointGet(id).then((res: any) => {
      if (res) {
        if (res.closedDays){
          this.selected.setValue(res.closedDays)
        }
        this.editATMForm.patchValue({
          name: res.name ? `${res.name}` : '',
          mail: res.mail ? `${res.mail}` : '',
          fax: res.faks ? `${res.faks}` : '',
          region: res.region ? `${res.region}` : '',
          city: res.city ? `${res.city}` : '',
          street: res.street ? `${res.street}` : '',
          closedAt: res.closedAt ? `${res.closedAt}` : '',
          openedAt: res.openedAt ? `${res.openedAt}` : '',
          longitude: res.longitude ? `${res.longitude}` : '0',
          latitude: res.latitude ? `${res.latitude}` : '0',
          phone: res.phone ? `${res.phone}` : '',
          pointType: res.entityType ? `${res.entityType}` : '',
          orientation: res.orientation ? `${res.orientation}` : '',
          regionType: res.regionType ? `${res.regionType}` : '',
          closedDays: res.closedDays ? `${res.closedDays}` : '',
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }

  formSubmit() {
    if (this.editATMForm.valid) {
      this.pointService.pointUpdate({
        id: this.pointId,
        name: this.editATMForm.value.name,
        pointType: this.editATMForm.value.pointType,
        region: this.editATMForm.value.region,
        city: this.editATMForm.value.city,
        street: this.editATMForm.value.street,
        orientation: this.editATMForm.value.orientation,
        longitude: this.editATMForm.value.longitude,
        latitude: this.editATMForm.value.latitude,
        phone: this.editATMForm.value.phone,
        regionType: this.editATMForm.value.regionType,
        fax: this.editATMForm.value.fax,
        mail: this.editATMForm.value.mail,
        openedAt: this.editATMForm.value.openedAt,
        closedAt: this.editATMForm.value.closedAt,
        closedDays: this.selected.value
      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'АТМ успешно изменен')
        }
        this.router.navigate(['/bank/atms'])
      }).catch(error => {
        console.log(error)
      })
    }
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
