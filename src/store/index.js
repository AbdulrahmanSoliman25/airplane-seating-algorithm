import Vue from "vue";
import Vuex from "vuex";
import { seatAllocation } from "@/controllers/seatAllocation";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    map: new Map(),
    blocks: [],
    remaining: 0,
  },
  mutations: {
    setMap(state, payload) {
      state.map = payload;
    },
    setBlocks(state, payload) {
      state.blocks = payload;
    },
    setRemaining(state, payload) {
      state.remaining = payload;
    },
  },
  actions: {
    async allocationRequest({ commit }, data) {
      try {
        const allocation = await seatAllocation(data);
        commit("setMap", allocation["map"]);
        commit("setBlocks", allocation["blocks"]);
        commit("setRemaining", allocation["remaining"]);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getMap(state) {
      return state.map;
    },
    getBlocks(state) {
      return state.blocks;
    },
    getRemaining(state) {
      return state.remaining;
    },
  },
});
