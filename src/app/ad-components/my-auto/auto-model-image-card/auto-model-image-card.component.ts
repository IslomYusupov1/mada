import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IModelColor} from "../../../ad-views/my-auto/models/models.component";

@Component({
  selector: 'app-auto-model-image-card',
  templateUrl: './auto-model-image-card.component.html',
  styleUrls: ['./auto-model-image-card.component.scss']
})
export class AutoModelImageCardComponent implements OnInit {
  @Input() colorInfo!: IModelColor
  @Output() onEdit: EventEmitter<IModelColor> = new EventEmitter<IModelColor>()
  image: string = ''

  constructor() { }

  ngOnInit(): void {
    this.image = `${this.colorInfo.image.path}/${this.colorInfo.image.name}.${this.colorInfo.image.ext}`
  }

  editImage(): void {
    this.onEdit.emit(this.colorInfo)
  }
}
