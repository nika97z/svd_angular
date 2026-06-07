import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Aichatbot } from "../aichatbot/aichatbot";


@Component({
  selector: 'app-webdev',
  imports: [RouterLink, Aichatbot],
  templateUrl: './webdev.html',
  styleUrl: './webdev.scss',
})
export class Webdev {
  isMenuOpen = signal(false);
  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }
}
