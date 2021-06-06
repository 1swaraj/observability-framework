import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EC2Component } from './pages/aws/ec2-component';
import { DashboardComponent } from './pages/dashboard/dashboard-component';
import { DOComponent } from './pages/digital_ocean/droplet-component';
import { UpcloudComponent } from './pages/upcloud/upcloud-component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'aws', component: EC2Component },
  { path: 'do', component: DOComponent },
  { path: 'upcloud', component: UpcloudComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
