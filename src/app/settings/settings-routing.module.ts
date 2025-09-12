import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountInfoComponent } from './account-info/account-info.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from '../auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'account-info', pathMatch: 'full' },
  { path: 'account-info', component: AccountInfoComponent },
  { path: 'profile', component: ProfileComponent , canActivate : [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}