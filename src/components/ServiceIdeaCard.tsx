import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    color: string;
    Badge?: string;
}

export default function ServiceIdeaCard({
    title,
    description,
    icon: Icon,
    href,
    color,
    Badge,
}: ServiceProps) {
    return (
        <Link
            href={href}
            className="bg-white p-6 rounded-3xl shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 group relative overflow-hidden"
        >
            <div className="flex justify-between items-start mb-4">
                <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color} text-white shadow-sm`}
                >
                    <Icon className="w-6 h-6" />
                </div>
                {Badge && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
                        {Badge}
                    </span>
                )}
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            </div>

            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0 translate-x-2">
                <ArrowRight className="w-5 h-5 text-gray-300" />
            </div>
        </Link>
    );
}
