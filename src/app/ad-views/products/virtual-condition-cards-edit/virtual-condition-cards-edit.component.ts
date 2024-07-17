import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PointService} from "../../../ad-services/point.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HrService} from "../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-virtual-condition-cards-edit',
  templateUrl: './virtual-condition-cards-edit.component.html',
  styles: []
})
export class VirtualConditionCardsEditComponent implements OnInit {
  queryId: string = ''
  editForm: FormGroup = new FormGroup({
    uuid: new FormControl('', Validators.required),
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
    cardType: new FormControl('', Validators.required)
  })

  constructor(
    private route: ActivatedRoute,
    private _point: PointService,
    private _hr:HrService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((q) => {
      this.queryId = q.id
      this.getList()
    })
  }

  getList() {
    this._point.VirtualConditionCardOne(this.queryId).then((res: {
      description: string
      name: string
      nameEng: string
      nameKaa: string
      nameRu: string
      nameUz: string
      descriptionEng: string
      descriptionKaa: string
      descriptionRu: string
      descriptionUz: string
      order: number
      uuid: string
      cardType:string
    }) => {
      if (res) {
      this.editForm.patchValue({
        description:res.description,
        name:res.name,
        nameEng:res.nameEng,
        nameKaa:res.nameKaa,
        nameUz:res.nameUz,
        nameRu:res.nameRu,
        descriptionEng:res.descriptionEng,
        descriptionKaa:res.descriptionKaa,
        descriptionRu:res.descriptionRu,
        descriptionUz:res.descriptionUz,
        order:res.order,
        uuid:res.uuid,
        cardType:res.cardType
      })
      }
    })
  }
  formSubmit(){
    if (this.editForm.valid){
      this._point.VirtualConditionCardEdit(this.editForm.value).then((res)=>{
        if (res){
          this._hr.showMessage(true,'Успешно')
          this.router.navigate(['/products/virtual-cards']).then((res)=>{})
        }
      })
    }
  }
}
