import axios from "axios";
import { redirect } from 'next/navigation';

export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
});

export async function getExistingUser(email: string) {
  try {
    const response = await api.get(`existing_user/${email}`);
    return response.data;
  } catch (error: unknown) {
    type AxiosErrorWithResponse = {
      response?: {
        status?: number;
      };
    };
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      (error as AxiosErrorWithResponse).response?.status === 404
    ) {
      return { exists: false };
    }
    throw error;
  }
}

export async function createUser(data: {
  email: string | null | undefined;
  username: string | null | undefined;
  first_name: string | null | undefined;
  last_name: string | null | undefined;
  profile_picture_url: string | null | undefined;
}) {
  try {
    const response = await api.post("create_user/", data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user:", error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
}

export async function getCategories() {
  try {
    const response = await api.get("categories_list/");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching categories:", error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
}

export async function getCategory(slug: string) {
  try {
    const response = await api.get(`categories/${slug}/`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching category:", error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
}

export async function getProducts() {
  try {
    const response = await api.get("product_list/");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching products:", error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
}

export async function getProduct(slug: string) {
  try {
    const response = await api.get(`products/${slug}/`);
    console.log("cart   ",response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching product:", error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
}

export async function getCart(cart_code: string) {
  try {
    const response = await api.get(`get_cart/${cart_code}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message == "Request failed with status code 404") {
        redirect("/cart");
      }
      throw new Error("Cart not found");
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
}

export async function productSearch(searchInput: string | null | undefined) {
  if (searchInput) {
    try {
      const response = await api.get(`search?query=${searchInput}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error searching products:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  }
}

export async function intiatePayment(paymentInfo: { email: string | null | undefined, cart_code: string | null | undefined }) {
  try {
    const response = await api.post("create_checkout_session/", paymentInfo);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error initiating payment:", error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
}

export async function getOrders(email: string | null | undefined) {
  if (email) {
    try {
      const response = await api.get("get_orders", {
        params: { email },
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching orders:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  }
}

export async function getWishlist(email: string | null | undefined) {
  if (email) {
    try {
      const response = await api.get("my_wishlists", {
        params: { email },
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching wishlist:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  }
}

export async function addAddress(addressData: {
  email: string | null | undefined;
  phone: string;
  state: string;
  city: string;
  street: string;
}) {
  try {
    const response = await api.post("add_address/", addressData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error adding address:", error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
}

export async function getAddress(email: string | null | undefined) {
  if (email) {
    try {
      const response = await api.get("get_address", {
        params: { email },
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching address:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  }
  return undefined;
}
