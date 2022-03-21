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
        setPaymentsListData(state, payload) {
            const newUnitIds = payload.filter((item) => {
                return state.paymentListIds.indexOf(item.id) < 0
            })
            const uniqIds = newUnitIds.map(obj => obj.id)
            state.paymentList.push(...newUnitIds);
            state.paymentListIds.push(...uniqIds);
        },
        addPaymentListData(state, data) {
            state.paymentList.push(data)

        },
        getPaymentListFirstElement(state, payload) {
            Vue.set(state.paymentList, 0, payload)
        },
        setCategoryData(state, paylaod) {
            state.categoryList = paylaod;
        },

        addCategoryToList(state, payload) {
            state.categoryList.push(payload)
        },
        delItemFromPaymentList (state, itemId) {
            const item = state.paymentList.find(el=> el.id === itemId)
            const indexItem = state.paymentList.indexOf(item)
            state.paymentList.splice(indexItem, 1)
        },
        // editDataInPaymentList(state, data) {
        //     state.paymentsList = state.paymentsList.map(item => {
        //         if (item.id === data.id) {
        //           return Object.assign({}, item, data)
        //         }

        //         return item
        //     })
        // },
        editDataInPaymentList({ commit }, payload) {
            const itemId = this.state.paymentList.findIndex((obj => obj.id == payload.id))
            this.state.paymentList[itemId].category = payload.category
            this.state.paymentList[itemId].value = payload.value
            commit('setPaymentListData', this.state.paymentList)
        },

    },
    getters: {
        getPaymentListFullValuePrise: state => {
            return state.paymentList.reduce((pre, cur) => pre + cur.value, 0)
        },
        getPaymentList: state => state.paymentList,
        getCategoryList: state => state.categoryList,

        // getPaymentsItem: state => (itemId) => {
        //     return state.paymentsList[itemId -1]
        // },


    },
    actions: {
        fetchData({ commit }) {
            return new Promise((resolve) => {
              setTimeout(() => {
                const items = [];
                for (let i = 1; i < 12; i++) {
                  items.push({
                    date: "20.12.2021",
                    category: "Education",
                    value: i,
                    id: i,
                  });
                }
                resolve(items);

              }, 0);
            }).then((res) => commit("setPaymentsListData", res));
          },

        fetchCategory ({commit}) {

            return new Promise((resolve) => {
                setTimeout(() => {
                    const items = ["Sport", "Education", "Internet", "Food", "Transport"];
                    resolve(items);

                }, 0);

            }).then((res) => commit("setCategoryData", res));
        },

    },
});