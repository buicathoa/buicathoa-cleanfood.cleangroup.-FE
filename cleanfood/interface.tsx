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

export interface CartItem {
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

export interface ModalConfirm {
    title: string,
    isOpenConfirmModal: boolean,
    onConfirmOk: () => void,
    onConfirmCancel: () => void,
    confirmTitle: string,
    confirmContent: string
}