import type {Wholesale} from './wholesale.interface';

export interface Product {
    productId: string;
    code: string;
    createDt: number;
    expired: boolean;
    imgPaths: string[];
    category: {
        gender: string;
        itemType: string;
        itemLarge: string;
        itemMiddle: string;
    };
    name: string;
    price: number;
    updateDt: number;
    wholesale: Wholesale;
    similar?: Product[];
}
