import { Component, OnInit } from '@angular/core';
import { SocialMedia } from 'src/app/models/social-media';
import { SocialMediaService } from 'src/app/services/social-media.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  socialMedias: SocialMedia[] = [];
  constructor(private socialMediaService: SocialMediaService) {}

  ngOnInit(): void {
    this.getSocialMedias();
  }

  getSocialMedias() {
    return this.socialMediaService.getSocialMedia().subscribe((data) => {
      this.socialMedias = data;
      console.log(this.socialMedias);
    });
  }
}
