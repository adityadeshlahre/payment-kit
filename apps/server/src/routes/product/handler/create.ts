import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { zValidator } from "@hono/zod-validator";
import { createProductSchema, errorResponseSchema } from "@repo/types";
import type { ProductCreateParams } from "dodopayments/resources/index.mjs";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { HTTPException } from "hono/http-exception";

export const createProductHandler = factory.createHandlers(
  describeRoute({
    tags: ["products"],
    description: "Create a new product",
    responses: {
      [HttpStatus.HTTP_201_CREATED]: {
        description: "Product created successfully",
        content: {
          "application/json": {
            schema: resolver(createProductSchema),
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
  validator("json", createProductSchema),
  zValidator("json", createProductSchema),
  async (c) => {
    try {
      const productData = createProductSchema.parse(
        await c.req.json(),
      ) as ProductCreateParams;
      const response = await dodoPaymentClient.products.create(productData);
      return c.json(response, { status: HttpStatus.HTTP_201_CREATED });
    } catch (error) {
      console.error("Error creating product:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error ? error.message : "Failed to create product",
      });
    }
  },
);
