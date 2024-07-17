import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {PeriodicElement} from "../auto-model-info-left/auto-model-info-left.component";
import {SelectionModel} from "@angular/cdk/collections";
import {MyAutoService} from "../../../ad-services/my-auto.service";
import {HrService} from "../../../ad-services/helper/hr.service";
import {MatDialog} from "@angular/material/dialog";
import {
  CarColorSimilarAddDialogComponent
} from "../car-color-similar-add-dialog/car-color-similar-add-dialog.component";

@Component({
  selector: 'app-car-color-info-left',
  templateUrl: './car-color-info-left.component.html',
  styles: [
  ]
})
export class CarColorInfoLeftComponent implements OnInit, OnChanges {
  @Input() editedSimilarName: boolean = false
  @Input() colorId!: number
  @Output() onAddSimilarName: EventEmitter<boolean> = new EventEmitter<boolean>()

  displayedColumns: string[] = ['select', 'position', 'name'];
  dataSource!: MatTableDataSource<PeriodicElement>
  selection = new SelectionModel<PeriodicElement>(true, []);
  colorName: string = ''

  loading: boolean = false
  currentPage: number = 1
  totalPages: number = 0
  reqData: any = {
    colorId: null,
    filter: {},
    paging: {
      page: 0,
      size: 20
    }
  }

  constructor(
    private myAutoService: MyAutoService,
    private hrService: HrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.loading = true
    this.myAutoService.colorSimilarNameList(this.reqData).then((res: any) => {
      if (res) {
        const resData = res.content
        resData.forEach((item: any, ind: number) => {
          item.position = (this.reqData.paging.page * this.reqData.paging.size) + (ind + 1)
        })
        this.dataSource = new MatTableDataSource<PeriodicElement>(resData)
        this.totalPages = res.paging.totalPages
        this.loading = false
      }
    })
  }

  searchByName(): void {
    if (!this.colorName && !this.reqData.filter['name']) {
      return
    }

    this.currentPage = 1
    this.reqData.paging['page'] = 0
    if (this.colorName) {
      this.reqData.filter['name'] = this.colorName
    } else {
      delete this.reqData.filter['name']
    }

    this.getData()
  }

  clearInput(): void {
    this.colorName = ''
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  editModel() {
    const selectedIds: Array<string> = this.selection.selected.map((item) => {
      return item.name
    })
    console.log(this.selection.selected)
    console.log('=================================')
    this.myAutoService.addColorSimilarName({
      colorId: this.colorId,
      similarNameList: selectedIds
    }).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, res.message ? res.message : 'Успешно добавлен!')
        this.selection.clear()
        this.currentPage = 0
        this.reqData.paging['page'] = 0
        this.getData()
        this.onAddSimilarName.emit(true)
        console.log(this.selection.selected)
      }
    })
  }

  openNewColorAddDialog(): void {
    const dialogRef = this.dialog.open(CarColorSimilarAddDialogComponent, {
      width: '500px',
      maxWidth: '500px',
      data: {
        id: this.colorId,
        type: 'color'
      }
    })
    dialogRef.componentInstance.onAdd.subscribe(() => {
      dialogRef.close()
      this.selection.clear()
      this.reqData.paging['page'] = 0
      this.currentPage = 1
      this.getData()
      this.onAddSimilarName.emit(true)
    })
  }

  pageClicked(val: number) {
    if (this.currentPage !== val) {
      this.reqData.paging.page = val - 1
      this.currentPage = val
      this.getData()
    }
  }

  pagePrevTo() {
    this.reqData.paging.page--
    this.currentPage--
    this.getData()
  }

  pageNextTo() {
    this.reqData.paging.page++
    this.currentPage++
    this.getData()
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { editedSimilarName } = changes
    if (editedSimilarName && editedSimilarName.currentValue) {
      this.reqData.paging['page'] = 0
      this.currentPage = 1
      this.getData()
    }
  }
}
