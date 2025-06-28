"use server"
import { signOut} from "@/auth"
import { api } from "./api";
import { revalidatePath } from "next/cache";


export async function signOutUser(){
    await signOut({redirectTo: "/"})
}

export async function updateReviewAction(formData: FormData){
    const rating = Number(formData.get("rating"));
    const review = formData.get("review");
    const review_id = Number(formData.get("review_id"));
    const slug = formData.get("slug");

    const reviewObject ={ rating ,review }

    try{
        const response = await api.put(`update_review/${review_id}/`,reviewObject);
        revalidatePath(`/products/${slug}`);
        return response.data;
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error updating review:", error.message);
        } else {
            console.error("An unexpected error occurred:", error);
        }
    }
}



export async function createReviewAction(formData: FormData) {
    const product_id=Number(formData.get("product_id")) ;
    const email = formData.get("email");
    const rating = Number(formData.get("rating"));
    const review = formData.get("review");
    const slug = formData.get("slug");

    const reviewObject = {
        product_id,
        email,
        rating,
        review,
    }

    if(!product_id || !email || !rating || !review || !slug) {
        throw new Error("All fields are required");
    }

    try{
        const response = await api.post("add_review/",reviewObject);
        revalidatePath(`/products/${slug}`);
        return response.data;
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error creating review:", error.message);
        } else {
            console.error("An unexpected error occurred:", error);
        }
    }
}

export async function deleteReviewAction(formData:FormData) {
    const review_id= Number(formData.get("review_id"));
    const slug = formData.get("slug");

    try{
        const response = await api.delete(`delete_review/${review_id}/`);
        revalidatePath(`/products/${slug}`);
        return response.data;
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error deleting review:", error.message);
        } else {
            console.error("An unexpected error occurred:", error);
        }
    }
}

export async function addToCartAction(formData: FormData) {
    const cart_code=formData.get("cart_code");
    const product_id = Number(formData.get("product_id"));

    const cartItemObj={cart_code,product_id};

    try{
        const response=await api.post("add_to_cart/", cartItemObj);
        return response.data;
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error adding to cart:", error.message);
        } else {
            console.error("An unexpected error occurred:", error);
        }
    }   
}