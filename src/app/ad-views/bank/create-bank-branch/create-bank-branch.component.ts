import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PointService} from "../../../ad-services/point.service";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-bank-branch',
  templateUrl: './create-bank-branch.component.html',
  styleUrls: ['./create-bank-branch.component.scss']
})
export class CreateBankBranchComponent implements OnInit {
  regionType: Array<string> = []
  imagePath: any = './assets/images/default-image.png'
  createBranchForm: FormGroup = new FormGroup({
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
    pointType: new FormControl('BRANCH', []),
    orientation: new FormControl('', []),
    closedDays: new FormControl([], []),
    attachmentId: new FormControl('', [])
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
    protected dialog: MatDialog,
    private router: Router,
    private pointService: PointService
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getRegions()
  }
  fileUpload(event: any) {
    let target = event.target
    let selectedFile = target.files[0]
    let type = selectedFile.type.split('/')[0]
    if (type != 'image') {
      alert('пожалуйста, выберите изображение')
      return
    }
    this.imagePath = './assets/loader1.svg'
    let fileReader = new FileReader()
    fileReader.readAsDataURL(selectedFile)
    fileReader.onload = () => {
      this.imagePath = fileReader.result
      this.pointService.uploadImageBankBranches(selectedFile).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          if (event.result.data) {
            this.createBranchForm.patchValue({
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
  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  formSubmit() {
    if (this.createBranchForm.valid) {
      this.pointService.createATMBranch(this.createBranchForm.value).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Филиал успешно создан')
          this.router.navigate(['bank/branches']).then(() => {
          })
        } else {
          this.showMessage(false)
        }
      })
    }
  }

  getRegions() {
    this.pointService.pointRegionTypeList().then((res: any) => {
      this.regionType = res.data
    })
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
