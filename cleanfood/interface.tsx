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

export interface ComboItem {
    createdAt?: Date,
    package_description?: string,
    package_image?: string,
    package_sub_title?: string,
    package_title?: string,
    package_url_generated?: string,
    price_per_meal?: number,
    updatedAt?: Date,
    __v?: number,
    _id?: string
}

export interface listCombo{
    listCombo: ComboItem[]
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
        data?: any
    },
    message?: string
}

export interface ProductItemInterface{
    image?: string,
    title?: string,
    content?: string,
    minimum_price?: number
}