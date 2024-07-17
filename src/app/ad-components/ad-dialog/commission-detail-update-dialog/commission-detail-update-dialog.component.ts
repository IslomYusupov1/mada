import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../ad-services/auth.service";
import {HrService} from "../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-commission-detail-update-dialog',
  templateUrl: './commission-detail-update-dialog.component.html',
  styles: []
})
export class CommissionDetailUpdateDialogComponent implements OnInit {
  disabled!: boolean
  @Output() updateDetail = new EventEmitter<void>()
  updateCommissionForm: FormGroup = new FormGroup({
    detailId: new FormControl('', Validators.required),
    isFixAmount: new FormControl('', Validators.required),
    fixAmount: new FormControl('',Validators.required),
    rate: new FormControl('',Validators.required),
  })

  constructor(
    private _auth:AuthService,
    private _hr:HrService,
    @Inject(MAT_DIALOG_DATA) public data: {
      currency: string,
      detailId: number,
      fixAmount: number,
      isFixAmount: boolean,
      isSender: boolean,
      rate: number
    }
  ) {
  }

  ngOnInit() {
    this.updateCommissionForm.patchValue({
      detailId:this.data.detailId,
      fixAmount:this.data.fixAmount  / 100,
      isFixAmount:this.data.isFixAmount ,
      rate:this.data.rate / 100
    })
    if (this.data.isFixAmount){
      this.updateCommissionForm.controls['rate'].disable()
      this.updateCommissionForm.controls['fixAmount'].enable()
    }
    else {
      this.updateCommissionForm.controls['fixAmount'].disable()
      this.updateCommissionForm.controls['rate'].enable()
    }
  }
  setIsFixAmount(check:boolean){
    if (check){
      this.updateCommissionForm.controls['rate'].disable()
      this.updateCommissionForm.controls['fixAmount'].enable()
    }
    else {
      this.updateCommissionForm.controls['fixAmount'].disable()
      this.updateCommissionForm.controls['rate'].enable()
    }
    this.updateCommissionForm.patchValue({
      isFixAmount:check
    })
  }
  formSubmit(){
    if (this.updateCommissionForm.valid){
      if (this.updateCommissionForm.value.isFixAmount){
        this.updateCommissionForm.patchValue({
          fixAmount:this.updateCommissionForm.value.isFixAmount * 100
        })
      }
      else {
        this.updateCommissionForm.patchValue({
          rate:this.updateCommissionForm.value.rate * 100
        })
      }
      this._auth.updateDetailCommission(this.updateCommissionForm.value).then((res:any)=>{
        if (res){
          this._hr.showMessage(true,'Успешно')
          this.updateDetail.emit()
        }
        else {
          this.updateCommissionForm.patchValue({
            rate:this.data.rate  / 100,
            fixAmount:this.data.fixAmount  / 100,
            isFixAmount:this.data.isFixAmount
          })
        }
      }).catch((error)=>{
        this.updateCommissionForm.patchValue({
          rate:this.data.rate  / 100,
          fixAmount:this.data.fixAmount  / 100,
          isFixAmount:this.data.isFixAmount
        })
      })
    }

  }
}
