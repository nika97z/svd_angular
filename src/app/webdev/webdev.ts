import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Atom } from '../atom/atom';
import { Footer } from '../footer/footer';


@Component({
  selector: 'app-webdev',
  imports: [RouterLink, Atom, Footer],
  templateUrl: './webdev.html',
  styleUrl: './webdev.scss',
})
export class Webdev {
  isMenuOpen = signal(false);
  expandedServices = signal<Record<number, boolean>>({});

  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }

  toggleService(index: number): void {
    this.expandedServices.update(services => {
      const isCurrentOpen = services[index];
      const newServices: Record<number, boolean> = {};
      
      if (!isCurrentOpen) {
        newServices[index] = true;
      }
      
      return newServices;
    });
  }

  isServiceExpanded(index: number): boolean {
    return this.expandedServices()[index] || false;
  }
}
