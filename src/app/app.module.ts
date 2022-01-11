import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {TodoListComponent} from './modules/todo-list/todo-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {DataService} from "./core/services/data/data-provider.service.ts.service";
import {HttpClientModule} from "@angular/common/http";
import {NgxsModule} from "@ngxs/store";
import {TodosState} from "./core/state/todos/todos.state";
import {environment} from "../environments/environment";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";

@NgModule({
  declarations: [AppComponent, HeaderComponent, DashboardComponent, TodoListComponent],
  imports: [NgxsModule.forRoot([TodosState], {developmentMode: !environment.production}), BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientInMemoryWebApiModule.forRoot(DataService), HttpClientModule, NgxsReduxDevtoolsPluginModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {
}
