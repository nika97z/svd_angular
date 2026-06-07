import { Component, ElementRef, OnDestroy, ViewChild, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-aichatbot',
  imports: [],
  standalone: true,
  template: '<canvas #canvas style="width:100%;height:100%;display:block;"></canvas>',
  styleUrl: './aichatbot.scss',
})
export class Aichatbot implements AfterViewInit, OnDestroy {
    // Get a reference to the canvas element in the template using #canvas
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  // Store the Three.js renderer so we can dispose it later
  private renderer!: THREE.WebGLRenderer;

  // Store the animation frame ID so we can cancel it on destroy
  private animId!: number;

  // Mouse control properties
  private isDragging = false;
  private previousMousePosition = { x: 0, y: 0 };
  private rotation = { x: 0, y: 0 };
  private scene!: THREE.Scene;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // Only run on browser, not on server
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Get the actual DOM canvas element from the ViewChild reference
    const canvas = this.canvasRef.nativeElement;

    // Read the canvas width in pixels (matches CSS size)
    const w = canvas.clientWidth;

    // Read the canvas height in pixels
    const h = canvas.clientHeight;

    // Create a Three.js scene — this is the container for all 3D objects
    this.scene = new THREE.Scene();

    // Create a perspective camera: 60° field of view, aspect ratio w/h, near=0.1, far=100
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);

    // Move the camera back and slightly up so we look down at the scene
    camera.position.set(0, 3, 8);

    // Point the camera at the center of the scene (0,0,0)
    camera.lookAt(0, 0, 0);

    // Create the WebGL renderer, attach it to our canvas, enable smooth edges (antialias)
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

    // Set the renderer output size to match the canvas — false = don't set CSS size
    this.renderer.setSize(w, h, false);

    // Use the screen's pixel ratio for sharp rendering on retina/HiDPI displays
    this.renderer.setPixelRatio(window.devicePixelRatio);

    

    // Create a blue point light (like a light bulb) with intensity 2 and range 20
    const pt = new THREE.PointLight(0x6699ff, 2, 20);

    // Position the blue light at top-right-front of the scene
    pt.position.set(3, 4, 3);

    // Add the blue point light to the scene
    this.scene.add(pt);

    // Create a pink/red point light for a secondary fill from the opposite side
    const pt2 = new THREE.PointLight(0xff4466, 1.5, 20);

    // Position it at bottom-left-back to create contrast and depth
    pt2.position.set(-4, -2, 2);

    // Add the pink light to the scene
    this.scene.add(pt2);

    // Create the geometry for the core sphere — radius 1, with 64 segments for smoothness
    const coreGeo = new THREE.SphereGeometry(0.35, 64, 64);

    // Create a physically-based material: blue color, slightly shiny and metallic
    const coreMat = new THREE.MeshStandardMaterial({ color: 0x4477ff, roughness: 0.2, metalness: 0.6 });

    // Combine geometry + material into a mesh (the actual visible 3D object)
    const core = new THREE.Mesh(coreGeo, coreMat);

    // Add the core sphere to the scene so it gets rendered
    this.scene.add(core);

    // Define how far the orbiting moon is from the center
    const ORBIT_RADIUS = 4.3;

    // Define the tilt angle of the orbit ring in radians (30 degrees)
    const TILT = Math.PI / 6;

    // Create a torus (ring/donut shape) geometry: radius=ORBIT_RADIUS, tube thickness=0.012
    const ringGeo = new THREE.TorusGeometry(ORBIT_RADIUS, 0.002, 8, 80);

    // Create a cyan material for the ring with high visibility
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.6 });

    // Combine ring geometry and material into a mesh
    const ring = new THREE.Mesh(ringGeo, ringMat);

    // Rotate the ring 90° on X axis so it lies flat (horizontal) like Saturn's rings
    ring.rotation.x = Math.PI / 2;

    // Apply the tilt on Y axis so the orbit is angled, not perfectly flat
    ring.rotation.y = TILT;

    // Add the ring directly to the scene — it never moves, it stays fixed forever
    this.scene.add(ring);

    // Create a second ring with larger radius and different color
    const ring2Geo = new THREE.TorusGeometry(ORBIT_RADIUS, 0.002, 8, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 2;
    ring2.rotation.y = TILT + Math.PI / 4;
    this.scene.add(ring2);

    // Create a third ring with even larger radius and different color
    const ring3Geo = new THREE.TorusGeometry(ORBIT_RADIUS, 0.002, 8, 80);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.4 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = Math.PI / 2;
    ring3.rotation.y = TILT - Math.PI / 3;
    this.scene.add(ring3);

    // Create the small moon sphere geometry — radius 0.25, smooth with 32 segments
    const moonGeo = new THREE.SphereGeometry(0.05, 32, 32);

    // Red material for the moon, slightly shiny and metallic
    const moonMat = new THREE.MeshStandardMaterial({ color: 0xff5544, roughness: 0.3, metalness: 0.4 });

    // Combine into a mesh — the moving moon object
    const moon = new THREE.Mesh(moonGeo, moonMat);

    // Add the moon to the scene — its position will be updated every frame
    this.scene.add(moon);

    // Create second moon for ring 2 (magenta ring, larger orbit)
    const moon2Geo = new THREE.SphereGeometry(0.05, 32, 32);
    const moon2Mat = new THREE.MeshStandardMaterial({ color: 0x00ffff, roughness: 0.3, metalness: 0.4 });
    const moon2 = new THREE.Mesh(moon2Geo, moon2Mat);
    this.scene.add(moon2);

    // Create third moon for ring 3 (green ring, largest orbit)
    const moon3Geo = new THREE.SphereGeometry(0.05, 32, 32);
    const moon3Mat = new THREE.MeshStandardMaterial({ color: 0xffdd00, roughness: 0.3, metalness: 0.4 });
    const moon3 = new THREE.Mesh(moon3Geo, moon3Mat);
    this.scene.add(moon3);

    // angle tracks how far around the orbit the moon has travelled (in radians)
    let angle = 0;
    let angle2 = Math.PI * 1.2; // Different starting angle for moon2
    let angle3 = Math.PI * 0.5; // Different starting angle for moon3

    // Setup mouse event listeners for drag rotation
    canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
    canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
    canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
    canvas.addEventListener('mouseleave', (e) => this.onMouseUp(e));

    // Define the animate function — called ~60 times per second by the browser
    const animate = () => {

      // Schedule the next frame — this creates the animation loop
      this.animId = requestAnimationFrame(animate);

      // Apply mouse-controlled rotation to the scene
      this.scene.rotation.y += this.rotation.y;
      this.scene.rotation.x += this.rotation.x;
      this.rotation.x *= 0.95;
      this.rotation.y *= 0.95;

      // Slowly rotate the core sphere on its Y axis (self-spin)
      core.rotation.y += 0.003;

      // Advance the moon's angle a little each frame to move it forward in the orbit
      angle += 0.01;
      angle2 += 0.008;
      angle3 += 0.012;

      // Calculate moon 1 X position: cosine gives horizontal position, scaled by tilt
      moon.position.x = Math.cos(angle) * ORBIT_RADIUS * Math.cos(TILT);

      // Calculate moon 1 Z position: sine gives depth position along the orbit
      moon.position.z = Math.sin(angle) * ORBIT_RADIUS;

      // Calculate moon 1 Y position: cosine again but scaled by tilt to follow the tilted ring
      moon.position.y = Math.cos(angle) * ORBIT_RADIUS * Math.sin(TILT);

      // Spin the moon on its own Y axis (self-rotation, like Earth spinning while orbiting)
      moon.rotation.y += 0.04;

      // Calculate moon 2 position for ring 2 (same radius as ring2, different tilt)
      const ORBIT_RADIUS2 = ORBIT_RADIUS;
      const TILT2 = Math.PI / 6 + Math.PI / 4;
      moon2.position.x = Math.cos(angle2) * ORBIT_RADIUS2 * Math.cos(TILT2);
      moon2.position.z = Math.sin(angle2) * ORBIT_RADIUS2;
      moon2.position.y = Math.cos(angle2) * ORBIT_RADIUS2 * Math.sin(TILT2);
      moon2.rotation.y += 0.035;

      // Calculate moon 3 position for ring 3 (same radius as ring3, different tilt)
      const ORBIT_RADIUS3 = ORBIT_RADIUS;
      const TILT3 = Math.PI / 6 - Math.PI / 3;
      moon3.position.x = Math.cos(angle3) * ORBIT_RADIUS3 * Math.cos(TILT3);
      moon3.position.z = Math.sin(angle3) * ORBIT_RADIUS3;
      moon3.position.y = Math.cos(angle3) * ORBIT_RADIUS3 * Math.sin(TILT3);
      moon3.rotation.y += 0.03;

      // Render the current frame: draw everything in the scene from the camera's view
      this.renderer.render(this.scene, camera);
    };

    // Start the animation loop for the first time
    animate();
  }

  // Handle mouse down event — start tracking mouse position
  private onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.previousMousePosition = { x: event.clientX, y: event.clientY };
  }

  // Handle mouse move event — calculate rotation based on mouse delta
  private onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    const deltaX = event.clientX - this.previousMousePosition.x;
    const deltaY = event.clientY - this.previousMousePosition.y;

    // Rotate based on mouse movement: Y axis rotation from horizontal movement
    this.rotation.y = deltaX * 0.01;

    // X axis rotation from vertical movement
    this.rotation.x = deltaY * 0.01;

    this.previousMousePosition = { x: event.clientX, y: event.clientY };
  }

  // Handle mouse up event — stop dragging
  private onMouseUp(event: MouseEvent) {
    this.isDragging = false;
  }

  // ngOnDestroy runs when the component is removed from the page
  ngOnDestroy() {
    // Only cleanup on browser, not on server
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Stop the animation loop to prevent it running in the background
    cancelAnimationFrame(this.animId);

    // Free GPU memory used by the renderer — important to avoid memory leaks
    this.renderer?.dispose();
  }
}
