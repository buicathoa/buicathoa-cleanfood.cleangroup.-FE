//Event Interface

import { Moment } from "moment"

//General Component Interface
export interface MenuTableDataItem{
    breakfast_en: string,
    breakfast_vi: string,
    createdAt: Date,
    date: Date,
    dinner_en: string,
    dinner_vi: string,
    is_expired: boolean,
    lunch_en: string,
    lunch_vi: string,
    _id: string
}

export interface ProductItemInterface {
    createdAt?: Date,
    description?: string,
    image?: string,
    sub_title?: string,
    title?: string,
    url_generated?: string,
    price_per_meal?: number,
    updatedAt?: Date,
    __v?: number,
    _id?: string,
    product_type?: string
}

export interface listProduct{
    listProduct: ProductItemInterface[]
}

export interface listMenuTableData{
    listMenu: MenuTableDataItem[]
}

export interface MenuTableData extends listMenuTableData{
    titleHeader: titleHeaders[],
    type: string
}

export interface titleHeaders {
    key: string,
    label: string
}

export interface ModalInterface {
    title?: string,
    visible?: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    confirmTitle?: string,
    confirmContent?: string
}

export interface ModalInterfaceConfirm extends ModalInterface {
    onConfirmModal: () => void,
    onConfirmCancelModal: () => void,
}

export interface AddressItemComponentInterface {
    isOpenAddressModal?: boolean,
    setIsOpenAddressModal: React.Dispatch<React.SetStateAction<boolean>>,
    listDeliveryAddress?: DeliveryItemInterface[]
}
////////////////////////////////////////////////////////

//Response From api
export interface ResponseFormatItem {
    code?: number,
    data?: {
        data?: any,
        total_price?: number,
        original_price?: number
    },
    token?: string,
    message?: string
}

export interface CartItemInterface {
    cart_id?: string,
    daily_calories?: string,
    mealplans?: string,
    price?: number,
    product_info?: ProductItemInterface,
    quantity?: number,
    session?: string,
    total_price?: number,
    _id?: string
}

export interface listCartsInterface {
    list_carts?: Array<CartItemInterface>,
    total_price?: number,
    total_quantity?: number
}

export interface DeliveryItemInterface {
    address_detail: string,
    default_address: boolean,
    delivery_time: Array<Moment>,
    district_id: string,
    province_id: string,
    ward_id: string,
    full_address: string,
    full_name: string,
    phone_number: string,
    user: string,
    createdAt?: Date,
    updatedAt?: Date,
    __v?: number,
    _id?: string
}

export interface ProvinceInterface {
    province_id: string,
    province_name: string,
    _v?:number,
    _id?: string
}

export interface DistrictInterface {
    district_id: string,
    district_name: string,
    province_id: string,
    _v?:number,
    _id?: string
}

export interface WardInterface {
    district_id: string,
    ward_id: string,
    ward_name: string,
    _v?:number,
    _id?: string
}

////////// Reducer Interface
export interface UserReducer {
    user: any,
    listDeliveryAddress: any[]
}

//Payload Api
export interface UserPayloadApi {
    firstname: string,
    lastname: string,
    gender: string,
    phone_number: string,
    username: string
}

export interface DeliveryPayloadApi{
    address_detail: string,
    default_address: boolean,
    delivery_address_id?: string,
    _id?:string,
    delivery_time: Array<Moment>,
    district_id: string,
    province_id: string,
    ward_id: string,
    phone_number: string,
    full_name: string
}
