export const BASE_URL = 'http://localhost:3000/v1'
export const HREF = 'http://localhost:3000/'
export const apiUrl = {
    generalMenus: {
        getAll: 'general-menu/menu/get-all',
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