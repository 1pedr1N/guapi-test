import React, { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Product = {
  id: number;
  name: string;
  quantity: number;
  description: string;
};

const ProductContext = createContext<{
  products: Product[];
  addProduct: (newProduct: Product) => Promise<void>;
  editProduct: (productId: number, updatedProduct: Product) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
} | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem('products');
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
        }
      } catch (error) {
        console.error('Erro ao carregar produtos do AsyncStorage:', error);
      }
    };

    loadProducts();
  }, []);

  const addProduct = async (newProduct: Product) => {
    try {
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);

      await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
    } catch (error) {
      console.error('Erro ao adicionar produto ao AsyncStorage:', error);
    }
  };

  const editProduct = async (productId: number, updatedProduct: Product) => {
    try {
      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          return { ...product, ...updatedProduct };
        }
        return product;
      });

      setProducts(updatedProducts);

      await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
    } catch (error) {
      console.error('Erro ao editar produto no AsyncStorage:', error);
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      const productToDelete = products.find((product) => product.id === productId);
  
      if (!productToDelete) {
        alert('Produto não encontrado.');
        return;
      }
  
      if (productToDelete.quantity > 0) {
        alert('Não é possível excluir um produto com quantidade existente.');
        return;
      }
  
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
  
      await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
    } catch (error) {
      alert('Erro ao excluir produto do AsyncStorage:');
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        editProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext deve ser usado dentro de um ProductProvider");
  }
  return context;
};
