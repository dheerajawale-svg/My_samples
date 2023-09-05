import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from "@angular/material/datepicker";
import {  MatDialogModule } from "@angular/material/dialog";
import {  MatInputModule } from "@angular/material/input";
import {  MatListModule } from "@angular/material/list";
import {  MatPaginatorModule } from "@angular/material/paginator";
import {  MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {  MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import {  MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import {MatGridListModule } from '@angular/material/grid-list';
import {MatTreeModule } from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeSwitchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatTreeModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }