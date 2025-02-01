import React from 'react'
import { GiBookAura } from "react-icons/gi";
import { Link } from 'react-router-dom';
 
export const  Footer = () => {
  return (
    <section className="relative w-screen text-center bg-slate-600   border-black border-4  py-10 rounded-lg ">
    <div className="relative  px-4">
        <div className=" flex flex-wrap">
            <div className="  p-6 md:w-1/2 lg:w-5/12">
                <div className="flex h-full flex-col justify-between">
                    <div className="mb-4 inline-flex items-center">
                       < GiBookAura className='lg:scale-[632%] lg:ml-52
                       ml-32 scale-[333%] mt-[-5vh] lg:mt-12 text-yellow-400'/>
                    </div>
                    <div>
                       
                        <p className="text-sm text-yellow-400">
                            &copy; Copyright 2024-25. All Rights Reserved by PostPerception.
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                <div className="h-full">
                    <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                        Company
                    </h3>
                    <ul>
                        <li className="mb-4">
                            <Link
                                className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                to="/"
                            >
                                Features
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link
                                className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                to="/"
                            >
                                Pricing
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link
                                className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                to="/"
                            >
                                Affiliate Program
                            </Link>
                        </li>
                        <li>
                            <Link
                                className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                to="/"
                            >
                                Press Kit
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                <div className="h-full">
                    <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                        Support
                    </h3>
                    <ul>
                        <li className="mb-4">
                            <Link
                                className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                to="/"
                            >
                                Account
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link
                                className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                to="/"
                            >
                                Help
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link
                                className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                to="/"
                            >
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                to="/"
                            >
                                Customer Support
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                <div className="h-full">
                    <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                        Legals
                    </h3>
                    <ul>
                        <li className="mb-4">
                            <Link
                                className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                to="/"
                            >
                                Terms &amp; Conditions
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link
                                className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                to="/"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                to="/"
                            >
                                Licensing
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default Footer;