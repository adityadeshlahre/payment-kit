"use client";

import ProductCard from "@/components/product-card";
import { useProductsList } from "@/hooks/query/useProduct";
import type { productDetails } from "@repo/types";

export default function Product() {
  const { data: products, isLoading, error } = useProductsList();

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">
        Dodo Payments Product List
      </h1>
      {isLoading && <div>Loading products...</div>}
      {error && <div>Error loading products: {error.message}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.items &&
          products.items.map((product: productDetails) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
      </div>
    </div>
  );
}
