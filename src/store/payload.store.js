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
            state.payloadList = [];
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
        async getPayloadData({commit}){
            await db.collection('ilanlar').get().then((payloadList)=>{
                payloadList = payloadList.docs.map(doc=> {
                    var data = doc.data();
                    data.id = doc.id;
                    return data;
                });
                commit('setList', payloadList);
            });
        },
        async deletePayloadData({commit}, ilanId){
            await db.collection('ilanlar').doc(ilanId).delete().then(()=>{
                return 1;
            });
        },
        async getReservations({}, ilanId){
            return await db.collection('ilanlar').doc(ilanId).collection('yolcular').get().then(res=>{
                return res.docs.map(m=>{
                    let d = m.data();
                    d.id = m.id;
                    console.log(d);
                    return d;
                });
            });
        },
        async addReservation({commit}, payload){
            return await db.collection('ilanlar').doc(payload.ilanId).collection('yolcular').add({
                kullaniciId: payload.kullaniciId
            });
        },
        async deleteReservation({commit}, payload) {
            return await db.collection('ilanlar').doc(payload.ilanId)
                .collection('yolcular').doc(payload.parentKey).delete();
        }
    }
};

export default payloadStore;
