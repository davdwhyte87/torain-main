import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() width: string = '349px';
  @Input() height: string = '48px';
  @Input() type: string = 'text';
  @Output() onInputChange = new EventEmitter<Event>();
  @Input() placeholder: string = 'Enter your email to get the latest news...';
}
