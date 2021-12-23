import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        paymentList: JSON.parse(localStorage.getItem('pay') || '[]'),
        categoryList: [],
    },
    mutations: {
        setPaymentsListData(state, payload){
            state.paymentList = payload
        },
        addPaymentListData (state, payload) {
            state.paymentList.push(payload)
            localStorage.setItem('pay', JSON.stringify(state.paymentList))
        },
        getPaymentListFirstElement(state, payload ) {
            Vue.set(state.paymentList, 0, payload)
        },
        setCategoryData(state, paylaod) {
            state.categoryList = paylaod;
        },
    },
    getters: {
        getPaymentListFullValuePrise: state =>{
                return state.paymentList.reduce((pre, cur)=> pre + cur.value,0)
        },
        getPaymentList:state=>state.paymentList,
        getCategoryList: state => state.categoryList
    },
    actions: {
        fetchData ({ commit }) {
            return new Promise( (resolve) =>{
                    setTimeout(()=>{
                        const items = [];
                        for(let i = 1; i < 101; i++) {
                            items.push ({
                                date: "20.12.2021",
                                category: "Education",
                                value: i,
                                id: i,
                            });
                        }
                        resolve (items);
                    }, 2000);
            }).then((res)=> commit('setPaymentsListData', res))
    },
    addPaymentListData ({commit}, task) {
        commit('createTask', task)
      },
    fetchCategory({ commit }) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const items = ["Sport", "Education", "Internet", "Food", "Transport"];
            resolve(items);
          }, 2000);
        }).then((res) => commit("setCategoryData", res));
      },

    },
});

