import { db } from '../firebaseConfig'

const payloadStore = {
    state: {
        payloadList: [],
    },
    getters: {
        getPayloadList(state) {
            return state.payloadList;
        },
    },
    mutations: {
        setList(state, list) {
            state.payloadList = list;
        },
        addList(state, payload){
            state.payloadList.push(payload);
        }
    },
    actions: {
        async addPayloadData({commit}, payload){
            await db.collection('ilanlar').add(payload).then(()=>{
                commit('addList', payload);
                return payload;
            });
        },
        async getPayloadData({commit}, id){
            await db.collection('ilanlar').get().then((payloadList)=>{
                commit('setList', payloadList);
                return payloadList;
            });
        }

    }
};

export default payloadStore;
