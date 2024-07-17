import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdAgreeDialogComponent} from "../../../ad-agree-dialog/ad-agree-dialog.component";
import {MarketingService} from "../../../../ad-services/marketing.service";
import {AdStatusDialogComponent} from "../../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-ordered-card-change-status',
  templateUrl: './ordered-card-change-status.component.html',
  styleUrls: ['./ordered-card-change-status.component.scss']
})
export class OrderedCardChangeStatusComponent implements OnInit {
  @Output() onUpdate = new EventEmitter<any>()
  @ViewChild('ccNumber') ccNumber!: ElementRef;
  filteredStatusList: Array<any> = []
  isPan: boolean = false

  updateForm: FormGroup = new FormGroup({
    status: new FormControl('', Validators.required),
    updateReason: new FormControl('', Validators.required),
    pan: new FormControl('', Validators.compose([Validators.pattern('^[ 0-9]*$'), Validators.minLength(19), Validators.maxLength(19)]))
  })

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<OrderedCardChangeStatusComponent>,
    private marketingService: MarketingService,
    @Inject(MAT_DIALOG_DATA) public data: {
      info: any,
      statusList: Array<any>
    }
  ) {
  }

  ngOnInit(): void {
    this.updateForm.patchValue({
      status: this.data.info.status
    })
    this.filterStatusList()
  }

  filterStatusList() {
    if (this.data.info.status === 'NEW') {
      // NEW / DECLINED / IN_PROGRESS
      this.filteredStatusList = this.data.statusList.filter(el => {
        return el.value === 'NEW' || el.value === 'DECLINED' || el.value === 'IN_PROGRESS'
      })
    }
    if (this.data.info.status === 'DECLINED') {
      // DECLINED
      this.filteredStatusList = this.data.statusList.filter(el => {
        return el.value === 'DECLINED'
      })
    }
    if (this.data.info.status === 'IN_PROGRESS') {
      // READY / DELIVERING / DECLINED
      this.filteredStatusList = this.data.statusList.filter(el => {
        return el.value === 'IN_PROGRESS' || el.value === 'READY' || el.value === 'DELIVERING' || el.value === 'DECLINED'
      })
    }
    if (this.data.info.status === 'READY') {
      // SUCCESS
      this.filteredStatusList = this.data.statusList.filter(el => {
        return el.value === 'READY' || el.value === 'SUCCESS'
      })
    }
    if (this.data.info.status === 'DELIVERING') {
      // SUCCESS
      this.filteredStatusList = this.data.statusList.filter(el => {
        return el.value === 'DELIVERING' || el.value === 'SUCCESS'
      })
    }
    if (this.data.info.status === 'SUCCESS') {
      // SUCCESS
      this.filteredStatusList = this.data.statusList.filter(el => {
        return el.value === 'SUCCESS'
      })
    }
  }

  selectionChange(event: any) {
    this.isPan = event.value === 'READY' || event.value === 'DELIVERING';
  }

  updateStatus() {
    if (this.isPan && this.updateForm.valid) {
      let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
        data: {
          title: 'Вы точно хотите изменить статус ?'
        }
      })
      dialogRef.componentInstance.onAgree.subscribe(() => {
        dialogRef.close()
        this.update()
      })
    } else if (!this.isPan && this.updateForm.value.status !== '' && this.updateForm.value.updateReason !== '') {
      let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
        data: {
          title: 'Вы точно хотите изменить статус ?'
        }
      })
      dialogRef.componentInstance.onAgree.subscribe(() => {
        dialogRef.close()
        this.update()
      })
    }
  }

  update() {
    let reqData = {}
    if (this.isPan) {
      reqData = {
        uuid: this.data.info.uuid,
        pan: this.updateForm.value.pan.replace(/\s/g, ''),
        status: this.updateForm.value.status,
        updateReason: this.updateForm.value.updateReason
      }
    } else {
      reqData = {
        uuid: this.data.info.uuid,
        status: this.updateForm.value.status,
        updateReason: this.updateForm.value.updateReason
      }
    }
    this.marketingService.orderCardStatusChange(reqData).then((res: any) => {
      if (res) {
        this.showMessage(true, 'Успешно изменен!')
        this.onUpdate.emit()
      }
    })
  }

  maskCardNumber() {
    let trimmedCardNum = this.ccNumber.nativeElement.value.replace(/\s+/g, '');
    const partitions = trimmedCardNum.startsWith('34') || trimmedCardNum.startsWith('37')
      ? [4, 6, 5]
      : [4, 4, 4, 4];
    if (trimmedCardNum.length > 16) {
      trimmedCardNum = trimmedCardNum.substr(0, 16);
    }
    const numbers: any = []
    let position = 0
    partitions.forEach(partition => {
      const part = trimmedCardNum.substr(position, partition);
      if (part) numbers.push(part);
      position += partition;
    })
    this.updateForm.patchValue({
      pan: numbers.join(' ')
    })
  }

  close() {
    this.dialogRef.close()
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }
}
