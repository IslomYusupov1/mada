import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-yandex-map-dialog',
  templateUrl: './yandex-map-dialog.component.html',
  styles: []
})
export class YandexMapDialogComponent implements OnInit {
  @Output() map = new EventEmitter<void>()

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { latitude: number, longitude: number },
  ) {
  }

  ngOnInit(): void {
  }

}
