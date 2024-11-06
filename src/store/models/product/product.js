import httpClient from "@/services/http.service";

const product = {
    namespaced: true,
    actions: {
        async getProducts({commit}) {
            try {
                const {data, status} = await httpClient.get('products');
                if (status == 200) {
                    commit('set_products', data.data)
                }
            } catch (e) {
                console.log(e)
            }
        },
        async getProduct({commit}, id) {
            try {
                const {data, status} = await httpClient.get(`products/${id}`);
                if (status == 200) {
                    console.log(data)
                    commit('set_product', data.data)
                }
            } catch (e) {
                console.log(e)
            }
        },
        async postCreateProduct({commit}, form) {
            try {
                const {status} = await httpClient.post('products', form);
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
        async putUpdateProduct({commit}, data) {
            try {
                const {status} = await httpClient.put(`products/${data.id}`, data);
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
        async destroyDeleteProduct({commit}, id) {
            try {
                const {status} = await httpClient.delete(`products/${id}`);
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
    },
    mutations: {
        set_products(state, data){
            state.products = data
        },
        set_product(state, data){
            state.product = data
        }
    },
    state: {
        products: [],
        product: {}
    },
}

export default product
