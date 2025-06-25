import axios from "axios";

export const BASE_URL = "http://127.0.1:8000";

const api=axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export async function getExistingUser(email: string) {
  try {
    const response = await api.get(`existing_user/${email}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return { exists: false }; // Explicitly return "not found" state
    }
    throw error; // Re-throw other errors
  }
}

export async function createUser(data : {
        email: string | null | undefined;
        username: string | null | undefined;
        first_name: string | null | undefined;
        last_name: string | null | undefined;
        profile_picture_url: string | null | undefined;
    }) {
    try{
        const response = await api.post("create_user/", data);
        return response.data;
    } catch (error) {
    if(error instanceof Error) {
      console.error("Error fetching user:", error.message);
    }
    else {
      console.error("An unexpected error occurred:", error);
    }
  }
}


export async function getCategories() {
  try{
    const response = await api.get("categories_list");
    return response.data;
  }
  catch (error:unknown) {
    if (error instanceof Error) {
      console.error("Error fetching categories:", error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
}

export async function getCategory(slug: string) {
  try{
    const response = await api.get(`categories/${slug}`);
    return response.data; 
  }
  catch (error:unknown) {
    if (error instanceof Error) {
      console.error("Error fetching category:", error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
}

export async function getProducts() {
  try{
    const response = await api.get("product_list");
    return response.data;
  }
  catch (error:unknown) {
    if (error instanceof Error) {
      console.error("Error fetching products:", error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
}