import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { DialogComponent } from './components/dialog/dialog.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { EntityDataModule, DefaultDataServiceConfig } from '@ngrx/data';
import { defaultDataServiceConfig, entityConfig } from './data/entity-metadata';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TodoDataService } from './data/todo-data.service';

const MaterialModules = [
  BrowserAnimationsModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule
];

const Components = [
  AppComponent,
  ToolbarComponent,
  TodoListComponent,
  DialogComponent
];

const StoreModules = [
  StoreModule.forRoot({}, {}),
  EffectsModule.forRoot([]),
  EntityDataModule.forRoot(entityConfig),
  StoreDevtoolsModule.instrument()
];

@NgModule({
  declarations: [
    Components
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModules,
    StoreModules
  ],
  providers: [
    TodoDataService,
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
