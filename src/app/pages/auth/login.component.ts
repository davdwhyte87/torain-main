import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email!: string;
  password!: string;
  isLoading: boolean = false;

  constructor(
    private firebase: FirebaseService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  async onLogin() {
    this.isLoading = true;
    await this.firebase
      .signIn(this.email, this.password)
      .then((_res) => {
        this.openSnackBar('Log in Successful');
        this.router.navigateByUrl('admin/dashboard');
      })
      .catch((_e) => {
        this.openSnackBar('Error logging in');
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'close', { duration: 2000 });
  }
}
