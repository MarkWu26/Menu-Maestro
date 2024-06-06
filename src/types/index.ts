export type ItemOption = {
    name: string;
    price?: number;
    quantity?: number;
    cost?: number
};

export type item = {
    id: string;
    category: string;
    image: string;
    name: string;
    cost?: number
    optionName?: string;
    optionQuantity?: number
    options?: ItemOption [];
    price?: number
    quantity?: number
}