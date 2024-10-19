import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export class CustomDialogRef<T = any> {
  private readonly closeSubject = new Subject<any>();

  public onClose: Observable<T> = this.closeSubject.asObservable();
  public componentRef?: ComponentRef<any>;

  constructor(private overlayRef: OverlayRef) {}

  public close(result?: any): void {
    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.closeSubject.next(result);
    this.closeSubject.complete();
  }
}
