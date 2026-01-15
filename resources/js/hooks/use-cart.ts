import { useState, useEffect } from 'react';

export interface CartItem {
  id: string | number;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  requires_prescription?: boolean;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage and setup sync
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem('nonso_cart');
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (e) {
          console.error('Failed to parse cart from localStorage', e);
        }
      }
      setIsLoaded(true);
    };

    loadCart();

    const handleSync = (e: StorageEvent | CustomEvent) => {
      if (e instanceof StorageEvent && e.key !== 'nonso_cart') return;
      
      const savedCart = localStorage.getItem('nonso_cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('cart-updated', handleSync as any);

    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('cart-updated', handleSync as any);
    };
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('nonso_cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = (product: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setItems((prevItems) => {
      let newItems;
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        newItems = prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity }];
      }
      return newItems;
    });

    // Notify other components
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('cart-updated'));
      window.dispatchEvent(new CustomEvent('toast', { 
        detail: { message: `${product.name} added to cart!`, type: 'success' } 
      }));
    }, 0);
  };

  const removeItem = (id: string | number) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== id);
      return newItems;
    });
    setTimeout(() => window.dispatchEvent(new CustomEvent('cart-updated')), 0);
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      return newItems;
    });
    setTimeout(() => window.dispatchEvent(new CustomEvent('cart-updated')), 0);
  };

  const clearCart = () => {
    setItems([]);
    setTimeout(() => window.dispatchEvent(new CustomEvent('cart-updated')), 0);
  };

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    itemCount,
    isLoaded,
  };
}
