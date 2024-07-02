import type { Metadata } from "next";
import Product from "../../../components/products/Product";
import { getProduct } from "../../../lib/getProducts";
import { IProduct } from "../../../types/product";

type Props = { params: { productId: string } };

export async function generateMetadata({
  params: { productId },
}: Props): Promise<Metadata> {
  const { product }: { product: IProduct } = await getProduct(productId);
  const { title, description, keywords: productKeywords, categories } = product;

  const keywords =
    productKeywords.join(", ") || categories.join(", ") || "Ahmed Store";

  return {
    title,
    description,
    keywords,
  };
}

export default async function page({ params: { productId } }: Props) {
  const { product }: { product: IProduct } = await getProduct(productId);
  return <Product product={product} />;
}
