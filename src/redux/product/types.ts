export type SearchProductParams = {
    sortBy: string,
    order: string,
    category: string,
    search: string,
    currentPage: string
}
export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;
    ok: boolean;
    favorited: boolean;
}
export type ProductBlockProps = {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    saleImg: string;
    count: number;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface ProductSliceState {
    sneakers: Product[];
    status: Status
}