import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],

})
export class MenuItemComponent implements OnInit {
  @Input() menu: any;
  element: any = null;
  contentElement: any = null;
  firstElementChild: any;
  constructor(private core: CoreService, private readonly renderer: Renderer2) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.element = document.getElementById(`menu_${this.menu.id}`);
      this.contentElement = document.getElementById(`menu_content_${this.menu.id}`);
    }, 0);
  }

  onMinus(item: any) {
    if (item.value > 0) {
      item.value--;
    }
    this.core.services.ordering.update(item)
  }

  onAdd(item: any) {
    item.value++;
    this.core.services.ordering.update(item)
  }


  onIntersection(event: any) {
    const { target, visible } = event;
    if (visible) {
      this.element.appendChild(this.contentElement);
    } else {
      this.element.removeChild(this.element.firstElementChild)
    }
  }
}
