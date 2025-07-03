import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"

const WishlistToolTrip = ({ loggedInUserEmail }: { loggedInUserEmail: string | null | undefined }) => {
  const isLoggedIn = Boolean(loggedInUserEmail);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`wish-btn ${!isLoggedIn ? 'hover:cursor-not-allowed' : ''}`}
          >
            Add to Wishlist
          </span>
        </TooltipTrigger>

        {!isLoggedIn && (
          <TooltipContent>
            <p>Login to add product to wishlist</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

export default WishlistToolTrip;
