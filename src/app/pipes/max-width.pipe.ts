import { Pipe, PipeTransform, HostListener } from '@angular/core';

@Pipe({
  name: 'maxWidth',
})
export class MaxWidthPipe implements PipeTransform {
  private size!: number;

  transform(_value: unknown, size: number): boolean {
    this.size = size;
    return this.checkScreenWidth(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth(event.target.innerWidth);
  }

  checkScreenWidth(width: number) {
    return width <= this.size;
  }
}
