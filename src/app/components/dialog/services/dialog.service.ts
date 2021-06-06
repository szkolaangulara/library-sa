import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Inject,
  Injectable,
  Injector,
  Type
} from '@angular/core';
import {DOCUMENT} from '@angular/common';

import {take} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {DialogConfig} from '@app/components/dialog/dialog-config.interface';
import {DialogComponent} from '@app/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public dialogClosed$: Subject<boolean> = new Subject<boolean>();
  private dialogComponentRef: ComponentRef<DialogComponent>;

  constructor(private injector: Injector,
              private componentFactoryResolver: ComponentFactoryResolver,
              private applicationRef: ApplicationRef,
              @Inject(DOCUMENT) private document: Document) {
  }

  public openDialog(childComponentType: Type<any>, dialogConfig?: DialogConfig): any {
    this.dialogComponentRef = this.prepareComponentRef();
    if (dialogConfig) {
      this.dialogComponentRef.instance.dialogWidth = dialogConfig.width;
      this.dialogComponentRef.instance.dialogHeight = dialogConfig.height;
    }

    this.addDialogToComponentTree();
    this.appendDialogToDOM();
    this.addOnCloseDialogListener();
    this.dialogComponentRef.changeDetectorRef.detectChanges();
    return this.prepareChildComponent(childComponentType).instance;
  }

  public closeDialog(): void {
    this.applicationRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
    this.dialogClosed$.next(true);
  }

  private addDialogToComponentTree(): void {
    this.applicationRef.attachView(this.dialogComponentRef.hostView);
  }

  private appendDialogToDOM(): void {
    const domElement: HTMLElement = (this.dialogComponentRef.hostView as EmbeddedViewRef<DialogComponent>).rootNodes[0] as HTMLElement;
    this.document.body.appendChild(domElement);
  }

  private addOnCloseDialogListener(): void {
    this.dialogComponentRef.instance.onClose$
      .pipe(take(1))
      .subscribe(() => this.closeDialog());
  }

  private prepareComponentRef(): ComponentRef<DialogComponent> {
    const factory: ComponentFactory<DialogComponent> = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    return factory.create(this.injector);
  }

  public prepareChildComponent(childComponentType: Type<any>): ComponentRef<any> {
    const componentFactory: ComponentFactory<Type<any>> = this.componentFactoryResolver.resolveComponentFactory(childComponentType);
    this.dialogComponentRef.instance.childComponentPlacementContainer.clear();
    return this.dialogComponentRef.instance.childComponentPlacementContainer.createComponent(componentFactory);
  }
}
