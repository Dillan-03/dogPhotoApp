import React, { useState, useEffect } from 'react';
import DogCard from '../components/DogCard';
import { DogImage } from '../types';

// Favourties page to show the favorited dogs
const Favourites: React.FC = () => {
    const [favorites, setFavorites] = useState<DogImage[]>([]);

    // Load the favorites from the local storage
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favoriteDogs') || '[]');
        setFavorites(savedFavorites);
    }, []);

    // Handles removing a favorite dog from the favorites list
    const handleRemoveFavorite = (dogToRemove: DogImage) => {
        const updatedFavorites = favorites.filter(dog => dog.id !== dogToRemove.id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favoriteDogs', JSON.stringify(updatedFavorites));

        // decrement the counter in the local storage so we can see how many items are in the favorites from the generator page
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Your Favorite Dogs</h2>

            {favorites.length === 0 ? (
                <p className="text-center text-gray-500">
                    No favorite dogs yet. Go to the generator to add some!
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map(dog => (
                        <DogCard
                            key={dog.id}
                            dog={dog}
                            onFavorite={handleRemoveFavorite}
                            isFavorite={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favourites; 