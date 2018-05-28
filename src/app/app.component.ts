import {
  Component,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  Inject,
  ViewChild,
  TemplateRef,
  ViewContainerRef, InjectionToken,
} from '@angular/core';
import {DOCUMENT} from '@angular/common'
import {DomPortalOutlet, ComponentPortal, TemplatePortal, PortalInjector} from '@angular/cdk/portal';


let DATA = new InjectionToken<any>('Sharing Data with Component Portal');

@Component({
  selector: 'portal-dialog',
  template: `
    <p>Component Portal<p>
  `
})
export class DialogComponent {}


@Component({
  selector: 'portal-dialog-sharing-data',
  template: `
    <p>Component Portal Sharing Data is: {{data}}<p>
  `
})
export class DialogComponentWithSharingData {
  constructor(@Inject(DATA) public data: any) {}
}

@Component({
  selector: 'app-root',
  template: `
    <h2>Open a ComponentPortal Inside Angular Context</h2>
    <button (click)="openComponentPortalInsideAngularContext()">Open a ComponentPortal Inside Angular Context</button>
    <div #_openComponentPortalInsideAngularContext></div>


    <h2>Open a TemplatePortal Inside Angular Context</h2>
    <button (click)="openTemplatePortalInsideAngularContext()">Open a TemplatePortal Inside Angular Context</button>
    <div #_openTemplatePortalInsideAngularContext></div>
    <ng-template #_templatePortalInsideAngularContext>
      <p>Template Portal Inside Angular Context</p>
    </ng-template>
    
    
    <h2>Open a ComponentPortal Outside Angular Context</h2>
    <button (click)="openComponentPortalOutSideAngularContext()">Open a ComponentPortal Outside Angular Context</button>
    
    
    <h2>Open a TemplatePortal Outside Angular Context</h2>
    <button (click)="openTemplatePortalOutSideAngularContext()">Open a TemplatePortal Outside Angular Context</button>
    <ng-template #_templatePortalOutsideAngularContext>
      <p>Template Portal Outside Angular Context</p>
    </ng-template>
    

    <h2>Open a ComponentPortal Outside Angular Context with Sharing Data</h2>
    <button (click)="openComponentPortalOutSideAngularContextWithSharingData()">Open a ComponentPortal Outside Angular Context with Sharing Data</button>
    <input [value]="sharingComponentData" (change)="setComponentSharingData($event.target.value)"/>

    
    <h2>Open a TemplatePortal Outside Angular Context with Sharing Data</h2>
    <button (click)="openTemplatePortalOutSideAngularContextWithSharingData()">Open a TemplatePortal Outside Angular Context with Sharing Data</button>
    <input [value]="sharingTemplateData" (change)="setTemplateSharingData($event.target.value)"/>
    <ng-template #_templatePortalOutsideAngularContextWithSharingData let-name="name">
      <p>Template Portal Outside Angular Context, the Sharing Data is {{name}}</p>
    </ng-template>
    
    <h2>@angular/router</h2>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  private _appRef: ApplicationRef;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private _injector: Injector,
              @Inject(DOCUMENT) private _document) {}

  @ViewChild('_openComponentPortalInsideAngularContext', {read: ViewContainerRef}) _openComponentPortalInsideAngularContext: ViewContainerRef;
  openComponentPortalInsideAngularContext() {
    if (!this._appRef) {
      this._appRef = this._injector.get(ApplicationRef);
    }

    // instantiate a DomPortalOutlet
    const portalOutlet = new DomPortalOutlet(this._openComponentPortalInsideAngularContext.element.nativeElement, this._componentFactoryResolver, this._appRef, this._injector);
    // instantiate a ComponentPortal<DialogComponent>
    const componentPortal = new ComponentPortal(DialogComponent);
    // attach a ComponentPortal to a DomPortalOutlet
    portalOutlet.attach(componentPortal);
  }


  @ViewChild('_templatePortalInsideAngularContext', {read: TemplateRef}) _templatePortalInsideAngularContext: TemplateRef<any>;
  @ViewChild('_openTemplatePortalInsideAngularContext', {read: ViewContainerRef}) _openTemplatePortalInsideAngularContext: ViewContainerRef;
  openTemplatePortalInsideAngularContext() {
    if (!this._appRef) {
      this._appRef = this._injector.get(ApplicationRef);
    }

    // instantiate a DomPortalOutlet
    const portalOutlet = new DomPortalOutlet(this._openTemplatePortalInsideAngularContext.element.nativeElement, this._componentFactoryResolver, this._appRef, this._injector);
    // instantiate a TemplatePortal<>
    const templatePortal = new TemplatePortal(this._templatePortalInsideAngularContext, this._openTemplatePortalInsideAngularContext);
    // attach a TemplatePortal to a DomPortalOutlet
    portalOutlet.attach(templatePortal);
  }


  openComponentPortalOutSideAngularContext() {
    let container = this._document.createElement('div');
    container.classList.add('component-portal');
    container = this._document.body.appendChild(container);

    if (!this._appRef) {
      this._appRef = this._injector.get(ApplicationRef);
    }

    // instantiate a DomPortalOutlet
    const portalOutlet = new DomPortalOutlet(container, this._componentFactoryResolver, this._appRef, this._injector);
    // instantiate a ComponentPortal<DialogComponent>
    const componentPortal = new ComponentPortal(DialogComponent);
    // attach a ComponentPortal to a DomPortalOutlet
    portalOutlet.attach(componentPortal);
  }


  @ViewChild('_templatePortalOutsideAngularContext', {read: TemplateRef}) _template: TemplateRef<any>;
  @ViewChild('_templatePortalOutsideAngularContext', {read: ViewContainerRef}) _viewContainerRef: ViewContainerRef;
  openTemplatePortalOutSideAngularContext() {
    let container = this._document.createElement('div');
    container.classList.add('template-portal');
    container = this._document.body.appendChild(container);

    if (!this._appRef) {
      this._appRef = this._injector.get(ApplicationRef);
    }

    // instantiate a DomPortalOutlet
    const portalOutlet = new DomPortalOutlet(container, this._componentFactoryResolver, this._appRef, this._injector);
    // instantiate a TemplatePortal<>
    const templatePortal = new TemplatePortal(this._template, this._viewContainerRef);
    // attach a TemplatePortal to a DomPortalOutlet
    portalOutlet.attach(templatePortal);
  }


  sharingComponentData: string = 'lx1036';
  setComponentSharingData(value) {
    this.sharingComponentData = value;
  }
  openComponentPortalOutSideAngularContextWithSharingData() {
    let container = this._document.createElement('div');
    container.classList.add('component-portal-with-sharing-data');
    container = this._document.body.appendChild(container);

    if (!this._appRef) {
      this._appRef = this._injector.get(ApplicationRef);
    }

    // Sharing data by Injector(Dependency Injection)
    const map = new WeakMap();
    map.set(DATA, this.sharingComponentData);
    const injector = new PortalInjector(this._injector, map);

    // instantiate a DomPortalOutlet
    const portalOutlet = new DomPortalOutlet(container, this._componentFactoryResolver, this._appRef, injector);
    // instantiate a ComponentPortal<DialogComponentWithSharingData>
    const componentPortal = new ComponentPortal(DialogComponentWithSharingData);
    // attach a ComponentPortal to a DomPortalOutlet
    portalOutlet.attach(componentPortal);
  }


  sharingTemplateData: string = 'lx1035';
  @ViewChild('_templatePortalOutsideAngularContextWithSharingData', {read: TemplateRef}) _templateWithSharingData: TemplateRef<any>;
  @ViewChild('_templatePortalOutsideAngularContextWithSharingData', {read: ViewContainerRef}) _viewContainerRefWithSharingData: ViewContainerRef;
  setTemplateSharingData(value) {
    this.sharingTemplateData = value;
  }
  openTemplatePortalOutSideAngularContextWithSharingData() {
    let container = this._document.createElement('div');
    container.classList.add('template-portal-with-sharing-data');
    container = this._document.body.appendChild(container);

    if (!this._appRef) {
      this._appRef = this._injector.get(ApplicationRef);
    }

    // instantiate a DomPortalOutlet
    const portalOutlet = new DomPortalOutlet(container, this._componentFactoryResolver, this._appRef, this._injector);
    // instantiate a TemplatePortal<DialogComponentWithSharingData>
    const templatePortal = new TemplatePortal(this._templateWithSharingData, this._viewContainerRefWithSharingData, {name: this.sharingTemplateData});
    // attach a TemplatePortal to a DomPortalOutlet
    portalOutlet.attach(templatePortal);
  }
}
