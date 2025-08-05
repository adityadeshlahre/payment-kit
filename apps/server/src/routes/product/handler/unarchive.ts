import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { errorResponseSchema } from "@repo/types";
import type { Context } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { HTTPException } from "hono/http-exception";

export const unarchiveProductUsingProductIdHandler = factory.createHandlers(
  describeRoute({
    tags: ["products"],
    description: "Unarchive a product by product ID",
    responses: {
      [HttpStatus.HTTP_200_OK]: {
        description: "Product unarchived successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  enum: ["success"],
                },
                message: {
                  type: "string",
                  description: "Success message",
                },
              },
            },
          },
        },
      },
      [HttpStatus.HTTP_400_BAD_REQUEST]: {
        description: "Bad request, missing product ID",
        content: {
          "application/json": {
            schema: resolver(errorResponseSchema),
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
    const { id: productId } = c.req.param();
    if (!productId) {
      return c.json(
        { error: "Product ID is required" },
        { status: HttpStatus.HTTP_400_BAD_REQUEST },
      );
    }
    try {
      await dodoPaymentClient.products.unarchive(productId);
      return c.json(
        { status: "success", message: "Product unarchived successfully" },
        { status: HttpStatus.HTTP_200_OK },
      );
    } catch (error) {
      console.error("Error unarchiving product:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error
            ? error.message
            : "Failed to unarchive product",
      });
    }
  },
);
