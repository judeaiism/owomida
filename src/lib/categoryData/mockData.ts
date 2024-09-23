export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
  }
  
  interface CategoryData {
    name: string;
    description: string;
    products: Product[];
  }
  
  export const categoryData: Record<string, CategoryData> = {
    electronics: {
      name: "Electronics",
      description: "Cutting-edge gadgets and devices",
      products: [
        {
          id: 1,
          name: "Smartphone X",
          price: 799.99,
          category: "electronics",
          image: "/images/smartphone-x.jpg",
          description: "The latest smartphone with advanced features."
        },
        // Add more electronics products...
      ]
    },
    clothing: {
      name: "Clothing",
      description: "Stylish apparel for all occasions",
      products: [
        {
          id: 101,
          name: "Classic T-Shirt",
          price: 19.99,
          category: "clothing",
          image: "/images/classic-tshirt.jpg",
          description: "Comfortable and versatile t-shirt for everyday wear."
        },
        // Add more clothing products...
      ]
    },
    // Add more categories...
  };