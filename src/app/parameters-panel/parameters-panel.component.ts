import { Component } from '@angular/core';
import { ModelService } from '../services/model.service';

@Component({
  selector: 'app-parameters-panel',
  templateUrl: './parameters-panel.component.html',
  styleUrls: ['./parameters-panel.component.css']
})
export class ParametersPanelComponent {
  temperature = 0.7;
  maxTokens  = 256;

  constructor(private state: ModelService) {
    this.state.temperature$.subscribe(v => this.temperature = v);
    this.state.maxTokens$.subscribe(v => this.maxTokens = v);
  }

  onTemp(v: string | number)  { this.state.setTemperature(Number(v)); }
  onTokens(v: string | number){ this.state.setMaxTokens(Number(v)); }
}
