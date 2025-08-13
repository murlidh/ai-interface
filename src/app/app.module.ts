import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModelSelectorComponent } from './model-selector/model-selector.component';
import { PromptEditorComponent } from './prompt-editor/prompt-editor.component';
import { ParametersPanelComponent } from './parameters-panel/parameters-panel.component';
import { ChatOutputComponent } from './chat-output/chat-output.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ModelSelectorComponent,
    PromptEditorComponent,
    ParametersPanelComponent,
    ChatOutputComponent,
    ThemeToggleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
