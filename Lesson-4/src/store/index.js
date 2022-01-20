import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const localDB = {
  "page1": [{
      "id": 1,
      "date": "20.03.2020",
      "category": "Food",
      "value": 169
    },
    {
      "id": 2,
      "date": "21.03.2020",
      "category": "Navigation",
      "value": 50
    },
    {
      "id": 3,
      "date": "22.03.2020",
      "category": "Sport",
      "value": 450
    }
  ],
  "page2": [{
      "id": 4,
      "date": "23.03.2020",
      "category": "Entertaiment",
      "value": 969
    },
    {
      "id": 5,
      "date": "24.03.2020",
      "category": "Education",
      "value": 1500
    },
    {
      "id": 6,
      "date": "25.03.2020",
      "category": "Food",
      "value": 200
    }
  ],
  "page3": [{
      "id": 7,
      "date": "23.03.2020",
      "category": "Entertaiment",
      "value": 969
    },
    {
      "id": 8,
      "date": "24.03.2020",
      "category": "Education",
      "value": 1500
    },
    {
      "id": 9,
      "date": "25.03.2020",
      "category": "Food",
      "value": 200
    }
  ],
  "page4": [{
      "id": 10,
      "date": "23.03.2020",
      "category": "Entertaiment",
      "value": 969
    },
    {
      "id": 11,
      "date": "24.03.2020",
      "category": "Education",
      "value": 1500
    },
    {
      "id": 12,
      "date": "25.03.2020",
      "category": "Food",
      "value": 200
    }
  ],
}

export default new Vuex.Store({
  state: {
    paymentList: JSON.parse(localStorage.getItem('pay') || '[]'),
    // paymentList: [],
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
      localStorage.setItem('pay', JSON.stringify(state.paymentList))
      state.paymentList.push(data)

    },
    getPaymentListFirstElement(state, payload) {
      Vue.set(state.paymentList, 0, payload)
    },
    setCategoryData(state, paylaod) {
      state.categoryList = paylaod;
    },
  },
  getters: {
    getPaymentListFullValuePrise: state => {
      return state.paymentList.reduce((pre, cur) => pre + cur.value, 0)
    },
    getPaymentList: state => state.paymentList,
    getCategoryList: state => state.categoryList,

  },
  actions: {
    fetchData({
      commit
    }, page) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const items = localDB[`page${page}`];
          resolve(items);
        }, 0);
      }).then((res) => commit('setPaymentsListData', res))
    },
    addPaymentListData({
      commit
    }, data) {
      commit('addPaymentListData', data)
    },

    // addPaymentListData ({commit}, data) {
    //     commit('addPaymentListData', data)
    //   },




    fetchCategory({
      commit
    }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const items = ["Sport", "Education", "Internet", "Food", "Transport"];
          resolve(items);
        }, 1000);
      }).then((res) => commit("setCategoryData", res));
    },

  },
});