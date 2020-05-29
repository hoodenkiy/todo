import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import App from '@/components/CreateTodo';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('App.vue', () => {
	let actions;
	let store;
	let wrapper;

	beforeEach(() => {
		actions = {
			getTodos: jest.fn()
		};
		store = new Vuex.Store({
			actions
		});

		wrapper = shallowMount(App, {
			store,
			localVue,
			attachToDocument: true
		});
	});

	describe('Mounted:', () => {
		it('Sets the focust to the "input"', () => {
			const input = wrapper.find({ ref: 'todoTitleInput' }).element;
			expect(input).toBe(document.activeElement);
		});
	});

	describe('Data:', () => {
		it('does not show the search form by default', () => {
			expect(wrapper.vm.showSearchForm).toBe(false);
		});
	});
});
