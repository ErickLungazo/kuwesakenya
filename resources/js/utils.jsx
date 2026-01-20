import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function createPageUrl(pageName) {
    const routes = {
        Home: "/",
        Mission: "/mission",
        Shop: "/shop",
        Donate: "/donate",
        Impact: "/impact",
        Contact: "/contact",
        Cart: "/cart",
        Checkout: "/checkout",
        OrderSuccess: "/order-success",
        Login: "/login",
        Register: "/register",
    };

    return routes[pageName] || "/";
}
