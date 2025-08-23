"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CustomerDetails, productDetails } from "@repo/types";
import useCreatePaymentMutation from "@/hooks/mutation/useCreatePayment";
import useCreateSubscriptionMutation from "@/hooks/mutation/useCreateSubscription";
import type { CountryCode } from "dodopayments/resources/misc";
import { authClient } from "@/lib/auth-client";
import { useCustomer } from "@/hooks/query/useCustomer";
import useCustomerCreateNewCustomerDodo from "@/hooks/mutation/useCustomer";
import { useUserStore } from "@/store/user";

export default function ProductCard({ product }: { product: productDetails }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const createPayment = useCreatePaymentMutation();
  const createSubscription = useCreateSubscriptionMutation();
  const { data: session, isPending } = authClient.useSession();
  const createNewCustomerDodo = useCustomerCreateNewCustomerDodo();
  const customer_id = useUserStore(
    (state) => state.dodoCustomerDetails.customer_id,
  );
  const curSession = authClient.useSession();

  const checkoutProduct = async (
    productId: string,
    is_recurring: boolean,
    useDynamicPaymentLinks: boolean,
  ) => {
    if (customer_id === "") {
      if (loading) return;
      setLoading(true);
      const response = await createNewCustomerDodo.mutateAsync({
        email: session?.user.email || "",
        name: session?.user.name || "",
      });
      if (response && response?.customer_id) {
        router.refresh();
      }
    }
    if (useDynamicPaymentLinks && !isPending && session) {
      if (loading) return;
      setLoading(true);

      const billingData = {
        city: "Mumbai",
        country: "IN" as CountryCode,
        state: "MH",
        street: "123 Kampala Street",
        zipcode: "400001",
      };

      if (is_recurring) {
        createSubscription.mutate(
          {
            billing: billingData,
            customer: {
              customer_id: customer_id,
            },
            product_id: productId,
            quantity: 1,
          },
          {
            onSuccess: (data) => {
              router.push(data.payment_link);
            },
            onError: (error) => {
              console.error(error);
            },
          },
        );
      } else {
        createPayment.mutate(
          {
            billing: billingData,
            customer: {
              customer_id: response.customer_id,
            },
            product_cart: [
              {
                product_id: productId,
                quantity: 1,
              },
            ],
          },
          {
            onSuccess: (data) => {
              router.push(data.payment_link);
            },
            onError: (error) => {
              console.error(error);
            },
          },
        );
      }
    }
    // else {
    //     const checkoutUrl = `https://test.checkout.dodopayments.com/buy/${productId}?quantity=1&redirect_url=${process.env.NEXT_PUBLIC_SERVER_URL}`;
    //     router.push(checkoutUrl);
    //   }
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-lg p-6"
      onClick={() => {
        router.push(`/product/${product.product_id}`);
      }}
    >
      <h2 className="text-xl font-bold text-black">{product.name}</h2>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="text-green-600 font-semibold mt-4">
        ${product.price / 100}
      </p>
      <button
        className="text-xl font-bold text-black"
        onClick={() =>
          checkoutProduct(product.product_id, product.is_recurring, false)
        }
        disabled={loading}
      >
        {loading ? "Processing..." : "Buy now"}
      </button>
    </div>
  );
}
