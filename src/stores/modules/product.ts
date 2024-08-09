import { type Module } from "vuex";
import request from "@/utilities/request";

const slice: Module<StateType<ProductType[]>, any> = {
    state: { data: [], error: "", loading: false },

    mutations: {
        setProductError(state, error: string = "") { state.error = error; },
        setProductLoading(state, loading: boolean) { state.loading = loading; },
        setProductData(state, products: ProductType[]) { state.data = products; },
    },

    actions: {
        async getProducts({ commit }) {
            commit("setProductError", ""); commit("setProductLoading", true);

            setTimeout(async () => {
                try {
                    const response = await request.get<{ products: ProductType[] }>("/product");
                    commit("setProductData", response.data.products);
                } catch (error: any) {
                    setTimeout(() => { commit('setProductError'); }, 3000);
                    commit('setProductError', error.response?.data?.message || 'Failed to fetch products');
                }
                commit("setProductLoading", false);
            }, 5000)

        },

        async getMyProducts({ commit }) {
            commit("setProductError", ""); commit("setProductLoading", true);

            try {
                const response = await request.get<{ products: ProductType[] }>("/product/my");
                commit("setProductData", response.data.products);
            } catch (error: any) {
                setTimeout(() => { commit('setProductError'); }, 3000);
                commit('setProductError', error.response?.data?.message || 'Failed to fetch your products');
            }

            commit("setProductLoading", false);
        },

        async updateProduct({ commit, state }, data: ProductType) {
            commit("setProductError", ""); commit("setProductLoading", true);

            try {
                const headers = data.image ? { 'Content-Type': 'multipart/form-data' } : {};
                const response = await request.put<ProductType>(`/product/${data.id}`, data, { headers });
                commit("setProductData", state.data.map(item => item.id == response.data.id ? response.data : item));
            } catch (error: any) {
                setTimeout(() => { commit('setProductError'); }, 3000);
                commit('setProductError', error.response?.data?.message || 'Failed to update product');
            }

            commit("setProductLoading", false);
        },

        async createProduct({ commit, state,rootState }, data: FormData) {
            data.append("createdById", rootState.account.data.id!);
            commit("setProductError", ""); commit("setProductLoading", true);

            try {
                const response = await request.post<ProductType>("/product", data, { headers: { 'Content-Type': 'multipart/form-data' } });
                commit("setProductData", [...state.data, response.data]);
            } catch (error: any) {
                setTimeout(() => { commit('setProductError'); }, 3000);
                commit('setProductError', error.response?.data?.message || 'Failed to create product');
            }

            commit("setProductLoading", false);
        },
    },
};

export default slice;