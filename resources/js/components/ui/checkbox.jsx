import React from "react";
import { cn } from "@/utils";

const Checkbox = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <input
            type="checkbox"
            className={cn(
                "h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500",
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
