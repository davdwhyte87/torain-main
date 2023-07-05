import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InputComponent } from '../shared/input/input.component';
import { Component, HostListener, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase/firebase.service';
import { MailchimpService } from 'src/app/service/mailchimp/mailchimp.service';

@Component({
  selector: 'app-Footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @ViewChild(InputComponent) MyInput!: InputComponent;

  email = '';
  type = 'email';
  loading = false;
  isValidEmail = false;
  isMobile: boolean = false;
  isHome: string = '';
  subscription!: Subscription;
  date = new Date().getFullYear();
  socials = [
    {
      path: '/assets/svg/yt.svg',
      alt: 'youtube icon',
      url: 'https://www.youtube.com/channel/UC0BiT7M08BOJrandlDSz9yg',
    },
    {
      path: '/assets/svg/fb.svg',
      alt: 'facebook icon',
      url: 'https://www.facebook.com/profile.php?id=100092463396778',
    },
    {
      path: '/assets/svg/tw.svg',
      alt: 'twitter icon',
      url: 'https://twitter.com/toraincharity',
    },
    {
      path: '/assets/svg/ig.svg',
      alt: 'instagram icon',
      url: 'https://www.instagram.com/torain_charity_foundation/',
    },
    { path: '/assets/svg/li.svg', alt: 'linkedIn icon', url: '' },
  ];

  constructor(
    private router: Router,
    private mailchimp: MailchimpService,
    private firebase: FirebaseService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit() {
    this.isHome = this.location.path();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isHome = this.location.path();
      });

    this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.isMobile = window.innerWidth <= 800;
  }

  onRoute(path: string) {
    this.router.navigateByUrl(path);
  }

  onInput(e: string) {
    this.email = e;
    this.checkEmail(e);
  }

  onAdd() {
    this.loading = true;
    this.mailchimp.submit(this.email).subscribe({
      next: (res) => {
        if (res.result && res.result !== 'error') {
          this.loading = false;
          this.snackBar.open(res.msg, 'close', {
            duration: 2000,
          });
          this.MyInput.onReset();
        } else {
          this.loading = false;
          this.snackBar.open('Subscription failed', 'close', {
            duration: 2000,
          });
        }
      },
      error: (_e) => {
        this.loading = false;
        this.snackBar.open('Something went wrong', 'close', { duration: 2000 });
      },
    });
  }

  onSubscribe() {
    if (!this.isValidEmail) {
      this.snackBar.open('Enter a valid email', 'close', {
        duration: 1500,
      });
      return;
    }
    this.loading = true;
    this.subscription = this.firebase.retrieve(this.email).subscribe({
      next: (docs) => {
        if (docs && docs.length > 0) {
          this.snackBar.open('Email already exists', 'close', {
            duration: 1500,
          });
          this.loading = false;
        } else {
          this.add(this.email);
        }
        this.subscription.unsubscribe();
      },
      error: (_e) => {
        this.loading = false;
        this.snackBar.open('Something went wrong', 'close', { duration: 1500 });
      },
    });
  }

  add(email: string) {
    this.firebase
      .insert(email)
      .then((_res) => {
        this.snackBar.open('Subscribed successfully', 'close', {
          duration: 1500,
        });
      })
      .catch((_e) => {
        this.snackBar.open('Subscription failed, try again', 'close', {
          duration: 1500,
        });
      })
      .finally(() => (this.loading = false));
  }

  checkEmail(e: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isValidEmail = emailRegex.test(e);
  }
}
