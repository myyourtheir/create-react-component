import { UserStructure, zUserStructure } from "./types";

export const isUserStructure = (data: unknown): data is UserStructure => {
  return zUserStructure.safeParse(data).success;
};
