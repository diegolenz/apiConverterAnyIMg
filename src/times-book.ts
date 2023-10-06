export interface TimesBook {
    id:number;
    page: number;
    content: string;
}

export interface TimesBookPageResponse {
    pages: TimesBookPageData;
}

export interface TimesBookPageData {
    data: TimesBookPage[];
    total: number;
    current_page: number;
    per_page: number;
}

export interface TimesBookPage {
    page: number;
    content: string;
}