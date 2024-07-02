const day = 1 * 24 * 60 * 60;

export default async function getLayout(revalidate: number = day) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/layout/get-all-layout`,
      {
        method: "GET",
        next: {
          revalidate,
        },
      }
    );
    return await res.json();
  } catch (error: any) {
    if ("response" in error) {
      throw new Error(error.response.message);
    } else {
      throw new Error(error.message);
    }
  }
}
