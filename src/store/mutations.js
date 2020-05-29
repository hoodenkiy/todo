import * as mutationTypes from './mutation-types';

export default {
	[mutationTypes.SET_TODOS](state, payload) {
		if (!payload) {
			return;
		}
		state.todos = payload;
	},

	[mutationTypes.ADD_TODO](state, payload) {
		if (!payload) {
			return;
		}
		state.todos.unshift(payload);
	},

	[mutationTypes.UPDATE_TODO](state, payload) {
		if (!payload) {
			return;
		}
		state.todos = payload;
	},

	[mutationTypes.DELETE_TODO](state, payload) {
		if (!payload) {
			return;
		}
		state.todos = payload;
	},

	[mutationTypes.SET_TOTAL_RESULTS](state, payload) {
		if (!payload) {
			return;
		}

		state.pagination.totalResults = payload;
	},

	[mutationTypes.SET_CURRENT_PAGE](state, payload) {
		if (!payload) {
			return;
		}

		state.pagination.currentPage = payload;
	},

	[mutationTypes.SET_MESSAGE](state, payload) {
		if (!payload) {
			return;
		}

		state.message = payload;
	},

	[mutationTypes.SHOW_SPEED_BUMP](state, payload) {
		state.showSpeedBump = payload;
	},

	[mutationTypes.SET_SPEED_BUMP](state, payload) {
		state.speedBump = payload;
	},

	[mutationTypes.RESET_SPEED_BUMP](state) {
		state.speedBump = {};
	}
};
