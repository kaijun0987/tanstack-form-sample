import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

class DB {
  private data: { name: string; age?: string; email?: string };

  constructor() {
    this.data = { name: "", age: "", email: "" };
  }

  getData(): { name: string; age?: string; email?: string } {
    return { ...this.data };
  }

  async saveUser(value: { name: string; age?: string; email?: string }) {
    this.data = value;
    return value;
  }
}

export const db = new DB();
