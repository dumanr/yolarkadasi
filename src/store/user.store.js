import { db } from '../firebaseConfig'

const userStore = {
    state: {
        currentUserProfileData: null,
    },
    getters: {
        getProfileData(state) {
            return state.currentUserProfileData;
        },
    },
    mutations: {
        setProfileData(state, userData) {
            state.currentUserProfileData = userData;
        },
    },
    actions: {
        async profileData({ commit }, userId) {
            if(userId)
                await db.collection('kullanicilar').doc(userId).get().then((userData) => {
                    commit('setProfileData', userData);
                    return userData;
                });
            else null;
        },
        async sendProfileData({commit}, profileData) {
            console.log('send profile', profileData);
            await db.collection('kullanicilar').doc(profileData.userId).set(profileData).then(()=>{
                commit('setProfileData', profileData);
                return profileData;
            });
        },
    }
};

export default userStore;
