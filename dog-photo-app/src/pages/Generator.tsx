import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import DogCard from '../components/DogCard';
import Spinner from '../components/Spinner';
import { DogImage } from '../types';

/**
 * Generator component handles:
 * 1. Fetching random dog images from the Dog API
 * 2. Managing loading and saving states
 * 3. Handling favorite functionality with local storage
 * 4. Displaying toast notifications for user feedback
 * 
 * The component uses the Dog API to fetch random dog photos and
 * allows users to save their favorites to local storage.
 */
const Generator: React.FC = () => {
    const [currentDog, setCurrentDog] = useState<DogImage | null>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // call the fetchNewDog function when the component mounts
    useEffect(() => {
        fetchNewDog();
    }, []);

    const fetchNewDog = async () => {
        try {
            // show loading spinner while the dog is being fetched
            setLoading(true);
            const response = await fetch('https://api.thedogapi.com/v1/images/search', {
                headers: {
                    'x-api-key': process.env.REACT_APP_DOG_API_KEY || ''
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch dog image');
            }
            const [data] = await response.json();
            setCurrentDog({
                id: data.id,
                url: data.url,
            });
        } catch (error) {
            console.error('Error fetching dog image:', error);
            toast.error('Failed to fetch a new dog image. Please try again!');
        } finally {
            setLoading(false);
        }
    };

    const handleFavorite = async (dog: DogImage) => {
        try {
            setSaving(true);
            const favorites = JSON.parse(localStorage.getItem('favoriteDogs') || '[]');
            // check to see if the dog is already in the favorites
            if (favorites.some((fav: DogImage) => fav.id === dog.id)) {
                toast.info('This dog is already in your favorites!');
                return;
            }
            favorites.push(dog);
            localStorage.setItem('favoriteDogs', JSON.stringify(favorites));

            // update counter in the local storage so we can see how many items are in the favorites from the generator page
            window.dispatchEvent(new Event('storage'));
            toast.success('Dog added to favorites');
        } catch (error) {
            console.error('Error saving favorite:', error);
            toast.error('Failed to save to favorites. Please try again!');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
                <button
                    onClick={fetchNewDog}
                    disabled={loading}
                    className="w-full mb-8 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <Spinner />
                        </span>
                    ) : (
                        'Get New Dog'
                    )}
                </button>

                {currentDog && (
                    <div className="transform transition-all duration-200 hover:scale-[1.02]">
                        <DogCard
                            dog={currentDog}
                            onFavorite={handleFavorite}
                            isLoading={saving}
                        />
                    </div>
                )}

                {!currentDog && !loading && (
                    <p className="text-center text-gray-500">No dog image available. Click the button to fetch one!</p>
                )}
            </div>
        </div>
    );
};

export default Generator; 