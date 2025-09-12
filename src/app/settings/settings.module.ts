import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AccountInfoComponent } from './account-info/account-info.component';

import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ProfileComponent,
    AccountInfoComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
   FormsModule
  ]
})
export class SettingsModule { }
