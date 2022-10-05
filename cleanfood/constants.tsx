export const BASE_URL = 'http://localhost:8000/v1'
export const HREF = 'http://localhost:3000/'
export const apiUrl = {
    product: {
        category: 'category/get-all',
        filterByCategory: 'filter/get-by-id',
        getBrandBySubcategory: 'category/brand/get-by-id'
    },
    user: {
        getUserInfor: 'user/get-user-info',
        login: 'auth/login'
    },
    location: {
        getListCities: 'province/get-all',
        getListDistricts: 'province/district',
        getListWards: 'province/ward'
    },
    post: {
        uploadImage: 'upload/image',
        createNewPost: 'posts/create'
    }
}