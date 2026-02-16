"use client";

import ServiceIdeaCard from "@/components/ServiceIdeaCard";
import BottomNav from "@/components/BottomNav";
import { Utensils, Grid, MapPin, User, ChevronRight } from "lucide-react";
import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export default function Home() {
  return (
    <main className="min-h-screen pb-24 bg-[#f2f4f6]">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-8 rounded-b-3xl shadow-sm mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            안녕하세요, <br />
            오늘도 맛있는 하루 되세요! 😋
          </h1>
          <Link href="/mypage">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-500" />
            </div>
          </Link>
        </div>

        {/* Banner Card */}
        <div className="bg-[#3182f6] p-6 rounded-3xl text-white shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-1">오늘 점심 뭐 먹지?</h2>
            <p className="text-blue-100 text-sm mb-4">
              AI가 날씨와 기분에 딱 맞는 메뉴를 골라줘요.
            </p>
            <Link
              href="/recommend"
              className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition-colors"
            >
              추천받으러 가기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] opacity-20 rotate-12">
            <Utensils className="w-32 h-32" />
          </div>
        </div>
      </div>

      <div className="px-6 space-y-8">
        {/* AdSense Area */}
        <div className="flex justify-center my-4">
          <AdUnit slot="9876543210" format="rectangle" />
        </div>

        {/* Services Grid */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4 ml-1">
            전체 서비스
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <ServiceIdeaCard
              title="메뉴 추천"
              description="결정장애 해결!"
              icon={Utensils}
              href="/recommend"
              color="bg-orange-500"
              Badge="HOT"
            />
            <ServiceIdeaCard
              title="음식 월드컵"
              description="이상형 찾기 게임"
              icon={Grid}
              href="/worldcup"
              color="bg-purple-500"
              Badge="NEW"
            />
            <ServiceIdeaCard
              title="주변 맛집"
              description="지도에서 찾기"
              icon={MapPin}
              href="https://map.kakao.com"
              color="bg-green-500"
            />
            <ServiceIdeaCard
              title="마이페이지"
              description="내 기록 보기"
              icon={User}
              href="/mypage"
              color="bg-gray-500"
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center text-gray-400 text-xs py-8">
          <p>© 2026 Menu-Fit. All rights reserved.</p>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
