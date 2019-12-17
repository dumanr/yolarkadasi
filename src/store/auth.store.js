import { fbauth } from '../firebaseConfig'

const authStore = {
    state: {
        oturum: false,
        oturumFBuserData: null,
    },
    getters: {
        getOturum(state) {
            return state.oturum;
        },
        getOturumKullanici(state) {
            return state.oturumFBuserData;
        }
    },
    mutations: {
        setKullanici(state, kullanici){
            state.oturumFBuserData = kullanici;
        },
        setOturum(state, _oturum){
            state.oturum = _oturum;
        }
    },
    actions: {
        oturumAc({commit}, kullanici){
            commit('setKullanici', kullanici);
            commit('setOturum', kullanici ? true : false);
        },
        oturumKapat({commit}) {
            commit('setKullanici', null);
            commit('setOturum', false);
        }
    }
};

export default authStore;
