import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { zValidator } from "@hono/zod-validator";
import { productListResponseSchema } from "@repo/types";
import type { Context } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { HTTPException } from "hono/http-exception";

export const getProductListUsingDodoPaymentClientHandler =
  factory.createHandlers(
    describeRoute({
      tags: ["products"],
      description: "Retrieve a list of products",
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
              schema: resolver(productListResponseSchema),
            },
          },
        },
      },
    }),
    validator("json", productListResponseSchema),
    zValidator("json", productListResponseSchema),
    async (c: Context) => {
      try {
        const products = await dodoPaymentClient.products.list();
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
