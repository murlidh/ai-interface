import { Component } from '@angular/core';
import { ModelService } from '../services/model.service';

@Component({
  selector: 'app-chat-output',
  templateUrl: './chat-output.component.html',
  styleUrls: ['./chat-output.component.css']
})
export class ChatOutputComponent {
  response = '';

  constructor(private state: ModelService) {
    this.state.response$.subscribe(r => this.response = r);
  }

  copy() {
    if (!this.response) return;
    navigator.clipboard.writeText(this.response);
  }

  download() {
    if (!this.response) return;
    const blob = new Blob([JSON.stringify({ response: this.response }, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'response.json'; a.click();
    URL.revokeObjectURL(url);
  }

  clear() { this.state.clearResponse(); }
}
