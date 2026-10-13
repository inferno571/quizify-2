import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow this project's ngrok tunnel to load Next.js development resources.
  allowedDevOrigins: ['lend-referee-brilliant.ngrok-free.dev'],
  // Rewrites removed in favor of explicit Next.js Route Handlers 
  // (app/api/extract-quiz/route.ts and app/api/generate-quiz/route.ts)
  // to ensure robust 404/500 logging in deployment.
};

export default nextConfig;
