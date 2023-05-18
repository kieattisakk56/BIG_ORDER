import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CoreAlertService {
  constructor(private toast: ToastrService) { }

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-secondary ms-3',
      popup: 'card p-3',
      title: 'py-3',
    },
    buttonsStyling: false,
  });

  async confirm(message: any) {
    return new Promise((resolve: any) => {
      this.swalWithBootstrapButtons
        .fire({
          // title: message,
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          timerProgressBar: true,
          html: `
          <div class='card-confirm'>
            <h2 class="m-0">ตรวจสอบ</h2>
            <p class="m-0">${message}</p>
          </div>
          `,
          customClass: {
            cancelButton: 'btn-sm btn btn-light swal2-btn mx-2',
            confirmButton: 'btn-sm btn btn-info swal2-btn mx-2 text-light'
          }
        })
        .then((result: any) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            // this.toast.success('success');
            resolve(true);
          }
        });
    });
  }

  async alert(message: any) {
    return new Promise((resolve: any) => {
      this.swalWithBootstrapButtons
        .fire({
          title: message,
          customClass: {
            cancelButton: 'btn-sm btn btn-light',
            confirmButton: 'btn-sm btn btn-primary'
          }
        })
        .then((result: any) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            // this.toast.success('success');
            resolve(true);
          }
        });
    });
  }

  async logout(message: any) {
    return new Promise((resolve: any) => {
      this.swalWithBootstrapButtons.fire({
        title: message,
        showCancelButton: true,
      }).then((result: any) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          resolve(true);
        }
      });
    });
  }
}
