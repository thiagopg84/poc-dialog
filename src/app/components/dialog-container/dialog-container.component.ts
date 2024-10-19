import {
  Component,
  ComponentRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-dialog-container',
  standalone: true,
  imports: [],
  templateUrl: './dialog-container.component.html',
  styleUrl: './dialog-container.component.scss',
})
export class DialogContainerComponent {
  @ViewChild('contentContainer', { read: ViewContainerRef, static: true })
  contentContainer!: ViewContainerRef;

  public close: (result?: any) => void = () => {};

  public loadComponent<T>(
    component: Type<T>,
    config?: Partial<T>
  ): ComponentRef<T> {
    const componentRef = this.contentContainer.createComponent(component);
    if (config && componentRef.instance) {
      Object.assign(componentRef.instance, config);
    }
    return componentRef;
  }
}
