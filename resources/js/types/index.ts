export type * from './auth';

export interface Bundle {
    name: string;
    qty: number;
    normalPrice: number;
    specialPrice: number;
    tag: string;
    highlight: boolean;
}

export interface Feature {
    icon: string;
    title: string;
    desc: string;
    color: string;
}

export interface Review {
    type: 'beforeafter' | 'video' | 'chat'|'buyagain';
    title: string;
    imgBefore?: string;
    imgAfter?: string;
    videoThumb?: string;
    chatImg?: string;
    desc: string;
}

export interface CheckoutFormData {
    name: string;
    phone: string;
    address: string;
    zipcode: string;
    package: string;
    payment: 'cod' | 'card';
}
