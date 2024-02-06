import { Component, Inject, Pipe } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

/**
 * Component for displaying director details in a dialog.
 */
@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})

export class DirectorComponent {
  /**
   * Constructs an instance of DirectorComponent.
   * @param {any} data Data injected into the dialog.
   * @param {MatDialogRef<DirectorComponent>} dialogRef Reference to the dialog opened by the component.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<DirectorComponent>
  ){}
  
  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit():void {
  }
}
