// Frontend environment configuration
// This file provides safe access to environment variables with fallbacks

// Helper to safely access environment variables
const getEnvVariable = (key: string, defaultValue = ""): string => {
  // For client-side variables, they must be prefixed with NEXT_PUBLIC_
  if (typeof window !== "undefined") {
    return (process.env[`NEXT_PUBLIC_${key}`] || defaultValue) as string
  }

  // For server-side variables
  return (process.env[key] || defaultValue) as string
}

// Export environment configuration with defaults
export const env = {
  // API URL for frontend requests (with fallback to mock API)
  apiUrl: getEnvVariable("API_URL", "/api"),

  // Application environment
  nodeEnv: getEnvVariable("NODE_ENV", "development"),

  // Feature flags
  enableAI: getEnvVariable("ENABLE_AI", "true") === "true",
  enableAnalytics: getEnvVariable("ENABLE_ANALYTICS", "true") === "true",

  // Mock mode (always true for frontend-only)
  mockMode: true,

  // Application version
  appVersion: "1.0.0",
}

// Helper to check if we're in development mode
export const isDev = env.nodeEnv === "development"

// Helper to check if we're in production mode
export const isProd = env.nodeEnv === "production"

// Helper to check if we're in test mode
export const isTest = env.nodeEnv === "test"
