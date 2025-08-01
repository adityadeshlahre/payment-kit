import { dodoPayments } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export const subscriptionDodoPaymentHandler = factory.createHandlers(
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

      const response = await dodoPayments.subscriptions.create({
        // GET BILLING, CUSTOMER INFO FROM CUSTOMER AND PASS IT.
        // FOR COUNTRY CODE THE VALUE SHOULD BE - ISO country code alpha2 variant
        billing: {
          city: "",
          country: "", // change this to the actual country code
          state: "",
          street: "",
          zipcode: "",
        },
        customer: {
          email: "",
          name: "",
        },
        payment_link: true,
        product_id: productId,
        quantity: 1,
        return_url: process.env.NEXT_PUBLIC_BASE_URL,
      });
      return c.json(response);
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
