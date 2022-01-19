import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        paymentList: [],
        categoryList: [],
        paymentListIds: [],
    },
    mutations: {
        setPaymentListData(state, payload) {
          state.paymentList = payload
        },
        addPaymentListData(state, payload) {
          state.paymentList.push(payload)
        },
        setCategoryList(state, payload) {
          state.categoryList = payload
        },
        addNewCategory(state, payload) {
          state.categoryList.push(payload)
        },
        deleteData(state, payload) {
          const itemIndex = state.paymentList.findIndex((obj => obj.id == payload))
          state.paymentList.splice(itemIndex, 1)
        },
      },
      getters: {
        getPaymentList: state => state.paymentList,
        getCategoryList: state => state.categoryList,
        getFullPaymentValue: state => {
          return state.paymentList.reduce((res, cur) => res + cur.value, 0)
        }
      },
    actions: {
        fetchData({ commit }) {
            return new Promise((resolve) => {
              setTimeout(() => {
                const items = [];
                for (let i = 1; i < 20; i++) {
                  items.push({
                    date: "20.12.2021",
                    category: "Education",
                    value: i,
                    id: i,
                  });
                }
                resolve(items);
              }, 0);
            }).then((res) => commit("setPaymentListData", res));
          },

          fetchCategoryList({ commit }) {
            return new Promise((resolve) => {
              setTimeout(() => {
                const items = ['Sport', 'Food', 'Education', 'Transport', 'Internet', 'Entertainment']
                resolve(items)
              }, 500)
            }).then(res => {
              commit('setCategoryList', res)
            });
          },
          upgradeData({ commit }, payload) {
            const itemIndex = this.state.paymentList.findIndex((obj => obj.id == payload.id))
            this.state.paymentList[itemIndex].category = payload.category
            this.state.paymentList[itemIndex].value = payload.value
            // this.state.paymentList[itemIndex].date = payload.date
            commit('setPaymentListData', this.state.paymentList)
          },

    },
});