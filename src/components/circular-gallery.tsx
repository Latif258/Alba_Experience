"use client"

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';

import './circular-gallery.css';

type GL = Renderer['gl'];

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
    let timeout: number;
    return function (this: any, ...args: Parameters<T>) {
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => func.apply(this, args), wait);
    };
}

function lerp(p1: number, p2: number, t: number): number {
    return p1 + (p2 - p1) * t;
}

function autoBind(instance: any): void {
    const proto = Object.getPrototypeOf(instance);
    Object.getOwnPropertyNames(proto).forEach(key => {
        if (key !== 'constructor' && typeof instance[key] === 'function') {
            instance[key] = instance[key].bind(instance);
        }
    });
}

interface ScreenSize {
    width: number;
    height: number;
}

interface Viewport {
    width: number;
    height: number;
}

interface MediaProps {
    geometry: Plane;
    gl: GL;
    image: string;
    index: number;
    length: number;
    renderer: Renderer;
    scene: Transform;
    screen: ScreenSize;
    text: string;
    viewport: Viewport;
    bend: number;
    textColor: string;
    borderRadius?: number;
    font?: string;
}

class Media {
    extra: number = 0;
    geometry: Plane;
    gl: GL;
    image: string;
    index: number;
    length: number;
    renderer: Renderer;
    scene: Transform;
    screen: ScreenSize;
    text: string;
    viewport: Viewport;
    bend: number;
    textColor: string;
    borderRadius: number;
    font?: string;
    program!: Program;
    plane!: Mesh;
    scale!: number;
    padding!: number;
    width!: number;
    widthTotal!: number;
    x!: number;
    speed: number = 0;
    isBefore: boolean = false;
    isAfter: boolean = false;

    constructor({
        geometry,
        gl,
        image,
        index,
        length,
        renderer,
        scene,
        screen,
        text,
        viewport,
        bend,
        textColor,
        borderRadius = 0,
        font
    }: MediaProps) {
        this.geometry = geometry;
        this.gl = gl;
        this.image = image;
        this.index = index;
        this.length = length;
        this.renderer = renderer;
        this.scene = scene;
        this.screen = screen;
        this.text = text;
        this.viewport = viewport;
        this.bend = bend;
        this.textColor = textColor;
        this.borderRadius = borderRadius;
        this.font = font;
        this.createShader();
        this.createMesh();
        this.onResize();
    }

    createShader() {
        const texture = new Texture(this.gl, {
            generateMipmaps: true,
            minFilter: this.gl.LINEAR_MIPMAP_LINEAR,
            magFilter: this.gl.LINEAR,
            wrapS: this.gl.CLAMP_TO_EDGE,
            wrapT: this.gl.CLAMP_TO_EDGE
        });

        this.program = new Program(this.gl, {
            depthTest: false,
            depthWrite: false,
            vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
            uniforms: {
                tMap: { value: texture },
                uPlaneSizes: { value: [0, 0] },
                uImageSizes: { value: [0, 0] },
                uBorderRadius: { value: this.borderRadius }
            },
            transparent: true
        });

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = this.image;
        img.onload = () => {
            // High-Resolution Composite Logic
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { alpha: false }); // Performance boost
            if (!ctx) return;

            // Use a high-density 2K base for the labels
            canvas.width = 1536 * dpr;
            canvas.height = 2048 * dpr;

            // 1. Draw Original Image (Cover Mode)
            const imgAspect = img.naturalWidth / img.naturalHeight;
            const canvasAspect = canvas.width / canvas.height;
            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgAspect > canvasAspect) {
                drawHeight = canvas.height;
                drawWidth = canvas.height * imgAspect;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgAspect;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            }

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

            // 2. Subtle Diffused Shadow (Blur Alternative for Canvas)
            const overlayHeight = canvas.height * 0.2;
            const textY = canvas.height - (overlayHeight * 0.5);

