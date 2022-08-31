import { StorageService } from 'src/providers/storage';
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy, NavParams } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { RedditService } from "src/providers/reddit-service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { BrowserModule } from "@angular/platform-browser";
import { Deeplinks } from "@ionic-native/deeplinks/ngx";
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { AuthenticationService } from '../providers/authentication.service';
import { AuthGuard } from '../providers/auth-guard.service';
import { TokenInterceptor } from 'src/providers/auth.token.interceptor';
import { DatePipe } from '@angular/common';

// Calendar UI Module
import { CalendarModule } from 'ion2-calendar';

import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ModalCreateSlidePageModule } from './home/modal-create-slide/modal-create-slide.module';
import { ModalSearchPortePageModule } from './contract/modal-search-porte/modal-search-porte.module';
import { ModalEditSlidePageModule } from './home/modal-edit-slide/modal-edit-slide.module';


import { FileUploadModule } from 'ng2-file-upload';
FullCalendarModule.registerPlugins([interactionPlugin, dayGridPlugin]);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    ModalSearchPortePageModule,
    ModalCreateSlidePageModule,
    ModalEditSlidePageModule,
    FileUploadModule,
    ModalCreateSlidePageModule,
    FullCalendarModule,
    CalendarModule,
    BrowserModule,
    IonicModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    })
    
  ],
  providers: [
    DatePipe,
    Deeplinks,
    RedditService,
    StatusBar,
    StorageService,
    AuthenticationService,
    AuthGuard,
    //SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  //  { provide: ErrorHandler, useClass: MyErrorHandler }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
