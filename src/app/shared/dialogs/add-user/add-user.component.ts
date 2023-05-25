import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>, private http: UserService, private auth: AuthService) {}

  newUser: any = {};
  token = this.auth.getToken()!;


  onNoClick(): void {
    this.dialogRef.close();
  }

  error: string | undefined;

  onSubmit(): void{
    this.http.createUser(this.newUser, this.token).subscribe((response: any)=>{
      location.reload();
      this.dialogRef.close();
    },
    (error: any) =>{
      console.log(error);
      this.error =error.error[0].field + " " + error.error[0].message;
    });
  }
}