            // Create a localized "vignette" or blur shadow behind text
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, textY, 0,
                canvas.width / 2, textY, canvas.width * 0.4
            );
            gradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
            gradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.3)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, canvas.height - overlayHeight * 1.5, canvas.width, overlayHeight * 1.5);

            // 3. Draw Couple Name + Redirect Icon (More Elegant Scale)
            const upperText = this.text.toUpperCase();
            const fontSize = Math.floor(canvas.width * 0.052); // Refined scale
            ctx.font = `900 ${fontSize}px Inter, Figtree, sans-serif`;
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.letterSpacing = '4px';

            // Softer "Halo" Glow
            ctx.shadowColor = 'rgba(255, 157, 77, 0.4)';
            ctx.shadowBlur = 10;

            // Measure text to position icon
            const textMetrics = ctx.measureText(upperText);
            const textWidth = textMetrics.width;

            ctx.fillText(upperText, canvas.width / 2, textY);

            // 4. Draw Redirect Icon (Arrow)
            const iconSize = fontSize * 0.7;
            const iconX = (canvas.width / 2) + (textWidth / 2) + (iconSize * 0.8);
            const iconY = textY;

            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = '#ffffff';
            ctx.beginPath();

            // Draw a minimal "external link" arrow
            ctx.moveTo(iconX - iconSize / 2, iconY + iconSize / 2);
            ctx.lineTo(iconX + iconSize / 2, iconY - iconSize / 2);
            ctx.moveTo(iconX - iconSize / 4, iconY - iconSize / 2);
            ctx.lineTo(iconX + iconSize / 2, iconY - iconSize / 2);
            ctx.lineTo(iconX + iconSize / 2, iconY + iconSize / 4);
            ctx.stroke();

            texture.image = canvas;
            this.program.uniforms.uImageSizes.value = [canvas.width, canvas.height];
        };
    }

    createMesh() {
        this.plane = new Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program
        });
        this.plane.setParent(this.scene);
    }

    update(scroll: { current: number; last: number }, direction: 'right' | 'left') {
        this.plane.position.x = this.x - scroll.current - this.extra;

        const x = this.plane.position.x;
        const H = this.viewport.width / 2;

        if (this.bend === 0) {
            this.plane.position.y = 0;
            this.plane.rotation.z = 0;
        } else {
            const B_abs = Math.abs(this.bend);
            const R = (H * H + B_abs * B_abs) / (2 * B_abs);
            const effectiveX = Math.min(Math.abs(x), H);

            const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
            if (this.bend > 0) {
                this.plane.position.y = -arc;
                this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
            } else {
                this.plane.position.y = arc;
                this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
            }
        }

        this.speed = scroll.current - scroll.last;

        const planeOffset = (this.plane.scale.x / 2) + this.padding / 2;
        const viewportOffset = this.viewport.width / 2;

        this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
        this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

        if (direction === 'right' && this.isBefore) {
            this.extra -= this.widthTotal;
            this.isBefore = this.isAfter = false;
        }
        if (direction === 'left' && this.isAfter) {
            this.extra += this.widthTotal;
            this.isBefore = this.isAfter = false;
        }
    }

    onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: Viewport } = {}) {
        if (screen) this.screen = screen;
        if (viewport) {
            this.viewport = viewport;
            if (this.plane.program.uniforms.uViewportSizes) {
                this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
            }
        }

        this.scale = this.screen.width < 768 ? this.screen.height / 1400 : this.screen.height / 1200;
        this.plane.scale.y = (this.viewport.height * (750 * this.scale)) / this.screen.height;
        this.plane.scale.x = (this.viewport.width * (550 * this.scale)) / this.screen.width;

        this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
        this.padding = this.screen.width < 768 ? 1.5 : 3;
        this.width = this.plane.scale.x + this.padding;
        this.widthTotal = this.width * this.length;
        this.x = this.width * this.index;
    }
}

interface AppConfig {
    items?: { image: string; text: string; link?: string }[];
    bend?: number;
    textColor?: string;
    borderRadius?: number;
    font?: string;
    scrollSpeed?: number;
    scrollEase?: number;
}

