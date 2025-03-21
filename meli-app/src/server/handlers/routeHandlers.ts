// import express from 'express';
// import { match } from "path-to-regexp";
// import { itemDetailResponseHandler, searchResponseHandler } from "./responseHandlers";

// const routeHandlers: Record<string, (req: express.Request, params?: Partial<Record<string, string | string[]>>) => Promise<unknown>> = {
//   "/items": async (req) => {
//     const searchTerm = req.query.search as string;
//     if (!searchTerm) {
//       throw new Error("Search term is required");
//     }
//     return await searchResponseHandler(searchTerm);
//   },
//   "/items/:id": async (req, params) => {
//     const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
//     if (!id) {
//       throw new Error("Item ID is required");
//     }
//     const searchTerm = req.query.search as string | undefined;

//     const itemData = await itemDetailResponseHandler(id);

//     return { ...itemData, query: searchTerm };

//   },
//   "/": async () => {
//     return {};
//   },
// };

// // Función para encontrar el manejador correcto basado en la ruta
// export const findRouteHandler = (
//   path: string
// ): ((req: express.Request) => Promise<unknown>) | undefined => {
//   for (const route in routeHandlers) {
//     const matcher = match(route, { decode: decodeURIComponent });
//     const matched = matcher(path);

//     if (matched) {
//       const handler = routeHandlers[route];
//       return async (req: express.Request) => handler(req, matched.params);
//     }
//   }

//   return undefined;
// };

import express from "express";
import { match } from "path-to-regexp";
import { itemDetailResponseHandler, searchResponseHandler } from "./responseHandlers";

const routeHandlers: Record<
  string,
  (req: express.Request, params?: Partial<Record<string, string | string[]>>) => Promise<{
    data: unknown;
    meta: { title: string; description: string };
  }>
> = {
  "/items": async (req) => {
    const searchTerm = req.query.search as string;
    if (!searchTerm) {
      throw new Error("Search term is required");
    }

    const data = await searchResponseHandler(searchTerm);

    return {
      data: {...data, type: 'list'},
      meta: {
        title: `Resultados para "${searchTerm}" - Mercado Libre`,
        description: `Encontrá los mejores resultados para "${searchTerm}" en Mercado Libre.`,
      },
    };
  },
  "/items/:id": async (req, params) => {
    const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
    if (!id) {
      throw new Error("Item ID is required");
    }

    const searchTerm = req.query.search as string | undefined;
    const itemData = await itemDetailResponseHandler(id);

    return {
      data: { ...itemData, query: searchTerm, type: 'detail' },
      meta: {
        title: `${itemData.item.title} - Mercado Libre`,
        description: `Comprá ${itemData.item.title} al mejor precio en Mercado Libre.`,
      },
    };
  },
  "/": async () => {
    return {
      data: {},
      meta: {
        title: "Mercado Libre Argentina",
        description: "Encontrá lo que buscas en Mercado Libre Argentina.",
      },
    };
  },
};

// Función para encontrar el manejador correcto basado en la ruta
export const findRouteHandler = (
  path: string

// eslint-disable-next-line @typescript-eslint/no-explicit-any
): ((req: express.Request) => Promise<{ data: any; meta: { title: string; description: string } }>) | undefined => {
  for (const route in routeHandlers) {
    const matcher = match(route, { decode: decodeURIComponent });
    const matched = matcher(path);

    if (matched) {
      const handler = routeHandlers[route];
      return async (req: express.Request) => handler(req, matched.params);
    }
  }

  return undefined;
};