//Event Interface

import { min } from "lodash"
import { Moment } from "moment"

//General Component Interface
export interface EditOrderTrackingInterface {
    trackingDaySelected: string,
    setIsEditTrackingOrder: React.Dispatch<React.SetStateAction<boolean>>
}
export interface MenuTableDataItem {
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

export interface listProduct {
    listProduct: ProductItemInterface[]
}

export interface listMenuTableData {
    listMenu: MenuTableDataItem[]
}

export interface MenuTableData extends listMenuTableData {
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
    confirmContent?: string,
    paymentSelected?: { name: string, value: string },
}

export interface ModalAddressInterface extends ModalInterface {
    addressSelected?: DeliveryItemInterface,
    setAddressSelected: React.Dispatch<React.SetStateAction<DeliveryItemInterface>>
}

export interface ModalTrackingOrderInterface extends ModalInterface {
    trackingDaySelected: string
}

export interface ModalPaymentInterface extends ModalInterface {
    setPaymentSelected: React.Dispatch<React.SetStateAction<{ name: string, value: string }>>
}
export interface ModalInterfaceConfirm extends ModalInterface {
    onConfirmModal: (value: string) => void,
    onConfirmCancelModal: () => void,
    modalType?: string
}

export interface AddressItemComponentInterface {
    setIsOpenAddressModal: React.Dispatch<React.SetStateAction<boolean>>,
    addressSelected?: DeliveryItemInterface
}
////////////////////////////////////////////////////////

//Response From api
export interface OrderCancelInterface {
    _id?: string,
    product?: string,
    calories?: string,
    session?: string,
    order_day_id?: string,
    user_id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    mealplans?: string,
    order_code?: string,
    __v?: number
}
export interface OrderTrackingInterface {
    address_detail?: string,
    calories?: string,
    createdAt?: Date,
    district_id?: string,
    end?: Date,
    full_name?: string,
    mealplans?: string,
    order_status?: string,
    phone_number?: string,
    product?: string,
    province_id?: string,
    session?: string,
    ship_place?: string,
    start?: Date
    updatedAt?: Date,
    user_id?: string,
    ward_id?: string,
    __v?: number
    _id?: string,
    order_code?: string
}
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

export interface ResponseFormatObjectItemInterface {
    code?: number,
    data: any,
    message?: string
}
export interface ResponseFormatListInterface {
    code?: number,
    data?: Array<any>,
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
    address_detail?: string,
    default_address?: boolean,
    delivery_time?: Array<Moment>,
    district_id?: string,
    province_id?: string,
    ward_id?: string,
    full_address?: string,
    full_name?: string,
    phone_number?: string,
    user?: string,
    createdAt?: Date,
    updatedAt?: Date,
    __v?: number,
    _id?: string
}

export interface ProvinceInterface {
    province_id: string,
    province_name: string,
    _v?: number,
    _id?: string
}

export interface DistrictInterface {
    district_id: string,
    district_name: string,
    province_id: string,
    _v?: number,
    _id?: string
}

export interface WardInterface {
    district_id: string,
    ward_id: string,
    ward_name: string,
    _v?: number,
    _id?: string
}

////////// Reducer Interface
export interface UserReducerInterface {
    user: any,
    listDeliveryAddress: any[]
}

export interface CartReducerInterface {
    listCartQuantity: number,
    listCart: listCartsInterface,
    updateCart: boolean
}

//Payload Api
export interface UserPayloadApi {
    firstname: string,
    lastname: string,
    gender: string,
    phone_number: string,
    username: string
}

export interface DeliveryPayloadApi {
    address_detail: string,
    default_address: boolean,
    delivery_address_id?: string,
    _id?: string,
    delivery_time: Array<Moment>,
    district_id: string,
    province_id: string,
    ward_id: string,
    phone_number: string,
    full_name: string
}

export interface OrderTrackingInterfaceConvert {
    start?: string,
    end?: string,
    title?: string,
    id?: string,
    extendedProps?: {
        calories?: string,
        session?: string,
        mealplans?: string,
        province_id?: string,
        district_id?: string,
        ward_id?: string,
        address_detail?: string,
        ship_place?: string,
        order_status?: string
    }
}