// app/middleware/rateLimit.js
import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 6, // 6 attempts per IP per window on login
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return res.status(429).json({ error: 'Too many login attempts. Try again later.' });
  }
});

export const globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 200, // general limit (adjust to your traffic)
  standardHeaders: true,
  legacyHeaders: false
});
