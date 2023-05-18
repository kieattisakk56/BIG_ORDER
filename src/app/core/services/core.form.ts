import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DatableConfig } from 'src/app/components/datatable/datatable.component';
import * as moment from 'moment';
import { CoreService } from '../core.service';
import { FormModalComponent } from 'src/app/components/modals/form-modal/form-modal.component';
@Injectable({
  providedIn: 'root',
})
export class CoreFormService {


  constructor(private coreService: CoreService) { }
  private number = {
    mask: /^[0-9]+$/,
  };

  private numberWithSign = {
    mask: Number,
  };

  private float = {
    mask: Number,
    scale: 10,
    radix: '.',
  };

  private phoneNumber = {
    mask: '000-000-0000',

  };
  private fax = {
    mask: '00-000-0000'
  }
  private citizen = {
    mask: '0-0000-00000-00-0'
  }
  private financial = {
    mask: Number,
    // other options are optional with defaults below
    scale: 2,  // digits after point, 0 for integers
    signed: false,  // disallow negative
    thousandsSeparator: ',',  // any single char
    radix: '.',  // fractional delimiter
    mapToRadix: ['.'],  // symbols to process as radix
  }
  private password = {
    mask: String,
  };

  private email = {
    mask: String,
  };

  private percentage = {
    mask: 'num%',
    lazy: false,
    blocks: {
      num: {
        mask: Number,
        scale: 5,
        max: 100,
        radix: '.',
        mapToRadix: [','],
      },
    },
  }
  // public getFormField = (list: any[]) => {
  //   const fieldGroup: any[] = [];
  //   list.forEach((element) => {
  //     const { template, containerClass, ...efield } = element;
  //     const field = efield;
  //     // field.className = 'col-12 col-lg-9';
  //     field.className = 'col-12';
  //     field.templateOptions.labelContainerClass = 'col-12';
  //     field.templateOptions.inputContainerClass = 'col-12';
  //     field.modelOptions = { updateOn: 'submit' };
  //     field.templateOptions.template = element.template;

  //     if (containerClass) {
  //       field.className = containerClass.container || 'col-12';
  //       field.templateOptions.labelContainerClass =
  //         containerClass.label || 'col-12';
  //       field.templateOptions.inputContainerClass =
  //         containerClass.input || 'col-12';
  //     }

  //     // fieldGroup.push(templateField);
  //     fieldGroup.push(field);
  //   });
  //   const resp = [
  //     {
  //       fieldGroupClassName: 'row',
  //       fieldGroup: fieldGroup,
  //     },
  //   ];
  //   return resp;
  // };



  public getFormField = (list: any) => {
    if (list.length > 0) {
      list.forEach((element: any) => {
        this.editFormField(element);
      });
    }
    return list;
  };

  private editFormField = (field: FormlyFieldConfig) => {
    if (field.templateOptions) {
      // field.modelOptions = { updateOn: 'submit' };
      field = {
        ...field,
        templateOptions: {
          ...field.templateOptions,
          inputContainerClass: field.templateOptions?.['inputContainerClass'] || 'col-12',
          labelContainerClass: field.templateOptions?.['labelContainerClass'] || 'col-12'
        }
      }
    }
    if (field.fieldGroup) {
      field.fieldGroup.forEach((element) => {
        this.editFormField(element);
      });
    }
  };

  public getTimeOptions = (
    range: number,
    startTime?: string,
    endTime?: string
  ) => {
    let resp = [];
    if (startTime == null) {
      startTime = '00:00';
    }
    if (endTime == null) {
      endTime = '24:00';
    }
    let startHour = parseInt(startTime.split(':')[0]);
    let startMin = parseInt(startTime.split(':')[1]);
    let endHour = parseInt(endTime.split(':')[0]);
    let endMin = parseInt(endTime.split(':')[1]);
    let counterH = startHour;
    let counterM = startMin;

    while (counterH <= endHour) {
      let hour = counterH < 10 ? `0${counterH}` : `${counterH}`;
      let minute = counterM < 10 ? `0${counterM}` : `${counterM}`;

      if (counterH == endHour) {
        if (counterM <= endMin) {
          if (endHour != 24) {
            resp.push({
              id: `${hour}:${minute}`,
              name: `${hour}:${minute}`,
            });
          }
        } else {
          counterH++;
        }
      } else {
        resp.push({
          id: `${hour}:${minute}`,
          name: `${hour}:${minute}`,
        });
      }
      counterM += range;
      if (counterM >= 60) {
        counterM -= 60;
        counterH++;
      }
    }

    return resp;
  };

  public getDatetoString = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  public getStringtoDate = (date: string) => {
    var text = date.split('/');
    return new Date(
      parseInt(text[2]),
      parseInt(text[1]) - 1,
      parseInt(text[0])
    );
  };

  public getStringtoDateTime = (datetime: string) => {
    let date = datetime.split(' ')[0]
    let time = datetime.split(' ')[1]
    var textdate = date.split('/');
    var texttime = time.split(':');
    return new Date(
      parseInt(textdate[2]),
      parseInt(textdate[1]) - 1,
      parseInt(textdate[0]),
      parseInt(texttime[0]),
      parseInt(texttime[1]),
      parseInt(texttime[2]),
    );
  };


