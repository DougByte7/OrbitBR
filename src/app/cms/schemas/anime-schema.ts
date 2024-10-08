import { z } from "zod";

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const coverExtension = ".webp";

export const animeSchema = z.object({
  cover: z
    .custom<File>()
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type ?? "no file"),
      "Only .jpg, .jpeg, .png, .avif and .webp formats are supported.",
    )
    .or(z.string().endsWith(coverExtension)),
  title: z.string().trim().min(2, "O título de ter pelo menos 2 letras."),
  status: z.string().trim().min(1, "O status é necessário."),
  synopsis: z.string().trim().min(1, "A sinopse é necessária."),
  authors: z
    .string()
    .trim()
    .min(1, "O autor é necessário.")
    .array()
    .nonempty("Pelo menos um autor é necessário."),
  genres: z
    .string()
    .trim()
    .min(1, "O gênero é necessário.")
    .array()
    .nonempty("Pelo menos um gênero é necessário."),
  tips: z
    .string()
    .trim()
    .min(1, "A dica é necessária.")
    .array()
    .nonempty("Pelo menos ums dica é necessária."),
  streamingUrl: z
    .string()
    .url("URL inválida")
    .array()
    .nonempty("Pelo menos um Streaming é necessário."),
});
