export interface NaverSearch {
    lastBuildDate: string;
    total: number;
    start: number;
    display: number;
    items: {
        address: string,
        category: string,
        description: string,
        link: string,
        mapx: number,
        mapy: number,
        roadAddress: string,
        telephone: string,
        title: string
    }[];
};