import httpClient from "@/services/http.service";

const category = {
    namespaced: true,
    actions: {
        async getCategories({commit}) {
            try {
                const {data, status} = await httpClient.get('categories');
                if (status == 200) {
                    console.log(data)
                    commit('set_categories', data.data)
                }
            } catch (e) {
                console.log(e)
            }
        },
        async postCreateCategory({commit}, form) {
            try {
                const {status} = await httpClient.post('categories/', form);
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
        async putUpdateCategory({commit}, data) {
            try {
                const {status} = await httpClient.put(`categories/${data.id}`, data);
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
        async destroyDeleteCategory({commit}, id) {
            try {
                const {status} = await httpClient.delete(`categories/${id}`);
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
    },
    mutations: {
        set_categories(state, data){
            state.categories = data
        }
    },
    state: {
        categories: []
    },
}

export default category
