export const getKakaoMapUrl = (query: string) => {
    return `https://map.kakao.com/link/search/${encodeURIComponent(query)}`;
};

export const getNaverMapUrl = (query: string) => {
    return `https://map.naver.com/p/search/${encodeURIComponent(query)}`;
};
