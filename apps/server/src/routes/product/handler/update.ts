import { dodoPaymentClient } from "@/lib/auth";
import { baseErrorSchema, HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { zValidator } from "@hono/zod-validator";
import {
  errorResponseSchema,
  productFileNameSchema,
  productFileNameUpdateResponseSchema,
  productIdSchema,
} from "@repo/types";
import type { Context } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { HTTPException } from "hono/http-exception";

export const updateProductUsingProductIdHandler = factory.createHandlers(
  describeRoute({
    tags: ["products"],
    description: "Update product details by product ID",
    responses: {
      [HttpStatus.HTTP_200_OK]: {
        description: "Product updated successfully",
        content: {
          "application/json": {
            schema: resolver(baseErrorSchema),
          },
        },
      },
      [HttpStatus.HTTP_400_BAD_REQUEST]: {
        description: "Bad request, missing product ID or invalid data",
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
            schema: resolver(baseErrorSchema),
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

// not a literal updating route, but a force update for the image { need a manula update from dashboard }
export const updateProductImageUsingProductIdHandler = factory.createHandlers(
  describeRoute({
    tags: ["products"],
    description: "Update product image by product ID",
    responses: {
      [HttpStatus.HTTP_200_OK]: {
        description: "Product image updated successfully",
        content: {
          "application/json": {
            schema: resolver(errorResponseSchema),
          },
        },
      },
      [HttpStatus.HTTP_400_BAD_REQUEST]: {
        description: "Bad request, missing product ID or invalid data",
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
            schema: resolver(baseErrorSchema),
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
      return c.json({ error: "Product ID is required" }, 400);
    }
    try {
      await dodoPaymentClient.products.images.update(productId, {
        force_update: true,
      });
      return c.json({ status: HttpStatus.HTTP_200_OK });
    } catch (error) {
      console.error("Error updating product image:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error
            ? error.message
            : "Failed to update product image",
      });
    }
  },
);

export const updateProductFilesUsingProductIdHandler = factory.createHandlers(
  describeRoute({
    tags: ["products"],
    description: "Update product files by product ID",
    responses: {
      [HttpStatus.HTTP_200_OK]: {
        description: "Product files updated successfully",
        content: {
          "application/json": {
            schema: resolver(productFileNameUpdateResponseSchema),
          },
        },
      },
      [HttpStatus.HTTP_400_BAD_REQUEST]: {
        description: "Bad request, missing product ID or invalid data",
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
            schema: resolver(baseErrorSchema),
          },
        },
      },
    },
  }),
  validator("param", productIdSchema),
  validator("json", productFileNameSchema),
  zValidator("param", productIdSchema),
  zValidator("json", productFileNameSchema),
  async (c: Context) => {
    const { id: productId } = c.req.param();
    if (!productId) {
      return c.json({ error: "Product ID is required" }, 400);
    }
    const body = await c.req.json();
    if (!body.file_name) {
      return c.json({ error: "File name is required" }, 400);
    }
    try {
      const response = await dodoPaymentClient.products.updateFiles(productId, {
        file_name: body.file_name,
      });
      return c.json(response);
    } catch (error) {
      console.error("Error updating product files:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error
            ? error.message
            : "Failed to update product files",
      });
    }
  },
);
