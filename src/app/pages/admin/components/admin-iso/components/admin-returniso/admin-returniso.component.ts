import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { IsoCodeService } from 'src/app/shared/services/iso-code.service';

@Component({
  selector: 'app-admin-returniso',
  templateUrl: './admin-returniso.component.html',
  styleUrls: ['./admin-returniso.component.scss'],
})
export class AdminReturnisoComponent implements OnInit {
  TransferIndicator: boolean = false;

  constructor(
    private Auth: AuthenticationService,
    private isoCode: IsoCodeService
  ) {}

  coordinatorList:any[];
  isoCodeList: any[]

  ngOnInit(): void {
    this.isoCode.getCoordinatorData(this.user.admin.programId).subscribe((val:[any])=>{
      this.coordinatorList = val
      console.log(val);
    })

    this.isoCode.getIsoCode(this.user.admin.programId).subscribe((val:[any])=>{
      this.isoCodeList = val
      console.log(val)
    })


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
