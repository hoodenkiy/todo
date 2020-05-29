import axios from 'axios';
import * as mutationTypes from './mutation-types';
import { v4 as uuidv4 } from 'uuid';
import { messages, network } from '../constants';
import store from './';

const DB_URL = 'http://localhost:3000';

export const searchTodos = ({ state, commit }, searchTerm = '') => {
	return axios
		.get(`${DB_URL}/todos?q=${searchTerm}&_sort=created&_order=desc&_page=${state.pagination.currentPage}`)
		.then(response => {
			const totalCount = response.headers['x-total-count'];
			const totalResults = parseInt(totalCount) || response.data.length;

			commit(mutationTypes.SET_TODOS, response.data);
			commit(mutationTypes.SET_TOTAL_RESULTS, totalResults);

			if (totalResults === 0) {
				commit(mutationTypes.SET_MESSAGE, {
					type: 'danger',
					content: messages.REFINE_SEARCH
				});
			}
		})
		.catch(error => {
			handleErrors(error);
		});
};

export const getTodos = ({ state, commit }) => {
	const params = `?_sort=created&_order=desc&_page=${state.pagination.currentPage}&_limit=${state.pagination.rowsPerPage}`;

	return axios
		.get(`${DB_URL}/todos${params}`)
		.then(response => {
			const totalCount = response.headers['x-total-count'];
			const totalResults = parseInt(totalCount) || response.data.length;

			commit(mutationTypes.SET_TODOS, response.data);
			commit(mutationTypes.SET_TOTAL_RESULTS, totalResults);

			if (totalResults === 0) {
				commit(mutationTypes.SET_MESSAGE, {
					type: 'danger',
					content: messages.REFINE_SEARCH
				});
			}
		})
		.catch(error => {
			handleErrors(error);
		});
};

export const createTodo = ({ commit, dispatch }, todo) => {
	if (!todo) {
		return;
	}

	const newTodo = {
		id: uuidv4(),
		created: new Date(),
		...todo
	};

	return axios
		.post(`${DB_URL}/todos`, newTodo)
		.then(response => {
			commit(mutationTypes.ADD_TODO, response.data);
			commit(mutationTypes.SET_MESSAGE, {
				type: 'success',
				content: messages.TODO_CREATED
			});
			dispatch('getTodos', {});
		})
		.catch(error => {
			handleErrors(error);
		});
};

export const deleteTodo = ({ commit, dispatch }, { id }) => {
	if (!id) {
		return;
	}

	return axios
		.delete(`${DB_URL}/todos/${id}/`)
		.then(result => {
			dispatch('getTodos', {});
			commit(mutationTypes.SET_MESSAGE, {
				type: 'success',
				content: messages.TODO_DELETED
			});
		})
		.catch(error => {
			handleErrors(error);
		});
};

export const updateTodo = ({ commit, dispatch }, todo) => {
	if (!todo) {
		return;
	}

	return axios
		.put(`${DB_URL}/todos/${todo.id}/`, todo)
		.then(result => {
			dispatch('getTodos', {});
			commit(mutationTypes.SET_MESSAGE, {
				type: 'success',
				content: messages.TODO_UPDATED
			});
		})
		.catch(error => {
			handleErrors(error);
		});
};

/**
 * Handles errors for api calls
 * @param {Error} error
 */
function handleErrors(error) {
	console.log('error', error);
	if (error.message === 'Network Error') {
		store.commit(mutationTypes.SET_MESSAGE, {
			type: 'danger',
			content: network.NETWORK_ERROR
		});
	}
}
