import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { submissionModel } from 'src/app/shared/models/submission.model';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-new-submissions',
  templateUrl: './new-submissions.component.html',
  styleUrls: ['./new-submissions.component.scss'],
})
export class NewSubmissionsComponent implements OnInit {
  submission: submissionModel[] = [];
  user = JSON.parse(localStorage.getItem('user'));

  esig: string;
  isStamp: boolean = true;
  DisapproveIndicator: boolean = false;

  RejectForm: FormGroup;



  readonly photoUrl = environment.apiUrl + 'images/Company/';

  constructor(private Acc: createAccount) {}

  ngOnInit(): void {
    this.Acc.getByAccount(this.user.admin.id).subscribe((Acc) => {
      this.esig = Acc.stampFileName;
      if (this.esig == null) {
        this.isStamp = false;
      } else this.isStamp = true;
    });

    this.Acc.newSubmission(this.user.admin.sectionId).subscribe((eStud) => {
      this.submission = eStud;
      console.log(this.submission);
    });
  }
 

  approve(adminResponseId: number) {
    var PostVal = {
      id: adminResponseId,
      acceptedByCoordinator: true,
      comments: '',
    };

    this.Acc.coordinatorApprove(this.user.admin.id, PostVal).subscribe(
      (updatedVal) => {
        console.log(updatedVal);
        this.ngOnInit();
      }
    );
  }
  onNavigate(path: string) {
    var url = this.photoUrl + path;
    var win = window.open(url, '_blank');
  }
  toDisapprove(responseId:number) {
    this.DisapproveIndicator = true;
    this.RejectForm = new FormGroup({
      'comments': new FormControl(''),
      'id': new FormControl(responseId),
      'acceptedByCoordinator': new FormControl(false)
    });

  }

  rejectedSubmit() {
    this.Acc.coordinatorApprove(this.user.admin.id, this.RejectForm.value).subscribe(
      (updatedVal) => {
        console.log(updatedVal);
        this.ngOnInit();
      }
    );
    this.DisapproveIndicator = false;
  }

  toCancelTwo() {
    this.DisapproveIndicator = false;
  }
}
