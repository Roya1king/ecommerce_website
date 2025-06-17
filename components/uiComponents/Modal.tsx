import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface Props {
  children: React.ReactNode;
}

import React from 'react'

const Modal = ({children}:Props) => {
    return (
        <Dialog>
            <DialogTrigger className="default-btn max-sm:text-[12px] max-sm:px-4 my-6">Click to add a review </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="hidden">Are you absolutely sure?</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Modal