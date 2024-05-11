import * as React from "react"
import { Link } from "gatsby"
import { useEffect, useState } from "react";
import { getProductById } from "../../api";
import Header from "../../components/Header";
import CategoriePage from "../CategoriePage";
import Footer from "../../components/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


interface ProductProps {
    price: string;
    title: string;
    location: string;
    timestamp: any;
    images: string;
}

const ProductCard: React.FC<ProductProps> = ({ price, title, timestamp, location, images }) => {

    const formatDate = (timestamp: string): string => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
    };
    const [isRed, setIsRed] = useState(false);
    const handleClick = () => {
        setIsRed(!isRed);
    };

    return (
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
    );
};



function ProductCatchAll({ params }) {

    const [product, setProduct] = useState(null);
    const [Loading, setLoading] = useState(true);
    const [relatedProducts, setrelatedProducts] = useState(null);
    const [rating, setrating] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            //   setIsLoading(true);
            try {
                const response = await getProductById(params.detail);
                console.log(response.data.data);
                setProduct(response.data.data.product[0]);
                setrelatedProducts(response.data.data.relatedProducts)
                setrating(response.data.data.rating)
                setLoading(false);
            } catch (error) {
                // setError("Failed to fetch product details");
                // setIsLoading(false);
            }
        };

        fetchProduct();
    }, [params.detail]);
    console.log(relatedProducts)

    console.log(product)


    const formattimestamp = (time: string): string => {
        const date = new Date(time * 1000);
        return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
    };

    return (
        <>
            <div className="w-full fixed top-0 z-50">
                <Header />
            </div>
            <CategoriePage />
            <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-7 mb-5">
                    <Carousel className="rounded-lg border-solid border-2 border-[#0000001a] p-3">
                        {product?.images.map((image, index) => (
                            <div key={index}>
                                <img src={image.url} className="object-cover" alt="Product Image" />
                            </div>
                        ))}
                    </Carousel>


                    
                    <div className="grid grid-row-1 sm:grid-row-3 gap-4">
                        <div className="border-solid border-2 border-[#0000001a] rounded-lg p-2">
                            <div className="justify-center columns-1 mt-2">
                                <p className="font-sans text-2xl font-bold text-[#042FA2]">$ {product?.price}</p>
                            </div>
                            <div className="justify-center columns-1 mt-4">
                                <p className="text-gray-600 text-1xl font-medium">{(product?.title)}</p>
                            </div>
                            <div className="justify-center columns-2 mt-4">
                                <p className="text-gray-600 truncate ...">{product?.user_data[0].location}</p>
                                <p className="text-gray-600 text-right">{formattimestamp(product?.time)}</p>
                            </div>
                        </div>




                        <div className="border-solid border-2 border-[#0000001a] rounded-lg p-2">
                            <div className="justify-center columns-2 mt-2">
                                <p className="font-sans text-2xl font-bold text-gray-600">Profile Information</p>
                                <a href="/" className="flex text-gray-600 text-right justify-end ">View profile</a>
                            </div>
                            <div className="flex items-center mt-5">
                                <div className="flex-initial w-[200px]">
                                    <div className="relative inline-block h-[140px] w-[140px] !rounded-full overflow-hidden">
                                        <img
                                            src={product?.user_profile_image}
                                            alt="avatar"
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                </div>

                                <div className="flex-initial w-1/2">
                                    <div>
                                        <p className="font-sans text-2xl font-bold text-gray-600 mb-4">{product?.user_data[0]?.name}</p>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="Yellow" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-gray-600">{rating}</p>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="Red" className="w-6 h-6 mr-2">
                                            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-gray-600">{product?.user_data[0]?.location}</p>
                                    </div>
                                </div>
                            </div>

                        </div>



                        <div className="border-solid border-2 border-[#0000001a] rounded-lg p-2">
                            <div className="flex items-center mb-2 mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="Red" className="w-7 h-7">
                                    <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clip-rule="evenodd" />
                                </svg>
                                <p className="text-gray-600 font-sans text-1xl font-bold">Send seller a message</p>
                            </div>

                            <div className="max-w-md mx-auto mb-7">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="Red" className="w-6 h-6">
                                            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                                            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                                        </svg>
                                    </div>
                                    <input type="text" placeholder="Hello, I’m interested............"
                                        className=" pl-10 pr-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-red-600 w-full"
                                    />
                                    <button className="text-white absolute end-2.5 bottom-2.0 top-[3px] right-[3px] bg-red-700 hover:bg-red-600 font-medium rounded-full text-sm px-4 py-2 ">Send</button>
                                </div>
                            </div>
                            <div className="columns-3 justify-center">
                                <div className="flex justify-center cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-red-600">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </div>
                                <div className="flex justify-center cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="Red" className="w-6 h-6">
                                        <path fill-rule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex justify-center cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="Green" className="w-6 h-6">
                                        <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 border-solid border-2 border-[#0000001a] p-1 rounded-md mb-5">
                    <div className="justify-center columns-1 mt-2 mb-4">
                        <p className="font-sans text-2xl font-bold text-gray-600">Description</p>
                    </div>
                    <div>
                        <p className="fout-sans text-gray-950">{product?.description}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 border-solid border-2 border-[#0000001a] p-1 rounded-md">
                    <div className="justify-center columns-1 mb-2 p-2">
                        <p className="font-sans text-2xl font-bold text-gray-600">Sponsored</p>
                    </div>



                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {relatedProducts?.map((product, index) => {
                            return (
                                <ProductCard
                                    key={index}
                                    price={product.price}
                                    title={product.title}
                                    location={product.location.location_name}
                                    timestamp={product.timestamp}
                                    images={product.images[0].url}
                                />
                            )
                        })}
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProductCatchAll