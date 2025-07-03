"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { addAddress } from '@/lib/api';
import { toast } from 'react-toastify';
import { AddressType } from '@/lib/type';

const AddressForm = ({ email, address }: { email: string | null | undefined, address: AddressType | undefined }) => {
    const [state, setState] = useState(address?.state || "");
    const [city, setCity] = useState(address?.city || "");
    const [street, setStreet] = useState(address?.street || "");
    const [phone, setPhone] = useState(address?.phone || "");
    const [btnLoader, setBtnLoader] = useState(false);

    function disableButton() {
        return (
            state.trim().length === 0 ||
            city.trim().length === 0 ||
            street.trim().length === 0 ||
            phone.trim().length === 0
        );
    }

    async function handleAddAddress(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        setBtnLoader(true);
        if (disableButton()) return;

        const addressObj = { state, city, street, phone, email };

        try {
            await addAddress(addressObj);
            toast.success("Address added successfully!");
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error fetching orders:", error.message);
                toast.error("Failed to add address: " + error.message);
            } else {
                console.error("An unexpected error occurred:", error);
                toast.error("An unexpected error occurred while adding address.");
            }
        }
        finally {
            setBtnLoader(false);
            if (!address?.city) {
                setState("");
                setCity("");
                setStreet("");
                setPhone("");
            }
        }


    }

    return (
        <form onSubmit={handleAddAddress} className="w-full mx-auto bg-white p-8 rounded-2xl space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                Shipping Address
            </h2>

            <div className="space-y-4">
                <Input
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Street Address"
                    className="w-full h-12 px-4 rounded-md border-gray-300 focus:border-black focus:ring-2 focus:ring-black"
                />
                <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full h-12 px-4 rounded-md border-gray-300 focus:border-black focus:ring-2 focus:ring-black"
                />
                <Input
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    className="w-full h-12 px-4 rounded-md border-gray-300 focus:border-black focus:ring-2 focus:ring-black"
                />
                <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full h-12 px-4 rounded-md border-gray-300 focus:border-black focus:ring-2 focus:ring-black"
                />
            </div>

            <button
                type="submit"
                disabled={disableButton() || btnLoader}
                className="w-full h-12 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {address?.city ? btnLoader ? "Updating Address..." : "Update Address" : btnLoader ? "Adding Address..." : "Add Address"}
            </button>
        </form>
    );
};

export default AddressForm;


