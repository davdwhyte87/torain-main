import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from 'src/app/service/firebase/firebase.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  files: { name: string; url: string }[] = [];
  isLoading = false;
  constructor(
    private firebase: FirebaseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMedia();
  }

  private getMedia() {
    this.isLoading = true;
    this.firebase
      .getImages()
      .subscribe((imageUrls: Promise<{ name: string; url: string }>[]) => {
        Promise.all(imageUrls)
          .then((urls) => {
            this.files = urls;
          })
          .catch(() => {
            this.snackBar.open('Error retrieving media', 'close');
          })
          .finally(() => {
            this.isLoading = false;
          });
      });
  }

  isImage(fileName: string): boolean {
    const extensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = this.getFileExtension(fileName);
    return extensions.includes(fileExtension);
  }

  isVideo(fileName: string): boolean {
    const extensions = ['mp4', 'mov', 'avi'];
    const fileExtension = this.getFileExtension(fileName);
    return extensions.includes(fileExtension);
  }

  getFileExtension(fileName: string): string {
    const splitName = fileName.split('.');
    return splitName[splitName.length - 1].toLowerCase();
  }
}
