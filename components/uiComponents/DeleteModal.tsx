import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { TrashIcon, X } from 'lucide-react'

const DeleteModal = ({ handleDeleteReview, handleDeleteCartItem, deleteCartItem }: { handleDeleteReview?: () => void, handleDeleteCartItem?: () => void, deleteCartItem?: boolean }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {deleteCartItem ?
                    <button
                        className="p-2 rounded-md bg-red-50 hover:bg-red-100 transition text-red-500 border border-red-300"
                    >
                        <X className="w-5 h-5" />
                    </button> :
                    <button className="bg-gray-200 p-2 rounded-md cursor-pointer transition-all hover:bg-gray-300">
                        <TrashIcon className="size-5 text-gray-600" />
                    </button>
                }

            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    {deleteCartItem ?
                    <AlertDialogDescription>
                        This action will detelete the item from your cart. Are you sure you want to proceed?
                    </AlertDialogDescription> : 
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your review on this product.
                    </AlertDialogDescription>}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='cursor-pointer' onClick={deleteCartItem? handleDeleteCartItem :handleDeleteReview}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteModal;