import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {PointService} from "../../../ad-services/point.service";
import {HrService} from "../../../ad-services/helper/hr.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-virtual-condition-cards-add',
  templateUrl: './virtual-condition-cards-add.component.html',
  styles: []
})
export class VirtualConditionCardsAddComponent implements OnInit {
  cardType = new FormControl('', Validators.required)
  createVirtualCardForm: FormGroup = new FormGroup({
    valueList: new FormArray([this.getValueFields()])
  })

  constructor(
    private _point: PointService,
    private _hr: HrService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
  }

  getValueFields() {
    return new FormGroup({
      nameUz: new FormControl('', Validators.required),
      nameKaa: new FormControl('', Validators.required),
      nameRu: new FormControl('', Validators.required),
      nameEng: new FormControl('', Validators.required),
      descriptionUz: new FormControl('', Validators.required),
      descriptionKaa: new FormControl('', Validators.required),
      descriptionRu: new FormControl('', Validators.required),
      descriptionEng: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      order: new FormControl('', Validators.required),
      cardType: new FormControl('')
    })
  }

  getValueList() {
    return this.createVirtualCardForm.get('valueList') as FormArray
  }

  addField() {
    this.getValueList().push(this.getValueFields())
  }

  removeValueFromList(i: number) {
    this.getValueList().removeAt(i)
  }

  formSubmit() {
    if (this.createVirtualCardForm.valid && this.cardType.valid) {
      for (let i of this.getValueList().controls) {
        let data = i.get('cardType')
        data?.setValue(this.cardType.value)
      }
      this._point.VirtualConditionCardAdd(this.getValueList().value).then((res: any) => {
        if (res) {
          this._hr.showMessage(true, 'Успешно')
          this._router.navigate(['/products/virtual-cards']).then(() => {
          })
        }
      })
    }
  }

}
