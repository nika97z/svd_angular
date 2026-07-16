import { Component, signal, input } from '@angular/core';
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
  mainTitle = input('Custom Websites That Drive Results');
  main21Line1 = input('WEBSITE');
  main21Line2 = input('DESIGN');
  main22Line1 = input('AND');
  main22Line2 = input('DEVELOPMENT');
  approachTitle = input('Our');
  approachSubtitle = input('Approach');
  approachSubtitle2 = input('and ');
  approachSubtitle3 = input('Work Specifics');
  approachDescription = input('At SVD Pixel, our approach to web development is centered around collaboration, innovation, and delivering exceptional results. We believe that every business is unique, and therefore, we take the time to understand our clients\'s specific needs and goals before embarking on any project. Our team of experienced developers works closely with clients to create custom solutions that are tailored to their brand identity and target audience.');
  



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

  onLinkMouseMove(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    target.style.setProperty('--x', `${x}%`);
    target.style.setProperty('--y', `${y}%`);
  }
}
