import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-admin-returniso',
  templateUrl: './admin-returniso.component.html',
  styleUrls: ['./admin-returniso.component.scss']
})
export class AdminReturnisoComponent implements OnInit {

  TransferIndicator: boolean = false;

  constructor(private Auth:AuthenticationService) { }

  ngOnInit(): void {
  }

  toTransfer() { 
    this.TransferIndicator = true;
  } 

  toCancel() { 
    this.TransferIndicator = false;
  } 

  user = JSON.parse(localStorage.getItem('user'));
   
  
  logout() {
    this.Auth.logout();
  }

}
