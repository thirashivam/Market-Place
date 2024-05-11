import React, { useEffect, useState } from 'react'
import { getcategoriesdata } from '../api';

const CategoriePage = () => {
    

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(()=>{
        const fetchCategory = async () => {
            setIsLoading(true);
            try {
                const response = await getcategoriesdata()
                // console.log('cat reso',response);
                setCategories(response.data.data.categories);
                setIsLoading(true);

            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        }
        // console.log()

        fetchCategory();
    }, []);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


  return (
    <div className=" hidden md:hidden lg:block bg-gray-100 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
                    <ul className="flex flex-wrap justify-center mt-[59px]">
                        <li className="relative">
                            <div className="inline-flex items-center text-sm font-semibold text-blue-500 p-4 cursor-pointer hover:text-lime-400" onClick={toggleDropdown}>
                                ALL CATEGORIES
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 ml-1 ${isDropdownOpen ? 'transform rotate-180' : ''}`}>
                                    <path fillRule="evenodd" d="M6 9l6 6 6-6H6Z" />
                                </svg>
                            </div>
                            {isDropdownOpen && (
                                <div className="absolute mt-2 py-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                                    {categories.map((category, index) => (
                                        <a key={index} href={"#"} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">
                                            {category.title}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </li>
                        <li className="inline-flex items-center text-sm font-semibold text-blue-500 p-4 cursor-pointer hover:text-lime-400">
                            Cars
                        </li>
                        <li className="inline-flex items-center text-sm font-semibold text-blue-500 p-4 cursor-pointer hover:text-lime-400">
                            Motorcycles
                        </li>
                        <li className="inline-flex items-center text-sm font-semibold text-blue-500 p-4 cursor-pointer hover:text-lime-400">
                            Mobile Phones
                        </li>
                        <li className="inline-flex items-center text-sm font-semibold text-blue-500 p-4 cursor-pointer hover:text-lime-400">
                            For Sale: Houses & Apartments
                        </li>
                        <li className="inline-flex items-center text-sm font-semibold text-blue-500 p-4 cursor-pointer hover:text-lime-400">
                            Scooters
                        </li>
                        <li className="inline-flex items-center text-sm font-semibold text-blue-500 p-4 cursor-pointer hover:text-lime-400">
                            Commercial & Other Vehicles
                        </li>
                        <li className="inline-flex items-center text-sm font-semibold text-blue-500 p-4 cursor-pointer hover:text-lime-400">
                            For Rent: Houses & Apartments
                        </li>
                    </ul>
                </div>
  )
}

export default CategoriePage