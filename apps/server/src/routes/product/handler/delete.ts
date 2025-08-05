import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { zValidator } from "@hono/zod-validator";
import { errorResponseSchema, productIdSchema } from "@repo/types";
import type { Context } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { HTTPException } from "hono/http-exception";

export const deleteProductUsingProductIdHandler = factory.createHandlers(
  describeRoute({
    tags: ["products"],
    description: "Delete a product by product ID",
    responses: {
      [HttpStatus.HTTP_200_OK]: {
        description: "Product deleted successfully",
        content: {
          "application/json": {
            schema: resolver(productIdSchema),
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
  validator("param", productIdSchema),
  zValidator("param", productIdSchema),
  async (c: Context) => {
    const { id: productId } = c.req.param();
    if (!productId) {
      return c.json(
        { error: "Product ID is required" },
        {
          status: HttpStatus.HTTP_400_BAD_REQUEST,
        },
      );
    }
    try {
      await dodoPaymentClient.products.delete(productId);
      return c.json(
        { status: "success", message: "Product deleted successfully" },
        { status: HttpStatus.HTTP_200_OK },
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error ? error.message : "Failed to delete product",
      });
    }
  },
);
