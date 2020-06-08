import Vue from 'vue/dist/vue.esm';
import Vuex from 'vuex';
import Rails from '@rails/ujs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: []
  },

  getters: {
    lists: state => state.lists
  },

  mutations: {
    UPDATE_LISTS(state, lists) {
        state.lists = lists;
    },

    REPLACE_LIST(state, list) {
      let list_index = state.lists.findIndex(item => item.id == list.id);

      state.lists.splice(list_index, 1, list);
    },
    
    REPLACE_CARD(state, card) {
      let list_index = state.lists.findIndex(list => list.id == card.list_id);
      let card_index = state.lists[list_index].cards.findIndex(item => item.id == card.id);
      state.lists[list_index].cards.splice(card_index, 1, card);
    },

    ADD_LIST(state, list) {
      state.lists.push(list)
    },

    DELETE_LIST(state, list_id) {
      let list_index = state.lists.findIndex(list => list.id == list_id);

      state.lists.splice(list_index, 1);
    },

    DELETE_CARD(state, { list_id, card_id }) {
      console.log(card_id)
      let list_index = state.lists.findIndex(list => list.id == list_id);
      let card_index = state.lists[list_index].cards.findIndex(item => item.id == card_id);
      state.lists[list_index].cards.splice(card_index, 1);
    }
  },

  actions: {
    updateList( { commit }, { id, name }) {
      let data = new FormData();
      data.append("list[name]", name)

      Rails.ajax({
        url: `/lists/${id}`,
        type: 'PUT',
        data,
        dataType: 'json',
        success: resp => {
          console.log(resp);
          commit('REPLACE_LIST', resp)
        },
        error: err => {
          console.log(err)
        }
      })
    },

    deleteList( { commit }, list_id ) {
      Rails.ajax({
        url: `/lists/${list_id}`,
        type: 'DELETE',
        dataType: 'json',
        error: err => {
          console.log(err)
        }
      })
    },

    createList( { commit }, name) {
      let data = new FormData();
      data.append('list[name]', name);
      Rails.ajax({
        url: '/lists',
        data,
        type: 'POST',
        dataType: 'json',
        success: resp => {
          console.log(resp)
        },
        error: err => {
          console.log(err)
        }
      })
    },

    updateCard( { commit }, { id, name }) {
      let data = new FormData();
      data.append("card[name]", name);

      Rails.ajax({
        url: `/cards/${id}`,
        type: 'PUT',
        data,
        dataType: 'json',
        error: err => {
          console.log(err)
        }
      })
    },

    deleteCard( { commit }, { card_id, list_id }) {
      Rails.ajax({
        url: `/cards/${card_id}`,
        type: 'DELETE',
        dataType: 'json',
        success: resp => {
          console.log(card_id)
          commit('DELETE_CARD', {list_id: list_id, card_id: card_id})
        },
        error: err => {
          console.log(err)
        }
      })
    },

    moveList( { commit, state }, event) {
      let data = new FormData();
          data.append('list[position]', event.moved.newIndex + 1);
          Rails.ajax({
            url: `/lists/${state.lists[event.moved.newIndex].id}/move`,
            type: 'PUT',
            data,
            dataType: 'json'
          });
    },

    loadList({ commit }) {
      Rails.ajax({
        url: '/lists.json',
        type: 'GET',
        success: resp => {
          commit("UPDATE_LISTS", resp)
        },
        error: err => {
          console.log(err)
        }
      });
    }
  }
})