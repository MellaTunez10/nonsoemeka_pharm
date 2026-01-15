import { useState, useEffect } from 'react';

export function useWishlist() {
    const [wishlist, setWishlist] = useState<number[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('wishlist');
        if (stored) {
            try {
                setWishlist(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse wishlist', e);
            }
        }
    }, []);

    const toggleWishlist = (productId: number) => {
        const newWishlist = wishlist.includes(productId)
            ? wishlist.filter(id => id !== productId)
            : [...wishlist, productId];
        
        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    };

    const isInWishlist = (productId: number) => wishlist.includes(productId);

    return { wishlist, toggleWishlist, isInWishlist };
}
