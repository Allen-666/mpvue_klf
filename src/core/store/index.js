// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const store = new Vuex.Store({
//   state: {
//     num: 0
//   },
//   mutations: {
//     add: (state) => {
//       state.num ++;
//     },
//     del: (state) => {
//       state.num --;
//     }
//   }
// })
const store = new Vuex.Store({
  state: {
    footList: []
  },
  mutations: {
    add: (state, data) => {
      var bool = true;
      if (state.footList.length != 0) {
        state.footList.forEach(el => {
          if (data.id == el.id) {
            el.num++
            bool = false;
          }
        })
      }
      if (bool) {
        data.num = 1
        state.footList.push(data)
      }
      // console.log(state.footList);
    }
  },
  getters: {
    total(state) {
      let price = 0;
      state.footList.forEach(el => {
        price += parseFloat(el.price) * el.count
      })
      // console.log(price);
      return price.toFixed(2)
    }
  }
})
// console.log(store);

export default store




