import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit {

  constructor(private coreService: CoreService) { }

  ngOnInit(): void {
  }

}
