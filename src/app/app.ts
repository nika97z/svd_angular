import { Component, afterNextRender, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('svd_angular');

  constructor() {
    afterNextRender(() => {
      const loader = document.getElementById('app-loader');
      if (!loader) return;

      loader.classList.add('app-loader--hidden');
      loader.addEventListener('transitionend', () => loader.remove(), { once: true });
    });
  }
}
