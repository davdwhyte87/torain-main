import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-msg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss'],
})
export class MsgComponent {
  @Input() color: string = '#697077';
}
