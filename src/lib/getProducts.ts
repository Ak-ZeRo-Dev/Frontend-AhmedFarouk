export default async function getAllProducts(
  limit: number,
  page: number,
  search: string
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/get-all-products?limit=${limit}&page=${page}&search=${search}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await res.json();
    if (res.status === 404) {
      throw new Error("لا توجد منتجات");
    }
    if (!res.ok) {
      throw new Error(data.message || "فشل في جلب المنتجات.");
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProduct(productId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/get-product/${productId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await res.json();
    if (res.status === 404) {
      throw new Error("منتج غير موجود");
    }
    if (!res.ok) {
      throw new Error(data.message || "فشل في جلب المنتج.");
    }
    return data;
  } catch (error: any) {
    if ("response" in error) {
      throw new Error(error.response.message);
    } else {
      throw new Error(error.message);
    }
  }
}
