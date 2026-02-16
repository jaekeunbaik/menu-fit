'use client';

import { MenuItem } from '@/lib/types';
import { MapPin, Sun, CloudRain, ThermometerSnowflake, Flame } from 'lucide-react';
import Image from 'next/image';
import { getKakaoMapUrl, getNaverMapUrl } from '@/lib/mapUtils';

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


    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
            <div className="relative h-48 bg-gray-200">
                <Image
                    src={`https://loremflickr.com/400/200/${menu.engName.replace(/\s+/g, ',')},food/all`}
                    alt={menu.name}
                    fill
                    className="object-cover"
                    unoptimized
                />
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

                <div className="flex gap-2">
                    <a
                        href={getKakaoMapUrl(menu.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FEE500] text-black font-bold hover:brightness-95 transition-all duration-200"
                    >
                        <MapPin className="w-4 h-4" />
                        카카오맵
                    </a>
                    <a
                        href={getNaverMapUrl(menu.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#03C75A] text-white font-bold hover:brightness-95 transition-all duration-200"
                    >
                        <MapPin className="w-4 h-4" />
                        네이버지도
                    </a>
                </div>
            </div>
        </div>
    );
}
