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
  approachDescription = input('At SVD Pixel, our approach to web development is built on collaboration, innovation, and delivering results that matter. Every business is different, so we take the time to understand your goals and audience before writing a single line of code. Our developers work closely with you to build custom, high-performing websites tailored to your brand.');

  serv1Title = input('Custom Web Development');
  serv1Desc = input('We build websites from scratch, tailored to your brand, your goals, and the way your customers actually browse. No bloated templates, no unnecessary plugins — just clean, fast code built to last.');
  serv2Title = input('Shopify & E-Commerce');
  serv2Desc = input('From product pages to checkout, we build online stores that are easy to manage and even easier to buy from, so every visit has a real chance of becoming a sale.');
  serv3Title = input('Mobile-First, Responsive Design');
  serv3Desc = input('Every site we build looks and works great on any screen size, because most of your visitors are on their phones before they ever touch a desktop.');
  serv4Title = input('SEO & Performance Optimization');
  serv4Desc = input('We optimize every page for speed and search from day one, so your site loads fast, ranks well, and doesn\'t lose visitors before they even see it.');
  serv5Title = input('Ongoing Support & Maintenance');
  serv5Desc = input('Launch day isn\'t the finish line. We stay on to handle updates, fixes, and improvements, so your site keeps running smoothly long after it goes live.');



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
