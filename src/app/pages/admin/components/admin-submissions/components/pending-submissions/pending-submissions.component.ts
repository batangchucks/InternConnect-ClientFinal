import { Component, OnInit } from '@angular/core';
import { submissionModel } from 'src/app/shared/models/submission.model';
import { createAccount } from 'src/app/shared/services/createAcc.service';

@Component({
  selector: 'app-pending-submissions',
  templateUrl: './pending-submissions.component.html',
  styleUrls: ['./pending-submissions.component.scss']
})
export class PendingSubmissionsComponent implements OnInit {

  Submission: submissionModel[] = [];

  constructor(private Acc: createAccount) { }
  user = JSON.parse(localStorage.getItem('user'));

  ngOnInit(): void {
   
    this.Acc.submissionStep4(this.user.admin.sectionId).subscribe(eachS=> {
      console.log(eachS);
      this.Submission = eachS;
    })

  }
  downloadPdf(submissionId:number) {
      this.Acc.approvedPending(submissionId).subscribe((pdfGeneration )=> {
        console.log(pdfGeneration);
        var blob = new Blob([pdfGeneration], {type: 'application/pdf'});
        console.log(blob);
        let url = window.URL.createObjectURL(blob);
         window.open(url);
      })
  }
  sendToCompany(responseId:number) {
      var Payload = {
        id:responseId,
        emailSentByCoordinator:true,
        comments:""
      }
      this.Acc.emailSent(Payload).subscribe(response=> {
        console.log(response);
        this.ngOnInit();
      })

  }

}
