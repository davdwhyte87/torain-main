import { Component, EventEmitter, Input, Output } from '@angular/core';

interface IBtn {
  font: string;
  color: string;
  width: string;
  border: string;
  bgColor: string;
  padding: string;
  loading?: boolean;
  disabled?: boolean;
  borderRadius?: string;
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() props: IBtn = {
    width: 'auto',
    loading: false,
    disabled: false,
    color: '#ffffff',
    bgColor: '#FF6A15',
    borderRadius: '0px',
    padding: '16px 28px',
    font: '500 16px Roboto',
    border: '2px solid #F2994A',
  };

  @Output() onClick = new EventEmitter<Event>();

  trigger() {
    this.onClick.emit();
  }
}
