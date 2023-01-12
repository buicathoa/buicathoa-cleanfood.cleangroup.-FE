export const BASE_URL = 'http://localhost:3000/v1'
export const HREF = 'http://localhost:3000/'
export const apiUrl = {
    generalMenus: {
        getAll: 'general-menu/menu/get-all',
        createDaysRegister: 'general-menu/day-register/create',
        getDaysRegister: 'general-menu/day-register/get-all',
        getOneDayRegister: 'general-menu/day-register/get-by-id',
        updateDaysRegister: 'general-menu/day-register/update',
        cancelDayRegister: 'general-menu/day-register/cancel',
        recoverDayRegister: 'general-menu/day-register/recover',
        getAllOrderDaysCancel: 'general-menu/day-register/order-cancel/get-all',
        createSupplement: 'general-menu/day-register/order-cancel/create-supplement'
    },
    product: {
        getAll: 'product/get-all',
        getByRoute: 'product/get-by-route',
        getMoneyCost: 'product/get-cost',
    },
    cart: {
        getCartByUser: 'cart/get-cart-by-user',
        add: 'cart/add',
        update: 'cart/update-quantity',
        delete: 'cart/remove-cart-item'
    },
    auth: {
        login: 'auth/login'
    },
    user: {
        getUserInfo: 'user/get-user-info',
        update: 'user/update',
        uploadAvatar: 'user/upload-avatar',
        delivery: {
            create: 'delivery/create',
            update: 'delivery/update',
            getAll: 'delivery/get-all',
        }
    },
    post: {
        uploadImage: 'upload/image',
        createNewPost: 'posts/create'
    },
    location: {
        getAllCity: 'location/province/get-all',
        getDistrictByCity: 'location/district/get-by-id',
        getWardByDistrict: 'location/ward/get-by-id'
    },
    order: {
        purchase: 'order/purchase'
    }
}

export const optionsCalories = [
    {
        value: 0,
        label: 'Chưa xác định',
    },
    {
        value: 1,
        label: '1100 kcal',
    },
    {
        value: 2,
        label: '1500 kcal',
    },
    {
        value: 3,
        label: '2000 kcal',
    },
    {
        value: 4,
        label: '2500 kcal',
    },
    {
        value: 5,
        label: '3000 kcal',
    },
]

export const optionsMealPlansSession = [
    {
        value: 1,
        label: 'Sáng - Trưa',
    },
    {
        value: 2,
        label: 'Trưa - Tối',

    },
    {
        value: 3,
        label: 'Sáng - Tối',
    },
    {
        value: 4,
        label: 'Sáng - Trưa - Tối',
    },
]

export const optionsMealPlans = [
    {
        value: 1,
        label: '1 tuần',
    },
    {
        value: 2,
        label: '2 tuần',
    },
]

//====================================//

export const deliveryItem = {
    full_name: '', phone_number: '', delivery_time: [], province_id: '',
    district_id: '', ward_id: '', address_detail: '', default_address: false, user: '', full_address: ''
}