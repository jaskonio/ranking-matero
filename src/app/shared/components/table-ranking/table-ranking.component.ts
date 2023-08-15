import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn } from '@ng-matero/extensions/grid';

@Component({
  selector: 'app-table-ranking',
  templateUrl: './table-ranking.component.html',
  styleUrls: ['./table-ranking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablesRankingComponent implements OnInit {
  @Input() columns:MtxGridColumn[] = []
  @Input() items:any[] = []

  @Input() isLoading = false
  @Input() multiSelectable = false
  @Input() rowSelectable = false
  @Input() hideRowSelectionCheckbox = false
  @Input() showToolbar = false
  @Input() columnHideable = false
  @Input() columnSortable = false
  @Input() columnPinnable = false
  @Input() rowHover = false
  @Input() rowStriped = true
  @Input() showPaginator = true
  @Input() expandable = false
  @Input() columnResizable = false
  @Input() pageSizeOptions = [5,10,50,100]
  @Input() pageIndex = 0
  @Input() pageSize = 0

  constructor(    
    private dialog: MtxDialog
  ) {}

  ngOnInit() {
  }

  edit(value: any) {
  }

  delete(value: any) {
    this.dialog.alert(`You have deleted ${value.position}!`);
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  enableRowExpandable() {
    if (this.columns != undefined) {
      if (this.columns[0] !== undefined && this.columns.length != 0) {
        this.columns[0].showExpand = this.expandable;
      }
    }
  }
}
