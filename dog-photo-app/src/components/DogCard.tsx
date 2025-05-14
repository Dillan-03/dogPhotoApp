import React from 'react';
import { DogImage } from '../types';
import Spinner from './Spinner';

interface DogCardProps {
    dog: DogImage;
    onFavorite?: (dog: DogImage) => void; // callback function when favorite button is clicked
    isFavorite?: boolean;
    isLoading?: boolean;
}

const DogCard: React.FC<DogCardProps> = ({
    dog,
    onFavorite,
    isFavorite = false,
    isLoading = false
}) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
                <img
                    src={dog.url}
                    alt="Dog"
                    className="w-full h-64 object-cover"
                    loading="lazy"
                />
                {/* Favorite button with loading state */}
                <button
                    onClick={() => !isLoading && onFavorite?.(dog)}
                    disabled={isLoading}
                    className={`absolute top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur-sm 
                        ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-white hover:scale-110'}
                        ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}
                        transition-all duration-200 ease-in-out shadow-lg`}
                >
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        // heart icon for favorite button
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill={isFavorite ? 'currentColor' : 'none'}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};

export default DogCard; 