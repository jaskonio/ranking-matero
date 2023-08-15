import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { MtxGridColumn } from '@ng-matero/extensions/grid';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit, OnDestroy {

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
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: 'edit',
          click: record => console.log(record),
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
          click: record => console.log(record),
        },
      ],
    },
  ];

  ranking =  [
    {
        "id": "",
        "first_name": "ALBERTO LOPEZ VAZQUEZ",
        "last_name": "",
        "nationality": "",
        "gender": "",
        "photo": "",
        "photo_url": "",
        "position": 1,
        "points": 75,
        "pos_last_race": 1,
        "top_five": 2,
        "participations": 2,
        "best_position": "1(x2)",
        "last_position_race": "123",
        "best_avegare_peace": "3:24 / km",
        "best_position_real": 0
    },
    {
        "id": "",
        "first_name": "JUAN JOSE MARCO PERIS",
        "last_name": "",
        "nationality": "",
        "gender": "",
        "photo": "",
        "photo_url": "",
        "position": 2,
        "points": 54,
        "pos_last_race": 2,
        "top_five": 2,
        "participations": 2,
        "best_position": "2(x2)",
        "last_position_race": "159",
        "best_avegare_peace": "3:28 / km",
        "best_position_real": 0
    },
    {
        "id": "",
        "first_name": "ENRIC SANZ HERNANDEZ",
        "last_name": "",
        "nationality": "",
        "gender": "",
        "photo": "",
        "photo_url": "",
        "position": 3,
        "points": 45,
        "pos_last_race": 3,
        "top_five": 2,
        "participations": 2,
        "best_position": "3(x2)",
        "last_position_race": "255",
        "best_avegare_peace": "3:40 / km",
        "best_position_real": 0
    },
    {
        "id": "",
        "first_name": "OSCAR BUSTAMANTE RUANO",
        "last_name": "",
        "nationality": "",
        "gender": "",
        "photo": "",
        "photo_url": "",
        "position": 4,
        "points": 36,
        "pos_last_race": 4,
        "top_five": 2,
        "participations": 2,
        "best_position": "4(x2)",
        "last_position_race": "277",
        "best_avegare_peace": "3:41 / km",
        "best_position_real": 0
    },
    {
        "id": "",
        "first_name": "SERGIO RODRIGUEZ CARRILLO",
        "last_name": "",
        "nationality": "",
        "gender": "",
        "photo": "",
        "photo_url": "",
        "position": 5,
        "points": 30,
        "pos_last_race": 5,
        "top_five": 2,
        "participations": 2,
        "best_position": "5(x2)",
        "last_position_race": "291",
        "best_avegare_peace": "3:42 / km",
        "best_position_real": 0
    },
    {
        "id": "",
        "first_name": "JORGE ANDREU HERNANDEZ",
        "last_name": "",
        "nationality": "",
        "gender": "",
        "photo": "",
        "photo_url": "",
        "position": 6,
        "points": 24,
        "pos_last_race": 6,
        "top_five": 0,
        "participations": 2,
        "best_position": "6(x2)",
        "last_position_race": "356",
        "best_avegare_peace": "3:46 / km",
        "best_position_real": 0
    },
    {
        "id": "",
        "first_name": "JOSE LUIS ESCOBAR ALONSO",
        "last_name": "",
        "nationality": "",
        "gender": "",
        "photo": "",
        "photo_url": "",
        "position": 7,
        "points": 18,
        "pos_last_race": 7,
        "top_five": 0,
        "participations": 2,
        "best_position": "7(x2)",
        "last_position_race": "542",
        "best_avegare_peace": "3:59 / km",
        "best_position_real": 0
    },
    {
        "id": "",
        "first_name": "FRANCISCO JOSE FERRANDIS SANCHEZ",
        "last_name": "",
        "nationality": "",
        "gender": "",
        "photo": "",
        "photo_url": "",
        "position": 8,
        "points": 12,
        "pos_last_race": 8,
        "top_five": 0,
        "participations": 2,
        "best_position": "8(x2)",
        "last_position_race": "593",
        "best_avegare_peace": "4:1 / km",
        "best_position_real": 0
    },
    {
        "id": "",
        "first_name": "XAVI LLUCH CRESPO",
        "last_name": "",
        "nationality": "",
        "gender": "",
        "photo": "",
        "photo_url": "",
        "position": 9,
        "points": 6,
        "pos_last_race": 9,
        "top_five": 0,
        "participations": 2,
        "best_position": "9(x2)",
        "last_position_race": "716",
        "best_avegare_peace": "4:9 / km",
        "best_position_real": 0
    }
  ]

  rowStriped = true;
  showPaginator = true;

  
  constructor(
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