class App {
    container: HTMLElement;
    scrollSpeed: number;
    items: { image: string; text: string; link?: string }[];
    scroll: {
        ease: number;
        current: number;
        target: number;
        last: number;
        position?: number;
    };
    onCheckDebounce: (...args: any[]) => void;
    renderer!: Renderer;
    gl!: GL;
    camera!: Camera;
    scene!: Transform;
    planeGeometry!: Plane;
    medias: Media[] = [];
    mediasImages: { image: string; text: string; link?: string }[] = [];
    screen!: { width: number; height: number };
    viewport!: { width: number; height: number };
    raf: number = 0;

    boundOnResize!: () => void;
    boundOnWheel!: (e: Event) => void;
    boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
    boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
    boundOnTouchUp!: (e: MouseEvent | TouchEvent) => void;

    isDown: boolean = false;
    start: number = 0;

    constructor(
        container: HTMLElement,
        {
            items = [],
            bend = 1,
            textColor = '#ffffff',
            borderRadius = 0,
            font = '900 48px Inter, Figtree, sans-serif',
            scrollSpeed = 2,
            scrollEase = 0.05
        }: AppConfig
    ) {
        document.documentElement.classList.remove('no-js');
        this.container = container;
        this.items = items;
        this.scrollSpeed = scrollSpeed;
        this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
        this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.onResize();
        this.createGeometry();
        this.createMedias(items, bend, textColor, borderRadius, font);
        this.update();
        this.addEventListeners();
    }

    createRenderer() {
        this.renderer = new Renderer({
            alpha: true,
            antialias: true,
            dpr: Math.min(window.devicePixelRatio || 1, 2)
        });
        this.gl = this.renderer.gl;
        this.gl.clearColor(0, 0, 0, 0);
        this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
    }

    createCamera() {
        this.camera = new Camera(this.gl);
        this.camera.fov = 45;
        this.camera.position.z = 20;
    }

    createScene() {
        this.scene = new Transform();
    }

    createGeometry() {
        this.planeGeometry = new Plane(this.gl, {
            heightSegments: 50,
            widthSegments: 100
        });
    }

    createMedias(
        items: { image: string; text: string; link?: string }[],
        bend: number = 1,
        textColor: string,
        borderRadius: number,
        font: string
    ) {
        const galleryItems = items;
        this.mediasImages = galleryItems.concat(galleryItems); // Double for loop
        this.medias = this.mediasImages.map((data, index) => {
            return new Media({
                geometry: this.planeGeometry,
                gl: this.gl,
                image: data.image,
                index,
                length: this.mediasImages.length,
                renderer: this.renderer,
                scene: this.scene,
                screen: this.screen,
                text: data.text,
                viewport: this.viewport,
                bend,
                textColor,
                borderRadius,
                font
            });
        });
    }

    onTouchDown(e: MouseEvent | TouchEvent) {
        this.isDown = true;
        this.scroll.position = this.scroll.current;
        this.start = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    }

    onTouchMove(e: MouseEvent | TouchEvent) {
        if (!this.isDown) return;
        const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const distance = (this.start - x) * (this.scrollSpeed * 0.025);
        this.scroll.target = (this.scroll.position ?? 0) + distance;
    }

    onTouchUp(e: MouseEvent | TouchEvent) {
        this.isDown = false;
        this.onCheck();

        // Check for click interaction
        const endX = 'changedTouches' in (e as TouchEvent) ? (e as TouchEvent).changedTouches[0].clientX : (e as MouseEvent).clientX;
        if (Math.abs(this.start - endX) < 5) {
            this.handleItemClick(endX);
        }
    }

    handleItemClick(xCoord: number) {
        // Convert screen x to viewport x
        const rect = this.container.getBoundingClientRect();
        const normalizedX = ((xCoord - rect.left) / rect.width) * 2 - 1;
        const viewportX = (normalizedX * this.viewport.width) / 2;

        // Find closest media
        let closestMedia = null;
        let minDistance = Infinity;

        this.medias.forEach((media) => {
            const dist = Math.abs(media.plane.position.x - viewportX);
            if (dist < minDistance && dist < media.plane.scale.x / 2) {
                minDistance = dist;
                closestMedia = media;
            }
        });

        if (closestMedia) {
            const data = this.mediasImages[(closestMedia as Media).index];
            if (data.link) {
                window.open(data.link, '_blank');
            }
        }
    }

