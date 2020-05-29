<template>
	<main>
		<div
			class="list-group-item list-group-item-action d-flex align-items-center w-100"
			:key="`todo-${index}`"
			v-for="(todo, index) in todos"
		>
			<div class="pr-3">
				<input
					@change="updateTodoInfo(todo, $event)"
					:checked="todo.completed"
					class="rounded-0"
					type="checkbox"
					:value="todo.id"
				/>
			</div>
			<div class="flex-grow-1 text-left">
				<quick-edit
					buttonOkText="Update"
					:classes="vueQuickEditClasses"
					@close="updateTodoInfo(todo, $event)"
					v-model="todo.title"
					v-if="!todo.completed"
				/>
				<span class="text-muted" v-else>
					<del>{{ todo.title }}</del>
				</span>
			</div>
			<div>
				<button
					aria-label="Delete todo"
					class="btn btn-link"
					@click="launchSpeedBump(todo)"
					data-toggle="modal"
					data-target="#speed-bump"
					type="button"
				>&times;</button>
			</div>
		</div>
	</main>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import QuickEdit from 'vue-quick-edit';
import EventBus from '@/helpers/event-bus';

export default {
	data() {
		return {
			toBeDeleted: {},
			vueQuickEditClasses: {
				wrapper: 'form-group mb-0 form-inline d-flex mr-3',
				input: 'form-control w-auto flex-grow-1 mr-3 rounded-0',
				buttons: ' btn-group-sm',
				buttonOk: 'btn btn-success mr-1 rounded-0',
				buttonCancel: 'btn btn-primary rounded-0'
			}
		};
	},
	components: {
		QuickEdit
	},
	computed: {
		...mapState(['todos'])
	},
	methods: {
		launchSpeedBump,
		updateTodoInfo,
		...mapActions(['deleteTodo', 'updateTodo']),
		...mapMutations(['SET_MESSAGE', 'SET_SPEED_BUMP', 'SHOW_SPEED_BUMP'])
	},
	mounted() {
		EventBus.$on('delete-todo', () => {
			this.SHOW_SPEED_BUMP(false);
			this.deleteTodo(this.toBeDeleted);
		});
	}
};

/**
 * Launches the speed bump
 * @param {Object} - todo
 */
function launchSpeedBump(todo) {
	if (!todo && !todo.id) {
		return;
	}

	this.SHOW_SPEED_BUMP(true);

	this.SET_SPEED_BUMP({
		id: 'delete-todo',
		content: 'This will delete the todo permanately.',
		title: 'Are you sure?',
		saveText: 'I understand, Delete todo'
	});

	this.toBeDeleted = todo;
}

/**
 * Updates todo
 * @param {Object} - todo
 */
function updateTodoInfo(todo, event) {
	if (!todo || !event) {
		return;
	}

	if (event === '') {
		this.SET_MESSAGE({
			type: 'danger',
			content: 'Event name cannot be empty'
		});

		return;
	}

	todo.title = typeof event === 'string' ? event : todo.title;
	todo.completed = event.target ? event.target.checked : todo.completed;

	this.updateTodo(todo);
}
</script>
