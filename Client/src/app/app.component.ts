import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    let dialogConfig: MatDialogConfig = {
      disableClose: true
    };

    let dialogRef = this.dialog.open(DialogComponent, dialogConfig);
  }
}
