import React, { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer";
import { productdata } from "../api";
import { Link } from "gatsby";
import CategoriePage from "./CategoriePage";
import Login from "./Auth";

interface ProductProps {
    price: string;
    title: string;
    location: string;
    timestamp: any;
    images: string;
}

const ProductCard: React.FC<ProductProps> = ({ price, title, timestamp, location, images,id }) => {

    const formatDate = (timestamp: string): string => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
    };
    const [isRed, setIsRed] = useState(false);
    const handleClick = () => {
        setIsRed(!isRed);
    };

    return (
        <Link to={`/product/${id}`} className="block">
            <div className=" justify-center">
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
        </Link>
    );
};

const HomePage: React.FC = () => {

    const [products, setProducts] = useState<ProductProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDisplay, setIsDisplay] = useState<boolean>(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await productdata()
                console.log(response);
                setProducts(response.data.data);
                setIsLoading(true);

            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleClick=(event)=>{
        // event.preventDefault();
        setIsDisplay(true)
    }
    return (
        <>
            <div className="w-full fixed top-0 z-50">
                <Header handleClick={handleClick} />
            </div>
            
            {isDisplay && <Login/>}
            <div className="md:block lg:hidden justify-between px-2 py-3">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search Location"
                        className="px-3 py-2 pl-8 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full h-10"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                </div>
            </div>


            <div className="md:block lg:hidden w-full px-2 py-3">
                <div className="row-1 mt-4 mb-4">
                    <p className="text-1xl font-semibold">Browse Categories</p>
                </div>
                <div className="flex overflow-x-auto space-x-5 w-full bg-white">
                    <ul className="flex-shrink-0 ">
                        <li><img src="download.jfif" className="bg-blue-500 h-20 w-20 rounded-md " alt=""
                        /></li>
                        <p>Cars</p>
                    </ul>
                    <ul className="flex-shrink-0 ">
                        <li><img src="download.jfif" className="bg-blue-500 h-20 w-20 rounded-md " alt=""
                        /></li>
                        <p>Motorcycles</p>
                    </ul>
                    <ul className="flex-shrink-0 ">
                        <li><img src="download.jfif" className="bg-blue-500 h-20 w-20 rounded-md " alt=""
                        /></li>
                        <p>Mobile Phones</p>
                    </ul>
                    <ul className="flex-shrink-0 ">
                        <li><img src="download.jfif" className="bg-blue-500 h-20 w-20 rounded-md " alt=""
                        /></li>
                        <p>Houses</p>
                    </ul>
                    <ul className="flex-shrink-0 ">
                        <li><img src="download.jfif" className="bg-blue-500 h-20 w-20 rounded-md " alt=""
                        /></li>
                        <p>Scooters</p>
                    </ul>
                    <ul className="flex-shrink-0 ">
                        <li><img src="download.jfif" className="bg-blue-500 h-20 w-20 rounded-md " alt=""
                        /></li>
                        <p>Vehicles</p>
                    </ul>
                    <ul className="flex-shrink-0 ">
                        <li><img src="download.jfif" className="bg-blue-500 h-20 w-20 rounded-md " alt=""
                        /></li>
                        <p>Apartments</p>
                    </ul>

                </div>
            </div>
            <CategoriePage />
            <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8 bg-white">
                <div className="row-1 mt-4 mb-4">
                    <p className="text-2xl font-bold text-[#042FA2]">Fresh recommendations</p>
                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
                        {products.map((product, index) => {
                            return (
                                <ProductCard
                                    key={index}
                                    price={product.price}
                                    title={product.title}
                                    location={product.location.location_name}
                                    timestamp={product.timestamp}
                                    images={product.images[0].url}
                                    id={product._id}
                                />
                            )
                        })}
                    </div>
                )}
            </div>


            <div><Footer /></div>


        </>
    )
}

export default HomePage
