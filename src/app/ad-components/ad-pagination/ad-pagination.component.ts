import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-ad-pagination',
  templateUrl: './ad-pagination.component.html',
  styles: [
  ]
})
export class AdPaginationComponent implements OnInit {

  @Input() page = 1;
  @Input() totalPages: number = 1;
  @Output() pageClick = new EventEmitter();
  @Output() pagePrev = new EventEmitter();
  @Output() pageNext = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toPage(page: number = 1) {
    this.pageClick.emit(page)
  }

  prev() {
    this.pagePrev.emit()
  }

  next() {
    this.pageNext.emit()
  }

  get totalPagesList() {
    let totalPages = this.totalPages + 1
    let arr = [...Array(totalPages).keys()]
    arr.splice(0, 1)
    return arr
  }
}
