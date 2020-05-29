<template>
	<div class="nav-container">
		<div class="slanted-top bg-primary"></div>
		<nav
			class="navbar shadow navbar-expand-lg navbar-dark bg-primary py-3 pr-3 align-items-center"
		>
			<span class="navbar-brand">+ Add todo: </span>
			<div class="flex-grow-1">
				<input
					class="form-control w-100 rounded-0 text-primary"
					@keyup.enter="addTodo"
					placeholder=" Enter title ..."
					ref="todoTitleInput"
					type="text"
					v-model="todo.title"
				/>
			</div>
			<div class="btn-group-sm">
				<button
					@click="addTodo"
					class="btn btn-light text-primary ml-2 rounded-0"
					type="submit"
				>
					Add
				</button>
				<button
					@click="handleSearchForm"
					class="btn btn-primary ml-4 rounded-0"
				>
					<svg
						class="bi bi-search"
						width="1em"
						height="1em"
						viewBox="0 0 16 16"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"
							clip-rule="evenodd"
						/>
						<path
							fill-rule="evenodd"
							d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
							clip-rule="evenodd"
						/>
					</svg>

					<svg
						class="bi bi-chevron-double-down ml-1"
						width="1em"
						height="1em"
						viewBox="0 0 16 16"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						v-if="!showSearchForm"
					>
						<path
							fill-rule="evenodd"
							d="M1.646 6.646a.5.5 0 01.708 0L8 12.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"
							clip-rule="evenodd"
						/>
						<path
							fill-rule="evenodd"
							d="M1.646 2.646a.5.5 0 01.708 0L8 8.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"
							clip-rule="evenodd"
						/>
					</svg>
					<svg
						v-else
						class="bi bi-chevron-double-up ml-1"
						width="1em"
						height="1em"
						viewBox="0 0 16 16"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M7.646 2.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 3.707 2.354 9.354a.5.5 0 11-.708-.708l6-6z"
							clip-rule="evenodd"
						/>
						<path
							fill-rule="evenodd"
							d="M7.646 6.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 7.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</nav>
		<div
			class="form-group p-3 m-0 form-inline d-flex w-100 border-right border-left"
			v-if="showSearchForm"
		>
			<Search />
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import Search from './Search';

export default {
	data() {
		return {
			showSearchForm: false,
			todo: {
				completed: false,
				title: ''
			}
		};
	},
	components: {
		Search
	},
	computed: {
		...mapState(['todos'])
	},
	methods: {
		...mapActions(['createTodo', 'getTodos']),
		...mapMutations(['SET_MESSAGE']),
		addTodo,
		handleSearchForm
	},
	mounted() {
		this.$refs.todoTitleInput.focus();
	}
};

/**
 * Opens search form
 */
function handleSearchForm() {
	this.showSearchForm = !this.showSearchForm;
	this.todo.title = '';

	if (!this.showSearchForm) {
		this.getTodos({});
	}
}

/**
 * Adds a new todo
 */
function addTodo() {
	if (this.todo.title === '') {
		this.SET_MESSAGE({
			type: 'danger',
			content: 'Todo title cannot be empty'
		});

		return;
	}

	const newTodo = { ...this.todo };
	newTodo.title = newTodo.title.replace(/[^a-zA-Z0-9 ]/g, '');

	this.createTodo(newTodo).then(() => {
		this.todo.title = '';
		this.showSearchForm = false;
	});
}
</script>

<style lang="scss" scoped>
.slanted-top {
	height: 25px;
	-webkit-clip-path: polygon(0% 96%, 100% 0%, 100% 100%, 0% 100%);
	clip-path: polygon(0% 96%, 100% 0%, 100% 100%, 0% 100%);
}
</style>
