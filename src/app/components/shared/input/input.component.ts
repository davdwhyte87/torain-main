import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  inputValue!: string;
  @Input() width: string = '349px';
  @Input() height: string = '48px';
  @Input() type: string = 'text';
  @Output() inputChanged = new EventEmitter<string>();
  @Input() placeholder: string = 'Enter your email to get the latest news...';

  onInputChange(): void {
    this.inputChanged.emit(this.inputValue);
  }

  onReset() {
    this.inputValue = '';
  }
}
