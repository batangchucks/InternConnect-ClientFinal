import { Component, OnInit } from '@angular/core';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { fileUpload } from 'src/app/shared/services/fileUpload.service';

@Component({
  selector: 'app-landing-update',
  templateUrl: './landing-update.component.html',
  styleUrls: ['./landing-update.component.scss']
})
export class LandingUpdateComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));

  selectedFileLanding: File = null;
  imageSrc: string;
  landingPagePhoto:string;
  landingPagePath: string;

  selectedFileLogo: File = null;
  logoPhoto:string;
  logoPath: string;
  
  
  constructor(private File: fileUpload,private Acc: createAccount) { }

  ngOnInit(): void {
    
    this.Acc.getWebstate().subscribe(web=> {
      this.landingPagePhoto = web.coverPhotoFileName;
      this.logoPhoto = web.logoFileName;
      this.landingPagePath = this.File.photoUrlL+this.landingPagePhoto;
      this.logoPath = this.File.photoUrlL+this.logoPhoto;
      console.log(this.logoPath);
    })
  }

  updateLanding(event) {
    this.selectedFileLanding = <File>event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
       
      };
    }
    const formData: FormData = new FormData();
    console.log(this.selectedFileLanding);
    formData.append('files', this.selectedFileLanding, this.selectedFileLanding.name);
    console.log(this.selectedFileLanding.name);

   
    
    

    this.File.uploadLanding(formData).subscribe((data:any)=>{
      this.landingPagePhoto = data.toString();
      this.landingPagePath = this.File.photoUrlL+this.landingPagePhoto;
    });
    

  }
  updateLogo(event) {
    this.selectedFileLogo = <File>event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
       
      };
    }
    const formData: FormData = new FormData();

    formData.append('files', this.selectedFileLogo, this.selectedFileLogo.name);
   
    console.log(this.selectedFileLogo.name);
    this.File.uploadLanding(formData).subscribe((data:any)=>{
      this.logoPhoto = data.toString();
      this.logoPath = this.File.photoUrlL+this.logoPhoto;
      console.log(this.logoPhoto);
      
    });
  }

  uploadImages() {
    console.log('working');

    var PostVal = {
      id:1,
      logoFileName:this.logoPhoto,
      coverPhotoFileName: this.landingPagePhoto
    }

    console.log(PostVal);

    this.Acc.updateWebstate(PostVal).subscribe(post=> {
      console.log(post);
      this.ngOnInit();
      this.landingPagePhoto = '';
      this.logoPhoto = '';

    });

  }

}
