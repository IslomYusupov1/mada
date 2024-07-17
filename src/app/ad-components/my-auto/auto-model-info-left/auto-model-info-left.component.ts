import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MyAutoService} from "../../../ad-services/my-auto.service";
import {HrService} from "../../../ad-services/helper/hr.service";
import {
  CarColorSimilarAddDialogComponent
} from "../car-color-similar-add-dialog/car-color-similar-add-dialog.component";
import {MatDialog} from "@angular/material/dialog";

export interface PeriodicElement {
  name: string;
  position: number;
}

@Component({
  selector: 'app-auto-model-info-left',
  templateUrl: './auto-model-info-left.component.html',
  styleUrls: ['./auto-model-info-left.component.scss']
})
export class AutoModelInfoLeftComponent implements OnInit, OnChanges {
  @Input() editedSimilarName: boolean = false
  @Input() modelId!: number
  @Output() onAddSimilarName: EventEmitter<boolean> = new EventEmitter<boolean>()
  displayedColumns: string[] = ['select', 'position', 'name'];
  dataSource!: MatTableDataSource<PeriodicElement>
  selection = new SelectionModel<PeriodicElement>(true, []);
  modelName: string = ''

  loading: boolean = false
  currentPage: number = 1
  totalPages: number = 0
  reqData: any = {
    modelId: null,
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
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.loading = true
    this.myAutoService.modelSimilarNameList(this.reqData).then((res: any) => {
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
    if (!this.modelName && !this.reqData.filter['name']) {
      return
    }

    this.currentPage = 1
    this.reqData.paging['page'] = 0
    if (this.modelName) {
      this.reqData.filter['name'] = this.modelName
    } else {
      delete this.reqData.filter['name']
    }

    this.getData()
  }

  clearInput(): void {
    this.modelName = ''
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
    this.myAutoService.addModelSimilarName({
      modelId: this.modelId,
      similarNameList: selectedIds
    }).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, res.message ? res.message : 'Успешно добавлен!')
        this.selection.clear()
        this.currentPage = 0
        this.reqData.paging['page'] = 0
        this.getData()
        this.onAddSimilarName.emit(true)
      }
    })
  }

  openAddSimilarDialog(): void {
    const dialogRef = this.dialog.open(CarColorSimilarAddDialogComponent, {
      width: '500px',
      maxWidth: '500px',
      data: {
        id: this.modelId,
        type: 'model'
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
