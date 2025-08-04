import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import type { CreateProductResponse } from "@repo/types";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export const getProductDetailsWithIdHandler = factory.createHandlers(
  async (c: Context) => {
    const { id: productId } = c.req.param();
    if (!productId) {
      return c.json({ error: "Product ID is required" }, 400);
    }
    try {
      const response = await dodoPaymentClient.products.retrieve(productId);
      // const productDetails: CreateProductResponse = {
      //   ...response,
      //   description: response.description || "",
      //   addons: response.addons || [],
      // };
      return c.json(response);
    } catch (error) {
      console.error("Error retrieving product details:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error
            ? error.message
            : "Failed to retrieve product details",
      });
    }
  },
);
