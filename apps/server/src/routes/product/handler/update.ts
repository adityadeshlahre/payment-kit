import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export const updateProductUsingProductIdHandler = factory.createHandlers(
  async (c: Context) => {
    const { id: productId } = c.req.param();
    if (!productId) {
      return c.json({ error: "Product ID is required" }, 400);
    }
    try {
      const body = await c.req.json();
      await dodoPaymentClient.products.update(productId, body);
      return c.json({ status: HttpStatus.HTTP_200_OK });
    } catch (error) {
      console.error("Error updating product:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error ? error.message : "Failed to update product",
      });
    }
  },
);
