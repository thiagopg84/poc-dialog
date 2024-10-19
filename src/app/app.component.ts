import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogService } from './services/dialog.service';
import { ChildComponent } from './components/child/child.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'This is the title';
  content = 'This is the content';

  constructor(private dialog: DialogService) {}

  open(): void {
    const dialogRef = this.dialog.open(ChildComponent, {
      title: this.title,
      content: this.content,
    });

    dialogRef.onClose.subscribe((result) => {
      console.log('Dialog closed with:', result);
    });
  }
}