    onWheel(e: Event) {
        const wheelEvent = e as WheelEvent;
        const delta = wheelEvent.deltaY || (wheelEvent as any).wheelDelta || (wheelEvent as any).detail;
        this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.5;
        this.onCheckDebounce();
    }

    onCheck() {
        if (!this.medias || !this.medias[0]) return;
        const width = this.medias[0].width;
        const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
        const item = width * itemIndex;
        this.scroll.target = this.scroll.target < 0 ? -item : item;
    }

    onResize() {
        this.screen = {
            width: this.container.clientWidth,
            height: this.container.clientHeight
        };
        this.renderer.setSize(this.screen.width, this.screen.height);
        this.camera.perspective({
            aspect: this.screen.width / this.screen.height
        });
        const fov = (this.camera.fov * Math.PI) / 180;
        const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
        const width = height * this.camera.aspect;
        this.viewport = { width, height };
        if (this.medias) {
            this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
        }
    }

    update() {
        this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
        const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
        if (this.medias) {
            this.medias.forEach(media => media.update(this.scroll, direction));
        }
        this.renderer.render({ scene: this.scene, camera: this.camera });
        this.scroll.last = this.scroll.current;
        this.raf = window.requestAnimationFrame(this.update.bind(this));
    }

    addEventListeners() {
        this.boundOnResize = this.onResize.bind(this);
        this.boundOnWheel = this.onWheel.bind(this);
        this.boundOnTouchDown = this.onTouchDown.bind(this);
        this.boundOnTouchMove = this.onTouchMove.bind(this);
        this.boundOnTouchUp = this.onTouchUp.bind(this);
        window.addEventListener('resize', this.boundOnResize);
        window.addEventListener('mousewheel', this.boundOnWheel, { passive: false });
        window.addEventListener('wheel', this.boundOnWheel, { passive: false });
        this.container.addEventListener('mousedown', this.boundOnTouchDown);
        this.container.addEventListener('mousemove', this.boundOnTouchMove);
        window.addEventListener('mouseup', this.boundOnTouchUp);
        this.container.addEventListener('touchstart', this.boundOnTouchDown);
        this.container.addEventListener('touchmove', this.boundOnTouchMove);
        window.addEventListener('touchend', this.boundOnTouchUp);
    }

    destroy() {
        window.cancelAnimationFrame(this.raf);
        window.removeEventListener('resize', this.boundOnResize);
        window.removeEventListener('mousewheel', this.boundOnWheel);
        window.removeEventListener('wheel', this.boundOnWheel);
        this.container.removeEventListener('mousedown', this.boundOnTouchDown);
        this.container.removeEventListener('mousemove', this.boundOnTouchMove);
        window.removeEventListener('mouseup', this.boundOnTouchUp);
        this.container.removeEventListener('touchstart', this.boundOnTouchDown);
        this.container.removeEventListener('touchmove', this.boundOnTouchMove);
        window.removeEventListener('touchend', this.boundOnTouchUp);
        if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
            this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas as HTMLCanvasElement);
        }
    }
}

interface CircularGalleryProps {
    items?: { image: string; text: string; link?: string }[];
    bend?: number;
    textColor?: string;
    borderRadius?: number;
    font?: string;
    scrollSpeed?: number;
    scrollEase?: number;
}

export default function CircularGallery({
    items,
    bend = 3,
    textColor = '#ffffff',
    borderRadius = 0.05,
    font = 'bold 24px Figtree',
    scrollSpeed = 2,
    scrollEase = 0.05
}: CircularGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!containerRef.current) return;

        let app: App | null = null;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !app) {
                    app = new App(containerRef.current!, {
                        items,
                        bend,
                        textColor,
                        borderRadius,
                        font,
                        scrollSpeed,
                        scrollEase
                    });
                }
            });
        }, { rootMargin: '200px' }); // Start loading slightly before it's on screen

        observer.observe(containerRef.current);

        return () => {
            if (app) app.destroy();
            observer.disconnect();
        };
    }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);
    return <div className="circular-gallery" ref={containerRef} />;
}
