import {Status} from "../product/types";

export type FavoritesItem = {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    saleImg: string;
    count: number;
}

export interface FavoritesSliceState {
    favorites: Array<number>;
    favItem: FavoritesItem[],
    status: Status
}
