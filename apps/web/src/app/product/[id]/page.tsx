"use client";

import { use } from "react";
import { useProduct } from "@/hooks/query/useProduct";
import ProductDetails from "@/components/product-details";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: product, isLoading, error } = useProduct(id);

  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {id}</p>
      {isLoading && <div>Loading product details...</div>}
      {error && <div>Error loading product details: {error.message}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {product && (
          <ProductDetails key={product.product_id} product={product} />
        )}
      </div>
    </div>
  );
}
