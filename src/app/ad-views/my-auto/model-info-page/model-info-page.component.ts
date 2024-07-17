import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MyAutoService} from "../../../ad-services/my-auto.service";
import {IModel, IModelColor} from "../models/models.component";
import {MatDialog} from "@angular/material/dialog";
import {
  AutoImageCreateDialogComponent
} from "../../../ad-components/my-auto/auto-image-create-dialog/auto-image-create-dialog.component";
import {
  AutoImageEditDialogComponent
} from "../../../ad-components/my-auto/auto-image-edit-dialog/auto-image-edit-dialog.component";

@Component({
  selector: 'app-model-info-page',
  templateUrl: './model-info-page.component.html',
  styleUrls: ['./model-info-page.component.scss']
})
export class ModelInfoPageComponent implements OnInit {
  modelId!: number
  cellsToShow: number = 7
  colorList: Array<any> = []
  loading: boolean = false
  onEditSimilarName: boolean = false
  onAddSimilarName: boolean = false
  carModel!: IModel
  brandLogo: string = ''

  constructor(
    private route: ActivatedRoute,
    private myAutoService: MyAutoService,
    private dialog: MatDialog
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.carouselShows()
  }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (param && param.id) {
        this.modelId = Number(param.id)
        this.getData()
        this.getCarColors()
      }
    })

    this.carouselShows()
  }

  getData(): void {
    this.loading = true
    this.myAutoService.getModelOne(this.modelId).then((res: any) => {
      if (res) {
        this.carModel = res
        this.brandLogo = `${this.carModel.modelLogo.path}/${this.carModel.modelLogo.name}.${this.carModel.modelLogo.ext}`
        this.loading = false
      } else {
        this.loading = false
      }
    })
  }

  getCarColors(): void {
    this.myAutoService.getCarColorList().then((res: any) => {
      if (res) {
        this.colorList = res.colorList
      }
    })
  }

  createImageDialog(): void {
    let dialogRef = this.dialog.open(AutoImageCreateDialogComponent, {
      width: '680px',
      maxWidth: '680px',
      data: {
        colorsList: this.colorList,
        modelId: this.modelId
      }
    })
    dialogRef.componentInstance.onCreateModel.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  openEditImage(event: IModelColor): void {
    let dialogRef = this.dialog.open(AutoImageEditDialogComponent, {
      width: '680px',
      maxWidth: '680px',
      data: {
        info: event,
        colorsList: this.colorList,
        modelId: this.modelId
      }
    })
    dialogRef.componentInstance.onCreateModel.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  editSimilarName(event: boolean): void {
    this.onEditSimilarName = event
    setTimeout(() => {
      this.onEditSimilarName = false
    },500)
  }

  addSimilarName(event: boolean): void {
    this.onAddSimilarName = event
    setTimeout(() => {
      this.onAddSimilarName = false
    },500)
  }

  carouselShows(): void {
    if (window.innerWidth < 1400) {
      this.cellsToShow = 6
    } else {
      this.cellsToShow = 7
    }
    if (window.innerWidth < 1200) {
      this.cellsToShow = 4
    }
    if (window.innerWidth < 800) {
      this.cellsToShow = 3
    }
    if (window.innerWidth < 650) {
      this.cellsToShow = 2
    }
    if (window.innerWidth < 450) {
      this.cellsToShow = 1
    }
  }
}
