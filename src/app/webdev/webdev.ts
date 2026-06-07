import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Atom } from '../atom/atom';


@Component({
  selector: 'app-webdev',
  imports: [RouterLink, Atom],
  templateUrl: './webdev.html',
  styleUrl: './webdev.scss',
})
export class Webdev {
  isMenuOpen = signal(false);
  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }
}
