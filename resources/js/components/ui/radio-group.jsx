import React from "react";
import { cn } from "@/utils";

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
    return <div className={cn("grid gap-2", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <input
            type="radio"
            className={cn(
                "h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500",
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
