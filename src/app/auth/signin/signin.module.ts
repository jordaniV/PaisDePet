import { NgModule } from '@angular/core';

import { SigninPageRoutingModule } from './signin-routing.module';
import { SigninPage } from './signin.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    SigninPageRoutingModule
  ],
  declarations: [SigninPage]
})
export class SigninPageModule {}
