import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
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
