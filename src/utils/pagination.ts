// File: src/utils/pagination.ts
import { Request } from "express";

export interface PaginationParams {
   skip: number;
   take: number;
}

export interface PaginationMeta {
   page: number;
   limit: number;
   totalItems: number;
   totalPages: number;
   hasNextPage: boolean;
   hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
   data: {
      data: T[];
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
   };
}

export function getPaginationParams(req: Request): PaginationParams {
   const defaultLimit = 10;
   const page = parseInt(req.query.page as string) || 1;
   const limit = parseInt(req.query.pageSize as string) || defaultLimit;

   // Ensure page and limit are positive numbers
   const validPage = page > 0 ? page : 1;
   const validLimit = limit > 0 ? limit : defaultLimit;

   return {
      skip: (validPage - 1) * validLimit,
      take: validLimit,
   };
}

export function createPaginatedResponse<T>(
   data: T[],
   totalItems: number,
   page: number,
   limit: number
): PaginatedResponse<T> {
   const totalPages = Math.ceil(totalItems / limit);

   return {
      data: {
         data,
         page,
         limit,
         totalItems,
         totalPages,
         hasNextPage: page < totalPages,
         hasPreviousPage: page > 1,
      },
   };
}
