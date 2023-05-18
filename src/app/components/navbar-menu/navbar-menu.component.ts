import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
})
export class NavbarMenuComponent implements OnInit {
  @Input() menues: NavbarMenu[] = [];
  @Input() class: string = '';
  @Input() style?: string = '';
  @Input() isShow: boolean = false;
  @Input() search: string = '';
  @Output() onClickMenu = new EventEmitter<NavbarMenu>();
  @Input() lvl = 0;
  constructor(private coreService: CoreService) { }

  ngOnInit(): void { }

  showSubmenu(menu: NavbarMenu) {
    this.onClickMenu.emit(menu);
  }
  click(item: any) {
    this.coreService.services.storage.setMenu(item?.id)
  }
}

export interface NavbarMenu {
  id: string;
  name: string;
  icon?: string | undefined;
  imageUrl?: string | undefined;
  showSubmenu?: boolean | undefined;
  hide?: boolean | undefined;
  active?: boolean | undefined;
  href?: string | undefined;
  style?: string | undefined;
  submenu?: NavbarMenu[] | undefined;
}
