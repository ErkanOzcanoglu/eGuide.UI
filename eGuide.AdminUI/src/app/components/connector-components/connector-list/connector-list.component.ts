import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Connector } from 'src/app/models/connector';
import { ConnectorService } from 'src/app/services/connector.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-connector-list',
  templateUrl: './connector-list.component.html',
  styleUrls: ['./connector-list.component.css'],
})
export class ConnectorListComponent implements OnInit {
  connectorList: Connector[] = [];
  connectorForm: FormGroup = new FormGroup({});

  @Output() editConnectorEvent = new EventEmitter<string>();

  constructor(
    private connectorService: ConnectorService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getConnector();
    this.initializeForm();
  }

  initializeForm() {
    this.connectorForm = this.formBuilder.group({
      type: [''],
      imageData: [''],
      imageName: [''],
    });
  }

  getConnector() {
    this.connectorService.getConnectors().subscribe((connectors) => {
      this.connectorList = connectors;
    });
  }

  updateConnector(id: string) {
    this.connectorService
      .updateConnector(id, this.connectorForm.value)
      .subscribe({
        next: () => {
          this.getConnector();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  editConnector(id: string) {
    this.editConnectorEvent.emit(id);
  }

  toggleEdit(connector: Connector) {
    this.connectorList.forEach((element) => {
      element.editingMode = false;
    });
    connector.editingMode = !connector.editingMode;
  }

  closeEdit(connector: Connector) {
    connector.editingMode = false;
  }

  deleteConnector(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.connectorService.deleteConnector(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
            this.getConnector();
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    });
  }
}
