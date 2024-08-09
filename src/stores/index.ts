import { createStore } from 'vuex';
import account from './modules/account';
import product from './modules/product';

export default createStore({
    modules: {
        account,
        product,
    }
});
