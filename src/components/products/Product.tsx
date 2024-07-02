"use client";
import React from "react";
import { IProduct } from "../../types/product";
import ProductImages from "../images/ProductImages";

type Props = {
  product: IProduct;
};

export default function Product({ product }: Props) {
  const { images } = product;
  return (
    <section className="pt-main min-h-screen container relative mx-auto">
      <div className="flex">
        <ProductImages images={images} />
        <div className="flex-1">{product._id}</div>
      </div>
    </section>
  );
}
