import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export const oneTimeDodoPaymentHandler = factory.createHandlers(
  async (c: Context) => {
    const { productId } = c.req.param();
    if (!productId) {
      return c.json({ error: "Product ID is required" }, 400);
    }
    try {
      const productWithQuantity = {
        product_id: productId as string,
        quantity: 1,
      };

      const response = await dodoPaymentClient.payments.create({
        // GET BILLING, CUSTOMER INFO FROM CUSTOMER AND PASS IT.
        // FOR COUNTRY CODE THE VALUE SHOULD BE - ISO country code alpha2 variant
        billing: {
          city: "",
          country: "",
          state: "",
          street: "",
          zipcode: "",
        },
        customer: {
          email: "",
          name: "",
        },
        payment_link: true,
        product_cart: [productWithQuantity],
        return_url: process.env.NEXT_PUBLIC_BASE_URL,
      });
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
