import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MaxWidthPipe } from 'src/app/pipes/max-width.pipe';

@Component({
  selector: 'app-Footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public isMobile: boolean = false;
  public isHome: boolean = false;
  public date = new Date().getFullYear();
  public socials = [
    {
      path: '/assets/svg/yt.svg',
      alt: 'youtube icon',
      url: 'https://www.youtube.com/@TorainCharityFoundation/featured',
    },
    {
      path: '/assets/svg/fb.svg',
      alt: 'facebook icon',
      url: 'https://www.facebook.com/people/Torain-Charity-Foundation/100092463396778/',
    },
    { path: '/assets/svg/tw.svg', alt: 'twitter icon', url: '' },
    {
      path: '/assets/svg/ig.svg',
      alt: 'instagram icon',
      url: 'https://www.instagram.com/torain_charity_foundation/',
    },
    { path: '/assets/svg/li.svg', alt: 'linkedIn icon', url: '' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHome = this.router.url === '/';
      }
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
}
