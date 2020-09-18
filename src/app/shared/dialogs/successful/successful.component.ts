import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';

@Component({
  selector: 'app-successful',
  templateUrl: './successful.component.html',
  styleUrls: ['./successful.component.css']
})
export class SuccessfulComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SuccessfulComponent>, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public modalData: any){}

  actionDialog(): void {
    this.dialogRef.close({ data: true });
  }
  ngOnInit(): void {
  }
}
