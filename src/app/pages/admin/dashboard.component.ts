import { catchError, tap } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from 'src/app/service/firebase/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild('fileInput') fileInput: any;
  isLoading: boolean = false;

  constructor(
    private firebase: FirebaseService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  chooseFile() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    this.isLoading = true;
    const file = event.target.files[0];
    this.firebase.uploadImage(file).subscribe({
      next: (snapshot) => {
        if (snapshot?.bytesTransferred === snapshot?.totalBytes) {
          this.isLoading = false;
          this.openSnackBar('Upload successful');
        }
      },
      error: () => {
        this.isLoading = false;
        this.openSnackBar('Error uploading file');
      },
    });
  }

  async logout() {
    await this.firebase
      .signOut()
      .then(() => {
        this.openSnackBar('Log out successful');
        this.router.navigateByUrl('/admin/login');
      })
      .catch((e) => {
        this.openSnackBar(e);
      });
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'close', { duration: 1000 });
  }
}
