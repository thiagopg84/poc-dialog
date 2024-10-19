import { ComponentRef, Injectable, Type } from '@angular/core';
import { DialogContainerComponent } from '../components/dialog-container/dialog-container.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CustomDialogRef } from '../shared/classes/dialogref.class';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private overlay: Overlay) {}

  public open<T>(
    component: Type<T>,
    userConfig: Partial<T> = {}
  ): CustomDialogRef<any> {
    const overlayRef = this.createOverlay();
    const dialogRef = this.createDialogRef(overlayRef);
    const containerRef = this.attachDialogContainer(overlayRef);
    const componentRef = this.loadComponentIntoContainer(
      containerRef,
      component,
      userConfig
    );
    this.configureClose(containerRef, dialogRef);
    dialogRef.componentRef = componentRef;
    return dialogRef;
  }

  private createOverlay(): OverlayRef {
    return this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
    });
  }

  private createDialogRef(overlayRef: OverlayRef): CustomDialogRef<any> {
    return new CustomDialogRef<any>(overlayRef);
  }

  private attachDialogContainer(
    overlayRef: OverlayRef
  ): ComponentRef<DialogContainerComponent> {
    const dialogContainerPortal = new ComponentPortal(DialogContainerComponent);
    return overlayRef.attach(dialogContainerPortal);
  }

  private loadComponentIntoContainer<T>(
    containerRef: ComponentRef<DialogContainerComponent>,
    component: Type<T>,
    userConfig: Partial<T>
  ): ComponentRef<T> {
    return containerRef.instance.loadComponent(component, userConfig);
  }

  private configureClose(
    containerRef: ComponentRef<DialogContainerComponent>,
    dialogRef: CustomDialogRef<any>
  ): void {
    containerRef.instance.close = dialogRef.close.bind(dialogRef);
  }
}
