import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent {
  current: 'light' | 'dark' = 'light';
  constructor(private theme: ThemeService) {
    this.theme.theme$.subscribe((t: 'light' | 'dark') => this.current = t);
  }
  toggle() { this.theme.toggleTheme(); }
}
