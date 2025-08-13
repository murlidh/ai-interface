import { Component } from '@angular/core';
import { AiModel, ModelService } from '../services/model.service';

@Component({
  selector: 'app-model-selector',
  templateUrl: './model-selector.component.html',
  styleUrls: ['./model-selector.component.css']
})
export class ModelSelectorComponent {
  models: AiModel[] = [];
  selectedId = '';

  selectedModel: AiModel | null = null;

  constructor(private stateService: ModelService) {
    this.stateService.models$.subscribe((list: AiModel[]) => this.models = list);
    this.stateService.selectedModelId$.subscribe((id: string) => {
      this.selectedId = id;
      this.stateService.selectedModel$.subscribe((m: any) => this.selectedModel = m);
    });
  }

  onChange(id: string) { this.stateService.setSelectedModelId(id); }
}
