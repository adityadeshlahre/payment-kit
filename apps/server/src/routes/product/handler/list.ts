import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { errorResponseSchema, productListResponseSchema } from "@repo/types";
import type { Context } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { HTTPException } from "hono/http-exception";
import type DodoPayments from "dodopayments";

export const getProductListUsingDodoPaymentClientHandler =
  factory.createHandlers(
    describeRoute({
      tags: ["products"],
      description: "Retrieve a list of products",
      parameters: [
        {
          name: "page_number",
          in: "query",
          description: "Page number for pagination (starts from 1)",
          required: false,
          schema: {
            type: "integer",
            minimum: 1,
          },
        },
        {
          name: "page_size",
          in: "query",
          description: "Number of products per page (1-100)",
          required: false,
          schema: {
            type: "integer",
            minimum: 1,
            maximum: 100,
          },
        },
        {
          name: "archived",
          in: "query",
          description: "Whether to list archived products",
          required: false,
          schema: {
            type: "boolean",
          },
        },
        {
          name: "brand_id",
          in: "query",
          description: "Filter by brand ID",
          required: false,
          schema: {
            type: "string",
          },
        },
        {
          name: "recurring",
          in: "query",
          description: "Filter by pricing type: true for recurring, false for one-time",
          required: false,
          schema: {
            type: "boolean",
          },
        },
      ],
      responses: {
        [HttpStatus.HTTP_200_OK]: {
          description: "Products retrieved successfully",
          content: {
            "application/json": {
              schema: resolver(productListResponseSchema),
            },
          },
        },
        [HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR]: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: resolver(errorResponseSchema),
            },
          },
        },
      },
    }),
    async (c: Context) => {
      try {
        const query = c.req.query();
        const queryParams: DodoPayments.ProductListParams = {
          ...(query.page_number && { page_number: +query.page_number }),
          ...(query.page_size && { page_size: +query.page_size }),
          ...(query.archived !== undefined && { archived: query.archived === 'true' }),
          ...(query.brand_id && { brand_id: query.brand_id }),
          ...(query.recurring !== undefined && { recurring: query.recurring === 'true' }),
        };

        const products = await dodoPaymentClient.products.list(queryParams);
        return c.json(products);
      } catch (error) {
        console.error("Error retrieving products:", error);
        throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
          message:
            error instanceof Error
              ? error.message
              : "Failed to retrieve products",
        });
      }
    },
  );
