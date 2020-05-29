import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import App from '@/App';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('App.vue', () => {
	let actions;
	let store;

	beforeEach(() => {
		actions = {
			getTodos: jest.fn()
		};

		store = new Vuex.Store({
			actions
		});

		shallowMount(App, { store, localVue });
	});

	it('dispatches "getTodos" when input event value is "input"', () => {
		expect(actions.getTodos).toHaveBeenCalled();
	});
});
