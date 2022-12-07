export const BASE_URL = 'http://localhost:3000/v1'
export const HREF = 'http://localhost:3000/'
export const apiUrl = {
    generalMenus: {
        getAll: 'general-menu/menu/get-all',
    },
    comboPackage: {
        getAll: 'combo-package/get-all',
        getByRoute: 'combo-package/get-by-route'
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