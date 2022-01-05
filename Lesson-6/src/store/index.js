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
                delCostsFromPaymentList(state, paylaod) {
                    state.paymentList = paylaod;
                }
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
                }) {
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
                        }, 2000);
                    }).then((res) => commit("setPaymentsListData", res));
                },

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

                delCostsFromPaymentList(context, item) {
                    return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const index = state.paymentList.findIndex(elem => elem.id === item.id)
                                if (index < 0) {
                                    reject('Error: not found')
                                }

                                const newList = [...this.state.paymentList.slice(0, index), ...state.paymentList.slice(index + 1)]
                                resolve(newList)
                            }, 1000)
                        })
                        .then(res => {
                            context.commit('delCostsFromPaymentList', res)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }


            }
})