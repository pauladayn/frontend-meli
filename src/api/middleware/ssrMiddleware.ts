import { Request, Response, NextFunction } from 'express';
import { searchItemsController, getItemController } from '../controllers/itemControllers';

const ssrMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const url = req.originalUrl;
    console.log(`[SSR Middleware] Original URL: ${url}`);

    let data = null;

    if (url.startsWith('/items?search=')) {
      console.log('[SSR Middleware] Detected search request');
      // Extrae el query de búsqueda
      const queryString = url.split('?')[1];
      const searchQuery = queryString ? new URLSearchParams(queryString).get('search') : null;

      if (searchQuery) {
        console.log(`[SSR Middleware] Search query: ${searchQuery}`);
        // Llama al controller directamente con el searchQuery
        data = await searchItemsController(searchQuery, next);
      } else {
        console.log('[SSR Middleware] No search query found');
      }
    } else if (url.startsWith('/items/')) {
      console.log('[SSR Middleware] Detected item detail request');
      // Extrae el ID del producto
      const itemId = url.split('/')[2];
      console.log(`[SSR Middleware] Item ID: ${itemId}`);
      // Llama al controller de detalle de producto con el ID
      data = await getItemController(itemId, next); // También modificaremos este controller
    }

    // Guarda los datos en `res.locals` para que estén disponibles en el manejador `*all`
    res.locals.data = data;
    //console.log('[SSR Middleware] Data stored in res.locals:', data);
    next();
  } catch (error) {
    console.error('[SSR Middleware] Error:', error);
    next(error);
  }
};

export default ssrMiddleware;