  public imaskHelper = {
    currency: {
      imask: this.float,
      parrern: /^[0-9]?[0-9]?(\.[0-9][0-9]?)?/
    },
    citizenNumber: {
      imask: this.citizen,
    },
    number: {
      imask: this.number,
      pattern: /^[0-9]+$/,
    },
    financial: {
      imask: this.financial
    },
    numberWithSign: {
      imask: { ...this.numberWithSign, signed: true },
      pattern: /^[-,+]?[0-9]+$/,
    },
    percentage: {
      imask: this.percentage,

    },
    float: {
      imask: this.float,
      pattern: /^[0-9]+([.]?[0-9]+)?$/,
    },
    floatWithSign: {
      imask: { ...this.float, signed: true },
      pattern: /^[-]?[0-9]+[.]?[0-9]+$/,
    },
    phoneNumber: {
      imask: this.phoneNumber,
      pattern: /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
    },
    fax: {
      imask: this.fax,
      pattern: /^(\+0?1\s)?\(?\d{2}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
    },
    password: {
      imask: this.password,
      pattern:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
    email: {
      imask: this.email,
      pattern:
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    },
  };




  async auditlog() {

  }







  fetchRemark(isRead = false, hideIsActive = false) {
    return {
      wrappers: ['Accordion'],
      templateOptions: {
        title: 'อื่น ๆ',
        isOpen: true,
        class: 'my-3',
      },
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'is_active',
          type: 'CustomRadio',
          className: 'col-lg-6',
          templateOptions: {
            label: 'สถานะ',
            clearable: false,
            disabled: isRead,
            options: [
              {
                id: true,
                name: 'ใช้งาน',
              },
              {
                id: false,
                name: 'ไม่ใช้งาน',
              },
            ],
            required: true,
          },
          hideExpression: (model: any, formState: any) => {
            return hideIsActive;
          },
        },
        {
          key: 'remark',
          type: 'CustomTextarea',
          className: 'col-12',
          templateOptions: {
            disabled: isRead,
            label: 'หมายเหตุ',
            rows: 5,
            maxlength: '1000'
          },
        },
      ],
    }
  }



  jsonCompare(obj: any, action: string) {
    let header: any = ``;
    let body = ``;
    for (var item in obj) {
      var key = item
      var value = obj[item];
      if (action == 'Update') {
        console.log(obj)
        body += ` <tr>  

                    <td >   <span class="mx-3 my-1" > ${key} </span></td>
                    <td >   <span class="mx-3 my-1"> ${this.checkObject(value['ค่าเก่า'])} </span></td>
                    <td >   <span class="mx-3 my-1" >${this.checkObject(value['ค่าใหม่'])}  </span></td>
                    </tr>
                 `
      } else {
        body += ` <tr>

          <td ><span class="mx-3 my-1" >${key} </span></td>
          <td ><span class="mx-3 my-1" >${this.checkObject(value)} </span></td>

        </tr>
     `
      }


    }
    if (action == 'Update') {
      header = `<tr>
                  <th class="text-left fill-white cursor-pointer  w-m-table" >
                        <span class="mx-3 my-1">
                            ข้อมูล
                        </span>
                  </th>
                  <th class=" text-left  fill-white cursor-pointer" >
                  <span class="mx-3 my-1">
                        ค่าเก่า
                        </span>
                  </th>
                  <th class=" text-left  fill-white cursor-pointer" >
                    <span class="mx-3 my-1">
                     ค่าใหม่
                    </span>

                  </th>
                </tr>
               `
    } else {
      header = `<tr>
                  <th class="text-left fill-white cursor-pointer  w-m-table" >
                        <span class="mx-3 my-1">
                            ข้อมูล
                        </span>
                  </th>
                  <th class=" text-left  fill-white cursor-pointer" >
                        <span class="mx-3 my-1">

                        </span>
                  </th>

                </tr>
               `
    }
    return `   <table class="table mb-0 table-borderless table-striped">
        <thead>
        ${header}
        </thead>
        <tbody>
        ${body}
        </tbody>

      </table>`;
  }

  checkObject(data: any) {
    var html = '';
    try {
      var object = JSON.parse(data);
      let i = 1;
      if (Object.keys(object).length > 0) {
        console.log(object)
        object.forEach((element: any) => {
          html += ` <table class="table mb-0 table-borderless table-striped">
          <thead>
          <th class="text-left fill-white cursor-pointer" >
                <span class="mx-3 my-1">
                    ชุดที่ ${i}
                </span>
          </th>
          <th class="text-left fill-white cursor-pointer" >
                <span class="mx-3 my-1">

                </span>
          </th>
          </thead>
          <tbody>
          `;
          for (const k in element) {  // const k: string
            const v = element[k];
            html += `
            <tr class="ms-4 mb-0"> <td> ${k.toString()} </td> <td>${this.checkStringOrNumber(v)}</td></tr>`;
          }
          html += ' </tbody>  </table>';
          i++;
        });


        return html
      }
      return this.checkStringOrNumber(data);
    } catch (error) {
      return this.checkStringOrNumber(data);
    }
  }

  checkStringOrNumber(val: any): any {
    var type = typeof val;
    if (isNaN(val)) {
      if (type === "number") {
        return val.toString().stringToFinacial();
      } else {
        return val ? val : "";
      }
    } else {

      if (type === "string") {
        return val;
      } else {
        return val.toString().stringToFinacial();
      }

    }
  }


  validateError(error: any, form: any) {
    for (const [keys, value] of Object.entries(error)) {
      keys.split('.').forEach(element => {
        const strIndex = element.indexOf("[");
        if (strIndex > -1) {
          var prop = element.substring(0, strIndex).toLowerCase()
          var index = Number(element.substring(strIndex).replaceAll("[", "").replaceAll("]", ""));
          form = form.get(prop).controls[index];
        } else {
          form.controls[element.toLowerCase()].setErrors({ api: { message: value }, });;
        }
      });
    }
  }
}
