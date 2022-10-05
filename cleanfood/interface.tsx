export interface NewsItemInterface {
    pageType: string,
    type: string
}

export interface UserInforInterface {
    _id: string,
    username: string,
    email: string,
    firstname: string,
    lastname: string,
    is_active: boolean,
    is_admin: boolean,
    province_id: string,
    district_id: string,
    ward_id: string,
    address_detail: string,
    full_address: string,
    phone_number: string,
    avatar: string,
    fullname: string
}
///Modal
export interface InterfaceModalCategory {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    categorySelected?: CategoryInterface,
    setCategorySelected: React.Dispatch<React.SetStateAction<CategoryInterface>>,
    setSubcategorySelected: React.Dispatch<React.SetStateAction<SubcategoryInterface>>
}

export interface InterfaceModalAddress {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setFullAddress?: React.Dispatch<React.SetStateAction<Array<string>>>,
    fullAddress?: Array<string>,
    citySelected: locationSelectedInterface,
    setCitySelected: React.Dispatch<React.SetStateAction<locationSelectedInterface | undefined>>,
    districtSelected: locationSelectedInterface,
    setDistrictSelected: React.Dispatch<React.SetStateAction<locationSelectedInterface | undefined>>,
    wardSelected: locationSelectedInterface,
    setWardsSelected: React.Dispatch<React.SetStateAction<locationSelectedInterface | undefined>>,
    listCity: Array<CityInterface>,
    setListCity: React.Dispatch<React.SetStateAction<Array<CityInterface>>>,
    listDistrict: Array<DistrictInterface>,
    setListDistrict: React.Dispatch<React.SetStateAction<Array<DistrictInterface>>>,
    listWard: Array<WardInterface>,
    setListWard: React.Dispatch<React.SetStateAction<Array<WardInterface>>>,
    addressDetail: string,
    setAddressDetail: React.Dispatch<React.SetStateAction<string>>,
    setIsChangeFullAddress: React.Dispatch<React.SetStateAction<boolean>>
}

export interface CityInterface {
    province_id: string,
    province_name: string,
    param_url: string,
    label?: string,
    value?: string
}

export interface DistrictInterface {
    district_id: string,
    district_name: string,
    province_id: string,
    param_url: string,
    label?: string,
    value?: string
}

export interface WardInterface {
    ward_id: string,
    ward_name: string,
    district_id: string,
    param_url: string,
    label?: string,
    value?: string
}
///
export interface ModelInterface {
    _id: string,
    model_id: string,
    title: string,
    brand_id: string,
    category_id: string,
    subcategory_id: string,
    param_url: string,
}
export interface BrandInterface {
    _id: string,
    brand_id: string,
    title: string,
    category_id: string,
    subcategory_id: string,
    param_url: string,
    models: Array<ModelInterface>
}
export interface SubcategoryInterface {
    _id: string,
    category_id: string,
    param_url: string,
    province_id: string,
    title: string
}

export interface CategoryInterface {
    _id: string,
    image: string,
    param_url: string,
    sub_categories: SubcategoryInterface[],
    title: string
}

export interface FilterInterface {
    _id: string,
    keyEN: string,
    keyVI: string,
    is_required: boolean,
    subCategory_id: string,
    droplist_value_option: string,
    width: number
}

//component
//=========================/
export interface NewsDetailInterface {
    type: string
}

//post
//=============================//
export interface dynamicAttributesInterface {
    name: string,
    value: string
}
export interface PostNewsInterface {
    title: string,
    description: string,
    price: string,
    province_id: string,
    district_id: string,
    ward_id: string,
    address_detail?: string,
    seller_type: string,
    is_give_away: boolean,
    position?: number,
    is_pinned?: boolean,
    status?: string,
    attribute: Array<dynamicAttributesInterface[]>
    image: [
        {preview?: string}
    ],
    full_address: string
}

//Dynamic used for specific component
//Dang-tin
export interface locationSelectedInterface {
    label?: string,
    value?: string
}

// export interface listImageInterface {
//     preview: string,
//     name: string
// }

//Response from api
//=========================//
export interface ResponseFormatList {
    code: number,
    data: {
        data: Array<any>
    },
    message: string
}

export interface ResponseFormatItem {
    code: number,
    data: {
        data: any
    },
    message: string
}
