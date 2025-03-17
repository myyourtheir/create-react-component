import z from "zod";

export type FileTypes = "component" | "index" | "styles";

export type UserStructure = {
  children?: UserStructure;
  type: "folder" | "file";
  title: string;
  content?: string;
}[];

export const zUserStructure: z.ZodSchema<UserStructure> = z.lazy(() =>
  z.array(
    z.object({
      children: zUserStructure.optional(),
      type: z.enum(["folder", "file"]),
      title: z.string(),
      content: z.string().optional(),
    })
  )
);
