import { getState } from "../store/store";

export default async function GetUser(userId: string, token: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/users/admin/get-user/${userId}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }
    return await res.json();
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.message);
    } else {
      throw new Error(error.message);
    }
  }
}
