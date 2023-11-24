import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialMedia } from 'src/app/models/social-media';
import { SocialMediaService } from 'src/app/services/social-media.service';

@Component({
  selector: 'app-social-media-list',
  templateUrl: './social-media-list.component.html',
  styleUrls: ['./social-media-list.component.css'],
})
export class SocialMediaListComponent {
  socialMediaForm: FormGroup = new FormGroup({});
  isOpen?: boolean = false;
  socialMedias: SocialMedia[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private socialMediaService: SocialMediaService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.getSocialMedias();
  }

  initializeForm() {
    this.socialMediaForm = this.formBuilder.group({
      iconAlt: ['', Validators.required],
      name: ['', Validators.required],
      icon: ['', Validators.required],
      link: ['', Validators.required],
    });
  }

  openForm() {
    this.isOpen = !this.isOpen;
    console.log('open form');
  }

  getSocialMedias() {
    this.socialMediaService.getSocialMedias().subscribe((response) => {
      this.socialMedias = response;
      console.log(this.socialMedias);
    });
  }

  submitForm() {
    this.socialMediaService
      .addSocialMedia(this.socialMediaForm.value)
      .subscribe(
        (response) => {
          this.socialMedias.push(response);
          this.isOpen = false;
          this.socialMediaForm.reset();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  toggleEdit(socialMedia: SocialMedia) {
    // other sockets should be disabled
    this.socialMedias.forEach((element) => {
      element.editingMode = false;
    });
    socialMedia.editingMode = !socialMedia.editingMode;
  }

  closeEdit(socialMedia: SocialMedia) {
    socialMedia.editingMode = false;
  }

  editSocialMedia(id: any) {
    this.socialMediaService
      .updateSocialMedia(id, this.socialMediaForm.value)
      .subscribe(
        (response) => {
          this.socialMedias.forEach((element) => {
            if (element.id == id) {
              element = response;
            }
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteSocialMedia(id: any) {
    this.socialMediaService.deleteSocialMedia(id).subscribe(
      (response) => {
        this.socialMedias = this.socialMedias.filter(
          (socialMedia) => socialMedia.id != id
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
