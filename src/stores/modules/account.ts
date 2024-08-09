import { type Module } from "vuex";
import request from "@/utilities/request";

const slice: Module<StateType<null | UserType>, any> = {
    state: { data: null, error: "", loading: true },

    mutations: {
        setUserError(state, error: string = "") { state.error = error; },
        setUserData(state, user: UserType | null) { state.data = user; },
        setUserLoading(state, loading: boolean) { state.loading = loading; },
    },

    actions: {
        async signout({ commit }) {
            localStorage.removeItem("token");
            commit("setUserData", null);
        },
        async signup({ commit }, data: UserType) {
            commit("setUserError", ""); commit("setUserLoading", true);

            try {
                const response = await request.post<{ user: UserType, token: string }>("/auth/signup", data);
                commit("setUserData", response.data.user); localStorage.setItem("token", response.data.token);
            } catch (error: any) {
                setTimeout(() => { commit('setUserError'); }, 3000);
                commit('setUserError', error.response?.data?.message || 'Sign-in failed');
            }

            commit("setUserLoading", false);
        },
        async signin({ commit }, data: Pick<UserType, "email" | "password">) {
            commit("setUserError", ""); commit("setUserLoading", true);

            try {
                const response = await request.post<{ user: UserType, token: string }>("/auth/signin", data);
                commit("setUserData", response.data.user); localStorage.setItem("token", response.data.token);
            } catch (error: any) {
                setTimeout(() => { commit('setUserError'); }, 3000);
                commit('setUserError', error.response?.data?.message || 'Sign-in failed');
            }

            commit("setUserLoading", false);
        },
    },
};

export default slice;