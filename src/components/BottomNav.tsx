"use client";

import { Home, Utensils, Grid, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const navItems = [
        { name: "홈", path: "/", icon: Home },
        { name: "추천받기", path: "/recommend", icon: Utensils },
        { name: "월드컵", path: "/worldcup", icon: Grid },
        { name: "마이", path: "/mypage", icon: User },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe pt-2 px-6 z-50 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.03)] selection:bg-transparent">
            <div className="flex justify-between items-center max-w-md mx-auto h-16">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`flex flex-col items-center gap-1 transition-all duration-200 ${isActive(item.path)
                                ? "text-gray-900 font-bold scale-105"
                                : "text-gray-400 hover:text-gray-600"
                            }`}
                    >
                        <item.icon
                            className={`w-6 h-6 ${isActive(item.path) ? "stroke-[2.5px]" : "stroke-2"
                                }`}
                        />
                        <span className="text-[10px]">{item.name}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
