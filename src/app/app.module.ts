import { BrowserModule } from '@angular/platform-browser';
import {Component, NgModule} from '@angular/core';

import {AppComponent, DialogComponent, DialogComponentWithSharingData} from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-a',
  template: `
    <button routerLink="/b">Redirect to BComponent</button>
  `
})
export class AComponent {
}

@Component({
  selector: 'app-b',
  template: `
    <button routerLink="/a">Redirect to AComponent</button>
  `
})
export class BComponent {
}


@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    DialogComponentWithSharingData,

    AComponent,
    BComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'a', component: AComponent},
      {path: 'b', component: BComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent,
    DialogComponentWithSharingData
  ]
})
export class AppModule { }
