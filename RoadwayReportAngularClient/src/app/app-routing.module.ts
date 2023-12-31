import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportPotholeDialogComponent } from './components/report-pothole-dialog/report-pothole-dialog.component';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { AdminConsoleComponent } from './components/admin-console/admin-console.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'report', component: ReportPotholeDialogComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-console', component: AdminConsoleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
