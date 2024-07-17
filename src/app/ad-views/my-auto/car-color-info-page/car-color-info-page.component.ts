import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {MyAutoService} from "../../../ad-services/my-auto.service";

@Component({
  selector: 'app-car-color-info-page',
  templateUrl: './car-color-info-page.component.html',
  styleUrls: ['./car-color-info-page.component.scss']
})
export class CarColorInfoPageComponent implements OnInit, OnDestroy {
  loading: boolean = false
  subscription$!: Subscription
  colorId!: number
  colorCode: string = ''
  onEditSimilarName: boolean = false
  onAddSimilarName: boolean = false

  colorForm: FormGroup = this.fb.group({
    colorName: 'Загрузка...',
    colorCode: '000000'
  })

  constructor(
    private myAutoService: MyAutoService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription$ = this.route.params.subscribe((param) => {
      if (param && param.id) {
        this.colorId = Number(param.id)
        this.getData()
      }
    })
  }

  getData(): void {
    this.loading = true
    this.myAutoService.getColorOne(this.colorId).then((res: any) => {
      if (res) {
        this.colorForm.patchValue({
          colorName: res.colorName,
          colorCode: res.colorCode.substr(1,6).toUpperCase()
        })
        this.colorCode = res.colorCode
        console.log(res)
        this.loading = false
      } else {
        this.loading = false
      }
    })
  }

  addSimilarName(event: boolean): void {
    this.onAddSimilarName = event
    setTimeout(() => {
      this.onAddSimilarName = false
    },500)
  }

  editSimilarName(event: boolean): void {
    this.onEditSimilarName = event
    setTimeout(() => {
      this.onEditSimilarName = false
    },500)
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }

}
