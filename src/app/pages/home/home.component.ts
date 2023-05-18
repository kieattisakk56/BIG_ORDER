import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreService } from 'src/app/core/core.service';
import { orderingAction } from 'src/app/core/states/ordering/ordering.actions';
import { orderingFeature, orderingFeatureKey } from 'src/app/core/states/ordering/ordering.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  menus: any = [];
  temp = structuredClone(this.menus)
  constructor(private store: Store, private core: CoreService) { }

  async ngOnInit(): Promise<void> {
    await this.fetchData();
  }

  async fetchData() {
    const body = {
      id: '31c81bca-1d58-466f-8ead-02622bdb56aa'
    }
    this.menus = await this.core.https.store.get(body);
  }
  onSend() {

    this.store.dispatch(orderingAction.clearstate());
    this.core.services.toast.success('ส่งรายการเรียบร้อย เจ้าหน้าที่กำลังเตรียม');
    this.menus = [
      {
        category_name: 'Promotion',
        store_type: 'shabu',
        menus: [
          {
            id: 1,
            menu_name: 'ริบอาย (Ribeye)',
            menu_detail: 'วะกิว (Wagyu) เป็นชื่อที่ใช้เรียกเนื้อวัวที่ผลิตในญี่ปุ่นและผ่านมาตรฐานด้านคุณภาพอันเข้มงวด ซึ่งมาจากวัว 4 สายพันธุ์หลัก',
            menu_image_url: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQffgPTr2LSL2rYdEWoJgWdEQQYUHLCmKDeEEqHWA9zPQW7EAksMX0rMCLUGbuqu825Up8McrudI6b3OQw',
            value: 0,
            menu_price: 199
          },
          {
            id: 2,
            menu_name: 'ริบอาย (Ribeye) 2',
            menu_detail: 'วะกิว (Wagyu) เป็นชื่อที่ใช้เรียกเนื้อวัวที่ผลิตในญี่ปุ่นและผ่านมาตรฐานด้านคุณภาพอันเข้มงวด ซึ่งมาจากวัว 4 สายพันธุ์หลัก',
            menu_image_url: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQffgPTr2LSL2rYdEWoJgWdEQQYUHLCmKDeEEqHWA9zPQW7EAksMX0rMCLUGbuqu825Up8McrudI6b3OQw',
            value: 0,
            menu_price: 199
          },
          {
            id: 3,
            menu_name: 'ริบอาย (Ribeye) 3',
            menu_detail: 'วะกิว (Wagyu) เป็นชื่อที่ใช้เรียกเนื้อวัวที่ผลิตในญี่ปุ่นและผ่านมาตรฐานด้านคุณภาพอันเข้มงวด ซึ่งมาจากวัว 4 สายพันธุ์หลัก',
            menu_image_url: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQffgPTr2LSL2rYdEWoJgWdEQQYUHLCmKDeEEqHWA9zPQW7EAksMX0rMCLUGbuqu825Up8McrudI6b3OQw',
            value: 0,
            menu_price: 199
          },
          {
            id: 4,
            menu_name: 'ริบอาย (Ribeye) 3',
            menu_detail: 'วะกิว (Wagyu) เป็นชื่อที่ใช้เรียกเนื้อวัวที่ผลิตในญี่ปุ่นและผ่านมาตรฐานด้านคุณภาพอันเข้มงวด ซึ่งมาจากวัว 4 สายพันธุ์หลัก',
            menu_image_url: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQffgPTr2LSL2rYdEWoJgWdEQQYUHLCmKDeEEqHWA9zPQW7EAksMX0rMCLUGbuqu825Up8McrudI6b3OQw',
            value: 0,
            menu_price: 199
          },
          {
            id: 5,
            menu_name: 'ริบอาย (Ribeye) 3',
            menu_detail: 'วะกิว (Wagyu) เป็นชื่อที่ใช้เรียกเนื้อวัวที่ผลิตในญี่ปุ่นและผ่านมาตรฐานด้านคุณภาพอันเข้มงวด ซึ่งมาจากวัว 4 สายพันธุ์หลัก',
            menu_image_url: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQffgPTr2LSL2rYdEWoJgWdEQQYUHLCmKDeEEqHWA9zPQW7EAksMX0rMCLUGbuqu825Up8McrudI6b3OQw',
            value: 0,
            menu_price: 199
          },
          {
            id: 6,
            menu_name: 'ริบอาย (Ribeye) 3',
            menu_detail: 'วะกิว (Wagyu) เป็นชื่อที่ใช้เรียกเนื้อวัวที่ผลิตในญี่ปุ่นและผ่านมาตรฐานด้านคุณภาพอันเข้มงวด ซึ่งมาจากวัว 4 สายพันธุ์หลัก',
            menu_image_url: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQffgPTr2LSL2rYdEWoJgWdEQQYUHLCmKDeEEqHWA9zPQW7EAksMX0rMCLUGbuqu825Up8McrudI6b3OQw',
            value: 0,
            menu_price: 199
          },
          {
            id: 7,
            menu_name: 'ริบอาย (Ribeye) 3',
            menu_detail: 'วะกิว (Wagyu) เป็นชื่อที่ใช้เรียกเนื้อวัวที่ผลิตในญี่ปุ่นและผ่านมาตรฐานด้านคุณภาพอันเข้มงวด ซึ่งมาจากวัว 4 สายพันธุ์หลัก',
            menu_image_url: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQffgPTr2LSL2rYdEWoJgWdEQQYUHLCmKDeEEqHWA9zPQW7EAksMX0rMCLUGbuqu825Up8McrudI6b3OQw',
            value: 0,
            menu_price: 199
          },
          {
            id: 8,
            menu_name: 'ริบอาย (Ribeye) 3',
            menu_detail: 'วะกิว (Wagyu) เป็นชื่อที่ใช้เรียกเนื้อวัวที่ผลิตในญี่ปุ่นและผ่านมาตรฐานด้านคุณภาพอันเข้มงวด ซึ่งมาจากวัว 4 สายพันธุ์หลัก',
            menu_image_url: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQffgPTr2LSL2rYdEWoJgWdEQQYUHLCmKDeEEqHWA9zPQW7EAksMX0rMCLUGbuqu825Up8McrudI6b3OQw',
            value: 0,
            menu_price: 199
          },
        ]
      },
    ]
  }

}
