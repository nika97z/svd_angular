import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, NgZone, OnDestroy, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';

@Component({
  selector: 'app-runnertext',
  imports: [],
  templateUrl: './runnertext.html',
  styleUrl: './runnertext.scss',
})
export class Runnertext implements OnInit, OnDestroy {
  @ViewChild('ticker', { static: true }) tickerEl!: ElementRef<HTMLElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private animId = 0;
  private pos = 0;
  private lastTime = 0;
  private paused = false;
  private halfWidth = 0;
  private readonly speed = 120; // px per second

  constructor(private zone: NgZone) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.zone.runOutsideAngular(() => {
      const el = this.tickerEl.nativeElement;
      this.halfWidth = el.scrollWidth / 2; // read once — never inside tick()
      el.addEventListener('mouseenter', () => (this.paused = true));
      el.addEventListener('mouseleave', () => (this.paused = false));
      this.animId = requestAnimationFrame(t => this.tick(t));
    });
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      cancelAnimationFrame(this.animId);
    }
  }

  private tick(time: number) {
    const delta = this.lastTime ? time - this.lastTime : 0;
    this.lastTime = time;

    if (!this.paused) {
      this.pos -= this.speed * delta / 1000;
      if (this.pos <= -this.halfWidth) this.pos += this.halfWidth;
      this.tickerEl.nativeElement.style.transform = `translate3d(${this.pos}px, 0, 0)`;
    }

    this.animId = requestAnimationFrame(t => this.tick(t));
  }
}
