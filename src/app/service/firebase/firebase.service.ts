import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  async signUp(email: string, password: string) {
    const res = await this.auth
      .createUserWithEmailAndPassword(email, password)
      .catch((e) => {
        throw e;
      });
    return res;
  }

  async signIn(email: string, password: string) {
    const res = await this.auth
      .signInWithEmailAndPassword(email, password)
      .catch((e) => {
        throw e;
      });

    return res;
  }

  async signOut() {
    await this.auth.signOut().catch((e) => {
      window.alert(e);
    });
  }

  uploadImage(file: File) {
    const filePath = `media/${file.name}`;
    const upload = this.storage.upload(filePath, file);

    return upload.snapshotChanges();
  }

  getImages(): Observable<any> {
    const storageRef = this.storage.ref('media/');
    return storageRef.listAll().pipe(
      switchMap((result) => {
        const downloadUrlPromises = result.items.map((item) =>
          item.getDownloadURL()
        );
        const data = forkJoin(downloadUrlPromises).pipe(
          map((downloadUrls) => {
            return result.items.map((item, index) => ({
              name: item.name,
              url: downloadUrls[index],
            }));
          })
        );

        return data;
      })
    );
  }

  insert(email: string) {
    return this.firestore.collection('users').add({ email });
  }

  retrieve(email: string) {
    return this.firestore
      .collection('users', (ref) => ref.where('email', '==', email))
      .valueChanges();
  }
}
