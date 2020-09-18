import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sure',
  templateUrl: './sure.component.html',
  styleUrls: ['./sure.component.css']
})
export class SureComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SureComponent>, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public modalData: any){}

  ngOnInit(): void {
  }
  cancel(){
    this.dialogRef.close({data : false });
  }
  delete(){
    this.dialogRef.close({ data: true });
  }
}
