import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface Props {
    children: React.ReactNode;
    userHaveReview?: boolean;
    updateReviewModal?: boolean;
    addressForm?: boolean;
    address?: AddressType | undefined;
}

import React from 'react'
import Button from "./Button";
import { PenIcon } from "lucide-react";
import { AddressType } from "@/lib/type";

const Modal = ({ children, userHaveReview, updateReviewModal, addressForm,address }: Props) => {
    if (userHaveReview) {
        return null; // If the user already has a review, do not render the modal
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                {updateReviewModal ?
                    (<button className="bg-gray-200 p-2 rounded-md cursor-pointer transition-all hover:bg-gray-300">
                        <PenIcon className="size-5 text-gray-600" />
                    </button>)
                    :
                    addressForm ?
                        <button className='address-btn '>{address?.city ?  "Update Address":"Add Address"}</button>
                        :
                        (<Button className="default-btn max-sm:text-[12px] max-sm:px-4 my-6">
                            Click to add a review
                        </Button>)}
            </DialogTrigger>
            <DialogContent className="px-2 py-2">
                <DialogHeader>
                    <DialogTitle className="hidden">Are you absolutely sure?</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Modal