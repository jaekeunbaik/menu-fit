export interface MenuItem {
    name: string;
    reason: string;
    weather: string;
}

export type WeatherOption = 'Sunny' | 'Rainy' | 'Cold' | 'Hot';
export type ConditionOption = 'Hangover' | 'Light' | 'Heavy' | 'CompanyCard';
export type YesterdayMenuOption = 'Korean' | 'Chinese' | 'Japanese' | 'Western' | 'Other';

export interface UserContext {
    weather: WeatherOption | null;
    condition: ConditionOption | null;
    yesterday: YesterdayMenuOption | null;
}
