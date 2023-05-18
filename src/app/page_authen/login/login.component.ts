import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoreService } from 'src/app/core/core.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  items: any;
  process = false;
  year = new Date();

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
