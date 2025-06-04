// Represents a Packaging item as returned by the API
export interface Packaging {
  id: number;
  name: string;
  type?: string;
  stock: number;
}

// Shape for creating or updating a Packaging
export interface PostPackaging {
  name: string;
  type?: string;
  stock: number;
}
