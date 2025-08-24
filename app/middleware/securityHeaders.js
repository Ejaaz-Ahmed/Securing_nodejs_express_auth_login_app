// app/middleware/securityHeaders.js
import helmet from 'helmet';

export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],           // tighten further with hashes/nonces for inline scripts
      styleSrc: ["'self'"],            // same for styles
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      upgradeInsecureRequests: [],
    }
  },
  // helmet will set HSTS via the hsts middleware below
});

// apply HSTS separately if needed (helmet can configure it, but you can be explicit)
export const hstsOptions = {
  maxAge: 15552000, // 180 days
  includeSubDomains: true,
  preload: true
};
