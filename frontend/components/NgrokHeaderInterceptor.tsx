"use client";
import { useEffect } from "react";

/**
 * Patches window.fetch to automatically include 'ngrok-skip-browser-warning': 'true'
 * on all requests. This prevents ngrok's interstitial warning page from breaking
 * client-side API requests (JSON parsing errors).
 */
export function NgrokHeaderInterceptor() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.fetch) {
      const originalFetch = window.fetch;
      window.fetch = function (input: RequestInfo | URL, init?: RequestInit) {
        init = init || {};
        const headers = new Headers(init.headers || {});
        if (!headers.has("ngrok-skip-browser-warning")) {
          headers.set("ngrok-skip-browser-warning", "true");
        }
        init.headers = headers;
        return originalFetch.call(this, input, init);
      };
    }
  }, []);

  return null;
}
