import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-NavBar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public isMobile: boolean = false;
  public toggle: boolean = false;
  public path: string = '';
  public links = [
    { name: 'home', path: '/' },
    { name: 'about us', path: '/about' },
    { name: 'media', path: '/media' },
    { name: 'donate', path: '/donate' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.path = this.router.url;
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

  toDonate() {
    this.router.navigateByUrl('/donate');
  }

  onToggle() {
    this.toggle = !this.toggle;
  }
}
