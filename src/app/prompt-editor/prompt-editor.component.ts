import { Component } from '@angular/core';
import { ModelService, PromptTemplate } from '../services/model.service';

@Component({
  selector: 'app-prompt-editor',
  templateUrl: './prompt-editor.component.html',
  styleUrls: ['./prompt-editor.component.css']
})
export class PromptEditorComponent {
  prompt = '';
  templates: PromptTemplate[] = [];
  selectedTemplateId: number | null = null;

  constructor(private state: ModelService) {
    this.state.prompt$.subscribe(p => this.prompt = p);
    this.state.templates$.subscribe(t => this.templates = t);
  }

  applyTemplate(id: string) {
    const t = this.templates.find(x => x.id === Number(id));
    if (t) {
      this.prompt = t.content;
      this.state.setPrompt(this.prompt);
    }
  }

  saveToLocal() {
    localStorage.setItem('savedPrompt', this.prompt);
  }

  loadFromLocal() {
    const p = localStorage.getItem('savedPrompt') || '';
    this.prompt = p;
    this.state.setPrompt(p);
  }

  onPromptChange(v: string) { this.state.setPrompt(v); }
  send() { this.state.generateMockResponse(); }
  clear() {
    this.prompt = '';
    this.state.setPrompt('');
  }
}
