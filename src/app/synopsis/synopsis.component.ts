import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying movie synopsis in a dialog.
 */
@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})

export class SynopsisComponent {

  /**
   * Constructs an instance of SynopsisComponent.
   * @param {any} data Data passed to the dialog.
   * @param {MatDialogRef<SynopsisComponent>} dialogRef Reference to the dialog opened by MatDialog.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<SynopsisComponent>
  ){}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit():void {

  }
}
