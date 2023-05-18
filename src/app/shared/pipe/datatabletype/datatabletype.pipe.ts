import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injector,
  Pipe,
  PipeTransform,
  Renderer2,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { ImageComponent } from 'src/app/components/image/image.component';

@Pipe({
  name: 'datatabletype',
})
export class DatatabletypePipe implements PipeTransform {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private sanitizer: DomSanitizer,
    private appRef: ApplicationRef
  ) { }

  transform(data: any, prop: any): unknown {
    return this.classifyType(data.item, data.config, prop);
  }

  classifyType(item: any, config: any, prop: any): any {
    const data = item[prop.prop];
    const id = prop.prop + item[config.idProp] + config.uid;
    if (prop.render) {
      return this.sanitizer.bypassSecurityTrustHtml(prop.render(item));
    }
    switch (prop.type) {
      case 'youtube':
        const url = this.getYoutubeEmbed(item.Url);
        return this.sanitizer.bypassSecurityTrustHtml(`<iframe class="w-100"
        src="${url}"
      ></iframe >`);
      case Image:
        setTimeout(() => {
          if (config.idProp)
            this.appendComponentToBody(ImageComponent, {
              id: id,
              data: data,
              additional: {
                class: 'm-auto',
              },
            });
        }, 100);

        return '';
      case 'ProfileImage':
        setTimeout(() => {
          if (config.idProp)
            this.appendComponentToBody(ImageComponent, {
              id: id,
              data: data,
              additional: {
                class: 'rounded-circle m-auto border',
                width: 50,
                height: 50,
              },
            });
        }, 0);
        return '';
  
      case Date:
        return data ? moment(data).format('DD/MM/YYYY HH:mm') : '';
      case 'DateOnly':
        return data ? moment(data).format('DD/MM/YYYY') : '';
      case 'Status':
        return data
          ? `<span *ngIf="item" class="active badge badge-light-success ">Enabled</span>`
          : `<span *ngIf="!item" class="inactive badge badge-light-danger ">Disabled</span>`;
      case 'Action':
        return `<div class="btn-group" dropdown placement="top">
        <button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">
          Action <span class="caret"></span>
        </button>
        <ul *dropdownMenu class="dropdown-menu p-3" role="menu">
          <li role="menuitem" class="menuitem">
            <a class="dropdown-item" routerLink="/packageMng/{{value}}">View</a>
          </li>
          <li role="menuitem" class="menuitem">
            <a class="dropdown-item" (click)="delete(value)">Delete</a>
          </li>
        </ul>
      </div>`;
      case Number:
        return `<span class='float-right float-end'>${this.numberWithCommas(data.toFixed(2))}</span>`;
      default:
        return data;
    }


  }

  numberWithCommas(num: any) {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  appendComponentToBody(component: any, data: any) {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    const prop: any = componentRef.instance;

    if (data.additional) {
      const keys = Object.keys(data.additional);

      keys.forEach((k) => {
        prop[k] = data.additional[k];
      });
    }

    prop.id = data.id;
    prop.src = data.data;

    prop.onClose = () => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    };

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    (<HTMLElement>document.getElementById(data.id)).appendChild(domElem);
  }

  getYoutubeEmbed(url: string) {
    let newUrl = url;
    if (url.includes('watch?v=')) {
      newUrl = url.replace('watch?v=', 'embed/');
    } else if (url.includes('youtu.be')) {
      newUrl = url.replace('youtu.be', 'www.youtube.com/embed');
    }
    return newUrl;
  }

  // injector(injector: any) {
  //   throw new Error('Method not implemented.');
  // }
}

@Pipe({
  name: 'datatabletypePosition',
})
export class DatatabletypePosition implements PipeTransform {
  transform(header: any, column: any): unknown {
    return header.porp == Object.keys(column)
      ? false
      : column[Object.keys(column).toString()];
  }
}
