import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { Component, Input } from '@angular/core';
import { loadModules } from 'esri-loader';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  @Input() stationInformation: any;
  isOpen = false;

  constructor(public dialogRef: MatDialogRef<PopupComponent>) {}

  ngOnInit(): void {
    console.log(this.stationInformation, 'modal');
    if (this.stationInformation) {
      this.openModal();
    }
  }

  openModal() {
    console.log('open modal');
    this.isOpen = true;
  }

  closeModal() {
    this.dialogRef.close();
  }
}
