// types/product.ts

export interface Dimensions {
  length?: number;
  width?: number;
  height?: number;
}

export interface Specifications {
  material?: string;
  color?: string;
  weight?: number;
  dimensions?: Dimensions;
}

export interface ProductImage {
  _id?: string; // Généré par MongoDB
  url: string;
  alt?: string;
  isPrimary: boolean;
}

export interface Product {
  _id?: string; // Toujours une string côté Front-end après JSON.stringify
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  categories: string[];
  images: ProductImage[];
  specifications: Specifications;
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
