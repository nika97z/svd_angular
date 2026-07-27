import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  imports: [RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  isMenuOpen = signal(false);
  expandedServices = signal<Record<number, boolean>>({});
  submitStatus = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

  constructor(private http: HttpClient) {}

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

  onSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const values = Object.fromEntries(new FormData(form).entries());

    this.submitStatus.set('sending');
    this.http.post('/api/contact', values).subscribe({
      next: () => {
        this.submitStatus.set('success');
        form.reset();
      },
      error: () => this.submitStatus.set('error'),
    });
  }
}
