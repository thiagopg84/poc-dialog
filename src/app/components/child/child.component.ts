import { Component } from '@angular/core';
import { DialogContainerComponent } from '../dialog-container/dialog-container.component';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
})
export class ChildComponent {
  title = '';
  content = '';

  constructor(private dialogContainer: DialogContainerComponent) {}

  close(): void {
    this.dialogContainer.close({
      title: this.title,
      content: this.content,
    });
  }
}
