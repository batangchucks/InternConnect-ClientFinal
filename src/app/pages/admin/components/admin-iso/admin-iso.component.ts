import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProgramService } from 'src/app/shared/services/program.service';

@Component({
  selector: 'app-admin-iso',
  templateUrl: './admin-iso.component.html',
  styleUrls: ['./admin-iso.component.scss']
})
export class AdminIsoComponent implements OnInit {
  isoForm:FormGroup;

  user = JSON.parse(localStorage.getItem("user"));

  constructor(private program: ProgramService) { }

  ngOnInit(): void {
    this.initalizeForm();
  }
  initalizeForm() {
    this.isoForm = new FormGroup({
      "id":new FormControl(this.user.admin.programId),
      "isoCode": new FormControl("")
    });
  }
  isoSubmit() {
      this.program.updateISO(this.isoForm.value).subscribe(updatedIso=> {
        console.log(updatedIso);
      })
  }

}
