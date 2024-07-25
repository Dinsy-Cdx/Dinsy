import React from "react";
import { FiCheck } from "react-icons/fi";

interface PricingCardProps {
    planType: {
        id: number;
        title: string;
        price: string;
        subtitle: string;
        features: string[];
        buttonLabel: string;
        buttonLink: string;
    };
}

const formatPrice = (price: string) => {
    const numPrice = parseInt(price, 10);
    if (numPrice >= 1000000) {
        return `${(numPrice / 1000000)} M`;
    } else if (numPrice >= 1000) {
        return `${(numPrice / 1000)} mil`;
    } else {
        return `${numPrice}`;
    }
};

const PricingCard: React.FC<PricingCardProps> = ({ planType }) => {
    const formattedPrice = formatPrice(planType.price);

    return (
        <div className="flex flex-col w-72 h-[800px]">
            <div className="p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col h-full">
                <div className="flex-1">
                    <h3 className="flex text-xl font-semibold justify-center">{planType.title}</h3>
                    <p className="mt-4 flex items-baseline justify-center">
                        <span className="text-5xl font-extrabold tracking-tight"> ${formattedPrice}</span>
                    </p>
                    <p className="mt-6 flex justify-center">{planType.subtitle}</p>
                    <ul role="list" className="mt-6 space-y-6">
                        {planType.features.map((feature, index) => (
                            <li key={index} className="flex flex-row">
                                <FiCheck />
                                <span className="ml-3">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <a
                    className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 mt-8 block w-full py-3 px-6 border border-transparent rounded-xl text-center font-medium"
                    href={planType.buttonLink}
                >
                    {planType.buttonLabel}
                </a>
            </div>
        </div>
    );
};

export default PricingCard;
