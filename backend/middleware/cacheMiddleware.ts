import { Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";

/**
 * cacheMiddleware is a middleware function that caches the responses of HTTP requests.
 * It uses a NodeCache object to store the responses.
 *
 * If a request is made to a previously cached URL, the cached response is returned.
 * If a request is made to a URL not in the cache, the response is cached before being sent.
 *
 * Requests to the "/translate" path are not cached.
 *
 * @param {NodeCache} cache - The NodeCache object to use for caching.
 * @returns {Function} The middleware function.
 */
const cacheMiddleware = (cache: NodeCache) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Don't cache requests to the "/translate" path
    if (req.path === "/translate") {
      return next();
    }

    // Use the original URL as the cache key
    const key = req.originalUrl;

    // Try to get the cached response
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      // If a cached response exists, send it
      res.send(cachedResponse);
    } else {
      // If no cached response exists, cache the response before sending it
      const originalSend = res.send.bind(res);
      res.send = (body: any) => {
        cache.set(key, body);
        return originalSend(body);
      };
      next();
    }
  };
};

export default cacheMiddleware;
