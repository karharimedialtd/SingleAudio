// Frontend configuration - no sensitive backend data
export const config = {
  app: {
    name: "Single Audio",
    version: "1.0.0",
    description: "Music Distribution & CMS Platform",
  },
  features: {
    aiTools: true,
    bulkUpload: true,
    youtubeCMS: true,
    analytics: true,
  },
  limits: {
    maxFileSize: 100 * 1024 * 1024, // 100MB
    maxFiles: 50,
    supportedAudioFormats: [".mp3", ".wav", ".flac", ".aac", ".ogg"],
    supportedImageFormats: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
  },
  ui: {
    theme: "dark",
    animations: true,
    notifications: true,
  },
}

// Mock API endpoints for frontend demo
export const apiEndpoints = {
  auth: {
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    refresh: "/api/auth/refresh",
  },
  music: {
    releases: "/api/music/releases",
    upload: "/api/music/upload",
    catalog: "/api/music/catalog",
  },
  youtube: {
    channels: "/api/youtube/channels",
    videos: "/api/youtube/videos",
    analytics: "/api/youtube/analytics",
  },
  ai: {
    metadata: "/api/ai/metadata",
    artwork: "/api/ai/artwork",
    forecast: "/api/ai/forecast",
  },
}
