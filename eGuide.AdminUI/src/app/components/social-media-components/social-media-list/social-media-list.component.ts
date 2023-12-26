import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialMedia } from 'src/app/models/social-media';
import { SocialMediaService } from 'src/app/services/social-media.service';

@Component({
  selector: 'app-social-media-list',
  templateUrl: './social-media-list.component.html',
  styleUrls: ['./social-media-list.component.css'],
})
export class SocialMediaListComponent implements OnInit {
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
    this.socialMediaForm.reset();
  }

  getSocialMedias() {
    this.socialMediaService.getSocialMedias().subscribe((response) => {
      this.socialMedias = response;
    });
  }

  submitForm() {
    this.socialMediaService
      .addSocialMedia(this.socialMediaForm.value)
      .subscribe({
        next: (response) => {
          this.socialMedias.push(response);
          this.isOpen = false;
          this.socialMediaForm.reset();
        },
        error: () => {
          console.log('Social media not added');
        },
      });
  }

  toggleEdit(socialMedia: SocialMedia) {
    // other sockets should be disabled
    this.socialMediaForm.reset();
    this.isOpen = false;
    this.socialMedias.forEach((element) => {
      element.editingMode = false;
    });
    socialMedia.editingMode = !socialMedia.editingMode;
  }

  closeEdit(socialMedia: SocialMedia) {
    socialMedia.editingMode = false;
  }

  editSocialMedia(id: string) {
    this.socialMediaService
      .updateSocialMedia(id, this.socialMediaForm.value)
      .subscribe({
        next: () => {
          this.getSocialMedias();
          this.isOpen = false;
          this.socialMediaForm.reset();
        },
        error: () => {
          console.log('Social media not edited');
        },
      });
  }

  deleteSocialMedia(id: string) {
    this.socialMediaService.deleteSocialMedia(id).subscribe({
      next: () => {
        this.socialMedias = this.socialMedias.filter(
          (socialMedia) => socialMedia.id != id
        );
      },
      error: () => {
        console.log('Social media not deleted');
      },
    });
  }
}
