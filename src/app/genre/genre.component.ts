import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying genre details in a dialog.
 */
@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})

export class GenreComponent {

  /**
   * Constructs an instance of GenreComponent.
   * @param {any} data Data injected into the dialog.
   * @param {MatDialogRef<GenreComponent>} dialogRef Reference to the dialog opened by the component from Angular Material.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<GenreComponent>
  ){}
  
    /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit():void {

  }
}
