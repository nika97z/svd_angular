import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

@Component({
  selector: 'app-work-proces',
  imports: [],
  templateUrl: './work-proces.html',
  styleUrl: './work-proces.scss',
})
export class WorkProces implements AfterViewInit, OnDestroy {
  @ViewChild('c') private canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private rafId: number | null = null;

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    await this.initGlobe();
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }

  private async initGlobe(): Promise<void> {
    const canvas = this.canvasRef.nativeElement;
    const SIZE   = Math.min(window.innerWidth, window.innerHeight) * 0.40;
    const dpr    = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width  = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width  = SIZE + 'px';
    canvas.style.height = SIZE + 'px';

    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    const R = SIZE / 2;
    const projection = d3.geoOrthographic()
      .scale(R)
      .translate([R, R])
      .clipAngle(90);

    const path      = d3.geoPath(projection, ctx);
    const graticule = d3.geoGraticule().step([15, 15])();
    const sphere    = { type: 'Sphere' } as const;

    const world = await d3.json<any>('https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json');
    const land  = topojson.feature(world, world.objects.land);

    const OFF    = 800;
    const offC   = document.createElement('canvas');
    offC.width   = offC.height = OFF;
    const offCtx = offC.getContext('2d')!;

    const eqProj = d3.geoEquirectangular()
      .scale(OFF / Math.PI / 2)
      .translate([OFF / 2, OFF / 2]);
    const eqPath = d3.geoPath(eqProj, offCtx);
    offCtx.fillStyle = '#fff';
    eqPath(land);
    offCtx.fill();
    const imgData = offCtx.getImageData(0, 0, OFF, OFF).data;

    const isLand = (lon: number, lat: number): boolean => {
      const projected = eqProj([lon, lat]);
      if (!projected) return false;
      const x = Math.round(projected[0]);
      const y = Math.round(projected[1]);
      if (x < 0 || x >= OFF || y < 0 || y >= OFF) return false;
      return imgData[(y * OFF + x) * 4 + 3] > 128;
    };

    const N      = 35000;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const coords: [number, number][] = [];
    for (let i = 0; i < N; i++) {
      const y   = 1 - (i / (N - 1)) * 2;
      const r   = Math.sqrt(1 - y * y);
      const t   = golden * i;
      const lon = Math.atan2(Math.sin(t) * r, Math.cos(t) * r) * 180 / Math.PI;
      const lat = Math.asin(y) * 180 / Math.PI;
      if (isLand(lon, lat)) coords.push([lon, lat]);
    }

    const dots = { type: 'MultiPoint' as const, coordinates: coords };

    let lambda = 0, phi = 10;
    let dragging = false, prevX = 0, prevY = 0;
    let lastTime: number | null = null;

    const render = (ts: number): void => {
      if (!lastTime) lastTime = ts;
      const dt = ts - lastTime;
      lastTime  = ts;

      if (!dragging) lambda += dt * 0.013;
      projection.rotate([lambda, -phi]);

      ctx.clearRect(0, 0, SIZE, SIZE);

      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.lineWidth   = 0.7;
      ctx.stroke();

      ctx.beginPath();
      path(sphere);
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth   = 1;
      ctx.stroke();

      ctx.beginPath();
      path.pointRadius(0.9)(dots);
      ctx.fillStyle = '#fff';
      ctx.fill();

      this.rafId = requestAnimationFrame(render);
    };

    canvas.addEventListener('pointerdown', (e: PointerEvent) => {
      dragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    canvas.addEventListener('pointerup', () => { dragging = false; });
    canvas.addEventListener('pointermove', (e: PointerEvent) => {
      if (!dragging) return;
      lambda += (e.clientX - prevX) * 0.3;
      phi    += (e.clientY - prevY) * 0.3;
      phi     = Math.max(-85, Math.min(85, phi));
      prevX = e.clientX;
      prevY = e.clientY;
    });

    this.rafId = requestAnimationFrame(render);
    setTimeout(() => canvas.classList.add('on'), 100);
  }
}
