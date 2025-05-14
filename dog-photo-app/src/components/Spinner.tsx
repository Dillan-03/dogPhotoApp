import React from 'react';
import { PulseLoader } from 'react-spinners';

// Uses a reuseable spinning icon 
const Spinner: React.FC = ({
}) => {
    return (
        <div className={`flex justify-center items-center`}>
            <PulseLoader
                color={"#3B82F6"}
                size={10}
                speedMultiplier={0.8}
            />
        </div>
    );
};

export default Spinner; 