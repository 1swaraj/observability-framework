import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
/* Add Amplify imports */
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
// @ts-ignore
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { AppComponent } from './app-component';
import { AppRoutingModule } from './app-routing.module';
import { CostComponent } from './components/cost_card/cost-component';
import { LoaderComponent } from './components/loader/loader-component';
import { NavbarComponent } from './components/navbar/navbar-component';
import { SidebarComponent } from './components/sidebar/sidebar-component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error-interceptor';
import { EC2Component } from './pages/aws/ec2-component';
import { ResumeEC2Component } from './pages/aws/resume-component';
import { StopEC2Component } from './pages/aws/stop-component';
import { TerminateEC2Component } from './pages/aws/terminate-component';
import { DashboardComponent } from './pages/dashboard/dashboard-component';
import { DOComponent } from './pages/digital_ocean/droplet-component';
import { UpcloudComponent } from './pages/upcloud/upcloud-component';



/* Configure Amplify resources */
Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    EC2Component,
    StopEC2Component,
    TerminateEC2Component,
    ResumeEC2Component,
    CostComponent,
    LoaderComponent,
    DOComponent,
    UpcloudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AmplifyUIAngularModule,
    ReactiveFormsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptor, 
    multi: true
    },
    {
    provide: HTTP_INTERCEPTORS, 
    useClass: HttpErrorInterceptor, 
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
