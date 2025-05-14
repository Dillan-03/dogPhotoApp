import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

//  NavBar component for navigation between the 2 pages
const NavBar: React.FC = () => {
    const location = useLocation();
    const [favoriteCount, setFavoriteCount] = useState(0);

    // Update favorite count whenever location changes or local storage updates
    useEffect(() => {
        const updateFavoriteCount = () => {
            const favorites = JSON.parse(localStorage.getItem('favoriteDogs') || '[]');
            setFavoriteCount(favorites.length);
        };

        // initial count
        updateFavoriteCount();

        // Listen for storage changes
        window.addEventListener('storage', updateFavoriteCount);

        return () => {
            window.removeEventListener('storage', updateFavoriteCount);
        };
    }, [location]);


    // check which page the user is on and style accordingly
    const isActive = (path: string): boolean => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* App title/logo */}
                    <Link
                        to="/"
                        className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        Dog Photo App
                    </Link>

                    {/* If the link is active then change the background color to blue */}
                    <div className="flex space-x-4">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                                ${isActive('/')
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                        >
                            Generator
                        </Link>
                        <Link
                            to="/favourites"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative
                                ${isActive('/favourites')
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                        >
                            Favourites
                            {favoriteCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {favoriteCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar; 