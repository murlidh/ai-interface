import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';

export interface AiModel { id: string; name: string; description: string; }
export interface PromptTemplate { id: number; title: string; content: string; }

@Injectable({ providedIn: 'root' })
export class ModelService {
  // data
  private modelsSubject    = new BehaviorSubject<AiModel[]>([]);
  private templatesSubject = new BehaviorSubject<PromptTemplate[]>([]);
  models$    = this.modelsSubject.asObservable();
  templates$ = this.templatesSubject.asObservable();

  // shared UI state
  private selectedModelIdSubject = new BehaviorSubject<string>('gpt-3.5');
  private temperatureSubject     = new BehaviorSubject<number>(0.7);
  private maxTokensSubject       = new BehaviorSubject<number>(256);
  private promptSubject          = new BehaviorSubject<string>('');
  private responseSubject        = new BehaviorSubject<string>('');

  selectedModelId$ = this.selectedModelIdSubject.asObservable();
  temperature$     = this.temperatureSubject.asObservable();
  maxTokens$       = this.maxTokensSubject.asObservable();
  prompt$          = this.promptSubject.asObservable();
  response$        = this.responseSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadModels();
    this.loadTemplates();
  }

  loadModels() {
    this.http.get<AiModel[]>('assets/models.json').subscribe(list => {
      this.modelsSubject.next(list);
      // Ensure selected model exists
      const current = this.selectedModelIdSubject.value;
      if (!list.find(m => m.id === current) && list.length) {
        this.selectedModelIdSubject.next(list[0].id);
      }
    });
  }

  loadTemplates() {
    this.http.get<PromptTemplate[]>('assets/templates.json')
      .subscribe(list => this.templatesSubject.next(list));
  }

  // setters
  setSelectedModelId(id: string) { this.selectedModelIdSubject.next(id); }
  setTemperature(v: number)      { this.temperatureSubject.next(v); }
  setMaxTokens(v: number)        { this.maxTokensSubject.next(v); }
  setPrompt(text: string)        { this.promptSubject.next(text); }

  get selectedModel$() {
    return this.models$.pipe(
      map(list => list.find(m => m.id === this.selectedModelIdSubject.value) || null)
    );
  }

  // Mock "generate" – create a pretend response for the prototype
  generateMockResponse() {
    const modelId = this.selectedModelIdSubject.value;
    const temp    = this.temperatureSubject.value.toFixed(1);
    const tokens  = this.maxTokensSubject.value;
    const prompt  = this.promptSubject.value.trim() || '(empty prompt)';

    const msg =
`[${new Date().toLocaleTimeString()}] Using ${modelId} (temp=${temp}, maxTokens=${tokens})
Prompt:
${prompt}`;

    this.responseSubject.next(msg);
  }

  clearResponse() { this.responseSubject.next(''); }
}
