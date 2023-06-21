import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { TablesDataService } from '../data.service';
import { TablesKitchenSinkEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-table-kitchen-sink',
  templateUrl: './kitchen-sink.component.html',
  styleUrls: ['./kitchen-sink.component.scss'],
  providers: [TablesDataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablesKitchenSinkComponent implements OnInit {
  columns: MtxGridColumn[] = [
    {
      header: 'position',
      field: 'position',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'name',
      field: 'name',
      sortable: true,
      disabled: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'weight',
      field: 'weight',
      minWidth: 100,
    },
    {
      header: 'symbol',
      field: 'symbol',
      minWidth: 100,
    },
    {
      header: 'gender',
      field: 'gender',
      minWidth: 100,
    },
    {
      header: 'mobile',
      field: 'mobile',
      hide: true,
      minWidth: 120,
    },
    {
      header: 'tele',
      field: 'tele',
      minWidth: 120,
      width: '120px',
    },
    {
      header: 'birthday',
      field: 'birthday',
      minWidth: 180,
    },
    {
      header: 'city',
      field: 'city',
      minWidth: 120,
    },
    {
      header: 'address',
      field: 'address',
      minWidth: 180,
      width: '200px',
    },
    {
      header: 'company',
      field: 'company',
      minWidth: 120,
    },
    {
      header: 'website',
      field: 'website',
      minWidth: 180,
    },
    {
      header: 'email',
      field: 'email',
      minWidth: 180,
    },
    {
      header: 'operation',
      field: 'operation',
      minWidth: 160,
      width: '160px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: 'edit',
          click: record => this.edit(record),
        },
        {
          color: 'warn',
          icon: 'delete',
          text: 'delete',
          tooltip: 'delete',
          pop: {
            title: 'confirm_delete',
            closeText: 'close',
            okText: 'ok',
          },
          click: record => this.delete(record),
        },
      ],
    },
  ];
  list: any[] = [];
  isLoading = true;

  multiSelectable = true;
  rowSelectable = true;
  hideRowSelectionCheckbox = false;
  showToolbar = true;
  columnHideable = true;
  columnSortable = true;
  columnPinnable = true;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;

  constructor(
    private dataSrv: TablesDataService,
    private dialog: MtxDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.list = this.dataSrv.getData();
    this.isLoading = false;
  }

  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(TablesKitchenSinkEditComponent, {
      width: '600px',
      data: { record: value },
    });

    dialogRef.afterClosed().subscribe(() => console.log('The dialog was closed'));
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
    this.columns[0].showExpand = this.expandable;
  }

  updateCell() {
    this.list = this.list.map(item => {
      item.weight = Math.round(Math.random() * 1000) / 100;
      return item;
    });
  }

  updateList() {
    this.list = this.list.splice(-1).concat(this.list);
  }
}
