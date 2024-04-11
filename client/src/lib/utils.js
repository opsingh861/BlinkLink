import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const getAvatarUrl = (name, length = 1) => {
    return `https://ui-avatars.com/api/?name=${name}&background=random&rounded=true&size=128&bold=true&color=white&length=${length}`;
};