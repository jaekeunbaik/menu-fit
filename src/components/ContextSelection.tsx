'use client';

import { WeatherOption, ConditionOption, YesterdayMenuOption, UserContext } from '@/lib/types';
import { Sun, CloudRain, ThermometerSnowflake, Flame, Beer, Feather, Utensils, CreditCard } from 'lucide-react';

interface ContextSelectionProps {
    selection: UserContext;
    onUpdate: (key: keyof UserContext, value: string | number) => void;
}

export default function ContextSelection({ selection, onUpdate }: ContextSelectionProps) {
    const weatherOptions: { value: WeatherOption; label: string; icon: React.ReactNode }[] = [
        { value: 'Sunny', label: '맑음', icon: <Sun className="w-5 h-5 text-orange-500" /> },
        { value: 'Rainy', label: '비', icon: <CloudRain className="w-5 h-5 text-blue-500" /> },
        { value: 'Cold', label: '추위', icon: <ThermometerSnowflake className="w-5 h-5 text-cyan-500" /> },
        { value: 'Hot', label: '더위', icon: <Flame className="w-5 h-5 text-red-500" /> },
    ];

    const conditionOptions: { value: ConditionOption; label: string; icon: React.ReactNode }[] = [
        { value: 'Hangover', label: '해장필요', icon: <Beer className="w-5 h-5 text-amber-500" /> },
        { value: 'Light', label: '가볍게', icon: <Feather className="w-5 h-5 text-green-500" /> },
        { value: 'Heavy', label: '든든하게', icon: <Utensils className="w-5 h-5 text-orange-700" /> },
        { value: 'CompanyCard', label: '법카찬스', icon: <CreditCard className="w-5 h-5 text-purple-600" /> },
    ];

    const yesterdayOptions: { value: YesterdayMenuOption; label: string }[] = [
        { value: 'Korean', label: '한식' },
        { value: 'Chinese', label: '중식' },
        { value: 'Japanese', label: '일식' },
        { value: 'Western', label: '양식' },
        { value: 'Other', label: '기타' },
    ];

    return (
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto space-y-8 border border-gray-100">

            {/* Weather Selection */}
            <div className="space-y-3">
                <label className="text-gray-900 font-bold text-lg block pl-1">오늘 날씨는 어떤가요?</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {weatherOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => onUpdate('weather', option.value)}
                            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border transition-all duration-200 ${selection.weather === option.value
                                ? 'bg-fresh-green/10 border-fresh-green text-fresh-green ring-2 ring-fresh-green/20 font-bold'
                                : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100 hover:border-gray-200'
                                }`}
                        >
                            {option.icon}
                            <span>{option.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Condition Selection */}
            <div className="space-y-3">
                <label className="text-gray-900 font-bold text-lg block pl-1">현재 컨디션은?</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {conditionOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => onUpdate('condition', option.value)}
                            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border transition-all duration-200 ${selection.condition === option.value
                                ? 'bg-fresh-green/10 border-fresh-green text-fresh-green ring-2 ring-fresh-green/20 font-bold'
                                : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100 hover:border-gray-200'
                                }`}
                        >
                            {option.icon}
                            <span>{option.label}</span>
                        </button>
                    ))}
                </div>

                {/* Company Card Amount Input */}
                {selection.condition === 'CompanyCard' && (
                    <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">사용 가능 금액 (원)</label>
                        <input
                            type="number"
                            placeholder="예: 30000"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-fresh-green focus:border-fresh-green outline-none transition-all"
                            value={selection.amount || ''}
                            onChange={(e) => onUpdate('amount', parseInt(e.target.value) || 0)}
                        />
                    </div>
                )}
            </div>

            {/* Yesterday's Meal Selection */}
            <div className="space-y-3">
                <label className="text-gray-900 font-bold text-lg block pl-1">어제 먹은 음식 종류는?</label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {yesterdayOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => onUpdate('yesterday', option.value)}
                            className={`py-3 px-2 rounded-xl border transition-all duration-200 text-sm md:text-base ${selection.yesterday === option.value
                                ? 'bg-fresh-green/10 border-fresh-green text-fresh-green ring-2 ring-fresh-green/20 font-bold'
                                : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100 hover:border-gray-200'
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
}
