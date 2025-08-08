import ProductCard from "@/components/product-card";
import { useProduct } from "@/hooks/query/useProduct";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: product, isLoading, error } = useProduct(id);
  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {id}</p>
      {isLoading && <div>Loading product details...</div>}
      {error && <div>Error loading product details: {error.message}</div>}
      {product && <ProductCard key={product.product_id} product={product} />}
    </div>
  );
}
