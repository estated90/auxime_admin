import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalSearchPortePage } from './modal-search-porte.page';

const routes: Routes = [
  {
    path: '',
    component: ModalSearchPortePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalSearchPortePage]
})
export class ModalSearchPortePageModule {}
