'use client';

import { MenuItem } from '@/lib/types';
import { MapPin, Sun, CloudRain, ThermometerSnowflake, Flame } from 'lucide-react';
import Image from 'next/image';

interface ResultCardProps {
    menu: MenuItem;
}

export default function ResultCard({ menu }: ResultCardProps) {
    const getWeatherIcon = (weather: string) => {
        switch (weather) {
            case 'Sunny': return <Sun className="w-4 h-4 text-orange-500" />;
            case 'Rainy': return <CloudRain className="w-4 h-4 text-blue-500" />;
            case 'Cold': return <ThermometerSnowflake className="w-4 h-4 text-cyan-500" />;
            case 'Hot': return <Flame className="w-4 h-4 text-red-500" />;
            default: return <Sun className="w-4 h-4 text-gray-400" />;
        }
    };

    const gmapUrl = `https://www.google.com/maps/search/주변+${encodeURIComponent(menu.name)}`;

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
            <div className="relative h-48 bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    {/* Placeholder Image using next/image with a placeholder service or just a div */}
                    <span className="text-4xl">🍽️</span>
                </div>
                {/* If we had real images, we would use Next.js Image component here */}
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{menu.name}</h3>
                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 text-xs text-gray-500">
                        {getWeatherIcon(menu.weather)}
                        <span>{menu.weather}</span>
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-6 flex-1 line-clamp-3">
                    {menu.reason}
                </p>

                <a
                    href={gmapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-fresh-green/10 text-fresh-green font-bold hover:bg-fresh-green hover:text-white transition-colors duration-200"
                >
                    <MapPin className="w-4 h-4" />
                    근처 맛집 찾기
                </a>
            </div>
        </div>
    );
}
