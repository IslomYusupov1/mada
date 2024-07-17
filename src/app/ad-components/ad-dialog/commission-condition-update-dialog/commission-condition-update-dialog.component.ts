import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../ad-services/auth.service";
import {HrService} from "../../../ad-services/helper/hr.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-commission-condition-update-dialog',
  templateUrl: './commission-condition-update-dialog.component.html',
  styles: [
  ]
})
export class CommissionConditionUpdateDialogComponent implements OnInit {
@Output() updateCondition = new EventEmitter<void>()
  updateConditionForm: FormGroup = new FormGroup({
    conditionId: new FormControl('', Validators.required),
    limitAmount: new FormControl('', Validators.required),
    rate: new FormControl('',Validators.required),
    isMainRate: new FormControl('',Validators.required),
    isActive: new FormControl('',Validators.required),
    type: new FormControl('',Validators.required),
  })
  constructor(
    private _auth:AuthService,
    private _hr:HrService,
    @Inject(MAT_DIALOG_DATA) public data: {
      conditionId: number,
      limitAmount: number,
      rate: number,
      isMainRate: boolean,
      isActive: boolean,
      type: string
    }
  ) {
  }

  ngOnInit(): void {
  this.updateConditionForm.patchValue({
    conditionId:this.data.conditionId,
    limitAmount:this.data.limitAmount / 100,
    rate:this.data.rate / 100,
    isMainRate:this.data.isMainRate,
    isActive:this.data.isActive,
    type:this.data.type
  })
  }
  formSubmit(){
  if (this.updateConditionForm.valid){
    this.updateConditionForm.patchValue({
      rate:this.updateConditionForm.value.rate * 100,
      limitAmount:this.updateConditionForm.value.limitAmount * 100
    })
    this._auth.updateConditionCommission(this.updateConditionForm.value).then((res:any)=>{
      if (res){
        this._hr.showMessage(true,'Успешно')
        this.updateCondition.emit()
      }
      else {
        this.updateConditionForm.patchValue({
          rate:this.data.rate / 100,
          limitAmount:this.data.limitAmount / 100,
          isActive:this.data.isActive,
          type:this.data.type,
          isMainRate:this.data.isMainRate,
        })
      }
    })
      .catch((error)=>{
        this.updateConditionForm.patchValue({
          rate:this.data.rate / 100,
          limitAmount:this.data.limitAmount / 100,
          isActive:this.data.isActive,
          type:this.data.type,
          isMainRate:this.data.isMainRate,
        })
      })
  }
  }

}
