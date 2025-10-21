// Mobile detection and performance utilities

export const isMobile = () => {
  if (typeof window === 'undefined') return false
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768
}

export const isLowEndDevice = () => {
  if (typeof window === 'undefined') return false
  
  // Check for low-end mobile devices
  const isMobileDevice = isMobile()
  const cores = navigator.hardwareConcurrency || 2
  const memory = navigator.deviceMemory || 4
  
  return isMobileDevice && (cores <= 4 || memory <= 4)
}

export const getPerformanceConfig = () => {
  const mobile = isMobile()
  const lowEnd = isLowEndDevice()
  
  if (lowEnd) {
    return {
      // Ultra-low settings for weak devices
      particleCount: 20,
      sparklesCount: 10,
      starsCount: 100,
      shadowsEnabled: false,
      antialiasEnabled: false,
      pixelRatio: 1,
      maxLights: 2,
      enablePostProcessing: false,
      enableAnimations: 'simple', // 'simple', 'full', 'none'
    }
  }
  
  if (mobile) {
    return {
      // Medium settings for mobile
      particleCount: 50,
      sparklesCount: 20,
      starsCount: 300,
      shadowsEnabled: false,
      antialiasEnabled: true,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
      maxLights: 3,
      enablePostProcessing: false,
      enableAnimations: 'simple',
    }
  }
  
  return {
    // Full settings for desktop
    particleCount: 150,
    sparklesCount: 50,
    starsCount: 1000,
    shadowsEnabled: true,
    antialiasEnabled: true,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
    maxLights: 10,
    enablePostProcessing: true,
    enableAnimations: 'full',
  }
}

export const getCanvasSettings = () => {
  const config = getPerformanceConfig()
  
  return {
    dpr: config.pixelRatio,
    antialias: config.antialiasEnabled,
    powerPreference: isMobile() ? 'low-power' : 'high-performance',
    alpha: false, // Opaque background for better performance
    stencil: false, // Disable if not using stencil effects
    depth: true,
  }
}

// FPS monitoring
export class PerformanceMonitor {
  constructor() {
    this.frames = []
    this.lastTime = performance.now()
  }
  
  update() {
    const now = performance.now()
    const delta = now - this.lastTime
    this.lastTime = now
    
    this.frames.push(1000 / delta)
    if (this.frames.length > 60) {
      this.frames.shift()
    }
  }
  
  getAverageFPS() {
    if (this.frames.length === 0) return 60
    const sum = this.frames.reduce((a, b) => a + b, 0)
    return Math.round(sum / this.frames.length)
  }
  
  isPerformancePoor() {
    return this.getAverageFPS() < 30
  }
}

export const performanceMonitor = new PerformanceMonitor()
