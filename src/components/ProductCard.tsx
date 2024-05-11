import React, { useState } from "react";

interface ProductProps {
    price: string;
    title: string;
    location: string;
    timestamp: any;
    images: string;
    productId: string;
    handleContClick: (productId: string) => void;
}

const ProductCard: React.FC<ProductProps> = ({ price, title, timestamp, location, images, productId, handleContClick }) => {
    const formatDate = (timestamp: string): string => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
    };

    const [isRed, setIsRed] = useState(false);

    const handleClick = () => {
        setIsRed(!isRed);
    };

    return (
        <div className="cursor-pointer" onClick={() => handleContClick(productId)}>
            <div className="rounded-lg border-solid border-2 border-[#0000001A] p-2 max-w-xs">
                <div className="relative">
                    <img className="w-full h-[200px] object-cover rounded-md" src={images} alt="Product" />
                    <div className="absolute top-0 right-0">
                        <button className={`bg-white rounded-full w-10 h-10 flex justify-center items-center`} onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill={isRed ? 'red' : 'white'} viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="justify-center columns-2 mt-6">
                    <p className="text-[#042FA2] font-bold">${price}</p>
                    <p className="text-gray-600 text-right truncate ...">{title}</p>
                </div>
                <div className="justify-center columns-2 mt-4">
                    <p className="text-gray-600 truncate ...">{location}</p>
                    <p className="text-gray-600 text-right">{formatDate(timestamp)}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;