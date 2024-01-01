import { Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";

const cacheMiddleware = (cache: NodeCache) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      console.log("Cache hit");
      res.send(cachedResponse);
    } else {
      console.log("Cache miss");
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
