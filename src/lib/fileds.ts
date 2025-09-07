import z from "zod";

export const email = z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address")