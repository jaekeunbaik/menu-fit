'use client';

import { useState } from 'react';
import { UserContext, MenuItem } from '@/lib/types';
import Hero from '@/components/Hero';
import ContextSelection from '@/components/ContextSelection';
import ResultCard from '@/components/ResultCard';
import { getRecommendations } from '@/lib/api';
import { Sparkles } from 'lucide-react';
import AdUnit from '@/components/AdUnit';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  const [context, setContext] = useState<UserContext>({
    weather: null,
    condition: null,
    yesterday: null,
  });

  const [recommendations, setRecommendations] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleUpdateContext = (key: keyof UserContext, value: string | number) => {
    setContext(prev => ({ ...prev, [key]: value }));
  };

  const handleRecommendation = async () => {
    if (!context.weather || !context.condition || !context.yesterday) {
      alert('모든 조건을 선택해주세요!');
      return;
    }

    setLoading(true);
    setHasSearched(true);
    setRecommendations([]); // clear previous

    try {
      const results = await getRecommendations(context);
      setRecommendations(results);
    } catch (error) {
      console.error("Error getting recommendations:", error);
      alert("추천을 가져오는 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white pb-20">
      <Hero />

      <div className="px-4">
        <ContextSelection selection={context} onUpdate={handleUpdateContext} />

        <div className="mt-10 text-center">
          <button
            onClick={handleRecommendation}
            disabled={loading}
            className={`
              inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold text-white shadow-lg shadow-fresh-green/30 transition-all duration-300
              ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-fresh-green hover:bg-green-500 hover:scale-105 active:scale-95'
              }
            `}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                AI가 메뉴 분석 중...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                오늘의 메뉴 추천받기
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {hasSearched && (
          <div className="max-w-6xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
              {loading ? '' : '오늘 제안하는 메뉴핏은...!'}
            </h2>

            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendations.map((menu, index) => (
                  <div key={index} className="transition-all duration-500 ease-in-out">
                    <ResultCard menu={menu} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-20 flex justify-center pb-20">
        <AdUnit slot="9876543210" />
      </div>
      <BottomNav />
    </main >
  );
}
