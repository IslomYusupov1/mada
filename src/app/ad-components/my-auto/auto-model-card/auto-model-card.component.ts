import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IModel} from "../../../ad-views/my-auto/models/models.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auto-model-card',
  templateUrl: './auto-model-card.component.html',
  styleUrls: ['./auto-model-card.component.scss']
})
export class AutoModelCardComponent implements OnInit {
  @Input() model!: IModel
  @Output() onEdit: EventEmitter<IModel> = new EventEmitter<IModel>()
  modelLogo: string = ''
  image: string = ''

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.modelLogo = `${this.model.modelLogo.path}/${this.model.modelLogo.name}.${this.model.modelLogo.ext}`
    this.image = `${this.model.image.path}/${this.model.image.name}.${this.model.image.ext}`
  }

  openEditDialog(): void {
    this.onEdit.emit(this.model)
  }

  routeToLink(): void {
    this.router.navigate(['my-auto/model', this.model.id]).then(() => {
    })
  }
}
