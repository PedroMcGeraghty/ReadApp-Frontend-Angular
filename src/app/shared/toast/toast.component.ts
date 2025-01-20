import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ToastComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: ToastType = 'info';
  @Input() autoClose: boolean = true;
  @Input() duration: number = 1800;

  isVisible: boolean = false;

  ngOnInit(): void {
    this.showToast();
  }

  showToast(): void {
    this.isVisible = true;
    setTimeout(() => {
      this.closeToast();
    }, this.duration);
  }

  closeToast(): void {
    this.isVisible = false;
  }
}

export type ToastType = 'success' | 'error' | 'info' | 'warning'
