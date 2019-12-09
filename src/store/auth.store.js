import { fbauth } from '../firebaseConfig'

/* console.log('str', fbauth.currentUser);
 */

const authStore = {
    state: {
        oturum: false,
        oturumKullanici: null,
    },
    getters: {
        getOturum(state) {
            console.log('getters', state);
            return state.oturum;
        },
        getOturumKullanici(state) {
            return state.oturumKullanici;
        }
    },
    mutations: {
        setKullanici(state, kullanici){
            state.oturumKullanici = kullanici;
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
