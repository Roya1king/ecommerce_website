"use client"
import { api } from "@/lib/api";
import { generateRandomString } from "@/lib/utils";
import React, { createContext, useState, useEffect, useContext } from "react";

interface CartContextProps {
    cartCode: string | null;
    cartItemsCount: number;
    setCartItemsCount: React.Dispatch<React.SetStateAction<number>>;
    clearCartCode: () => void;
}

const CartContext = createContext<CartContextProps | null>(null);


export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartCode, setCartCode] = useState<string | null>(null);
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        async function getCartItemsCount() {
            if (!cartCode) return;

            try {
                const response = await api.get(`get_cart_stat?cart_code=${cartCode}`);
                console.log("Cart items count response:", response.data);
                setCartItemsCount(response.data.num_of_items ?? 0);
            } catch (error: unknown) {
                // Use type assertion to access response property
                if ((error as any)?.response?.status === 404) {
                    // Cart doesn't exist yet; treat as empty cart
                    console.warn("Cart not found, defaulting to 0 items");
                    setCartItemsCount(0);
                } else if (error instanceof Error) {
                    console.error("Error fetching cart items count:", error.message);
                } else {
                    console.error("An unexpected error occurred:", error);
                }
            }
        }

        getCartItemsCount();
    }, [cartCode]);


    useEffect(() => {
        let code = localStorage.getItem("cartCode");
        if (!code) {
            code = generateRandomString(10);
            localStorage.setItem("cartCode", code);
        }
        setCartCode(code);
    }, []);

    function clearCartCode() {
        localStorage.removeItem("cartCode");
        setCartCode(null);
    }

    return (
        <CartContext.Provider value={{ cartCode, cartItemsCount, setCartItemsCount, clearCartCode }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}

