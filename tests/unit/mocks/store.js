import Vuex from 'vuex';

export const state = {};

export const getters = {};

export const actions = {
	getTodos: jest.fn()
	evenOrOdd: state => (state.count % 2 === 0 ? 'even' : 'odd')

};

export default new Vuex.Store({
	actions,
	getters,
	state
});
