import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PointService} from "../../../../ad-services/point.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-bank-branch-edit',
  templateUrl: './bank-branch-edit.component.html',
  styles: []
})
export class BankBranchEditComponent implements OnInit {
  branchId: string = ''
  regionType: Array<string> = []
  imagePath: any = './assets/images/default-image.png'
  selected = new FormControl([]);

  editBranchForm: FormGroup = new FormGroup({
    name: new FormControl('', []),
    mail: new FormControl('', []),
    fax: new FormControl('', []),
    region: new FormControl('', []),
    city: new FormControl('', []),
    street: new FormControl('', []),
    closedAt: new FormControl('', []),
    openedAt: new FormControl('', []),
    longitude: new FormControl('0', []),
    latitude: new FormControl('0', []),
    phone: new FormControl('', []),
    regionType: new FormControl('', []),
    pointType: new FormControl('BRANCH', []),
    orientation: new FormControl('', []),
    closedDays: new FormControl([],[]),
    attachmentId: new FormControl([],[])
  })
  weekDays: Array<any> = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']

  constructor(
    private pointService: PointService,
    private route: ActivatedRoute,
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
      this.branchId = q.id
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
  getRegions() {
    this.pointService.pointRegionTypeList().then((res: any) => {
      this.regionType = res.data
    })
  }

  getData(id: string) {
    this.pointService.pointGet(id).then((res: any) => {
      if (res) {
       if (res.closedDays){
         this.selected.setValue(res.closedDays)
         this.imagePath = res.attachmentUrl ? res.attachmentUrl : './assets/images/default-image.png'
       }
        this.editBranchForm.patchValue({
          name: res.name ? `${res.name}` : '',
          mail: res.mail ? `${res.mail}` : '',
          fax: res.faks ? `${res.faks}` : '',
          region: res.region ? `${res.region}` : '',
          city: res.city ? `${res.city}` : '',
          street: res.street ? `${res.street}` : '',
          closedAt: res.closedAt ? `${res.closedAt}` : '',
          openedAt: res.openedAt ? `${res.openedAt}` : '',
          longitude: res.longitude ? `${res.longitude}` : '',
          latitude: res.latitude ? `${res.latitude}` : '',
          phone: res.phone ? `${res.phone}` : '',
          pointType: res.entityType ? `${res.entityType}` : '',
          orientation: res.orientation ? `${res.orientation}` : '',
          regionType: res.regionType ? `${res.regionType}` : '',
          attachmentId: res.attachmentId ? `${res.attachmentId}` : '',
        })
      }
    })
  }

  formSubmit() {
    if (this.editBranchForm.valid) {
      this.pointService.pointUpdate({
        id: this.branchId,
        name: this.editBranchForm.value.name,
        pointType: this.editBranchForm.value.pointType,
        region: this.editBranchForm.value.region,
        city: this.editBranchForm.value.city,
        street: this.editBranchForm.value.street,
        orientation: this.editBranchForm.value.orientation,
        longitude: this.editBranchForm.value.longitude,
        latitude: this.editBranchForm.value.latitude,
        phone: this.editBranchForm.value.phone,
        regionType: this.editBranchForm.value.regionType,
        fax: this.editBranchForm.value.fax,
        mail: this.editBranchForm.value.mail,
        openedAt: this.editBranchForm.value.openedAt,
        closedAt: this.editBranchForm.value.closedAt,
        closedDays: this.selected.value,
        attachmentId: this.editBranchForm.value.attachmentId
      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Филиал успешно изменен')
          this.router.navigate(['/bank/branches'])
        }
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
  fileUpload(event: any) {
    let target = event.target
    let selectedFile = target.files[0]
    let type = selectedFile.type.split('/')[0]
    if (type != 'image') {
      alert('пожалуйста, выберите изображение')
      return
    }
    let fileReader = new FileReader()
    fileReader.readAsDataURL(selectedFile)
    fileReader.onload = () => {
      this.imagePath = fileReader.result
      this.pointService.uploadImageBankBranches(selectedFile).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          if (event.result.data) {
            this.editBranchForm.patchValue({
              attachmentId: event.result.data.id
            })
          }
        }
      })
    }
    fileReader.onerror = () => {
      this.imagePath = './assets/images/default-image.png'
    }
  }
}
