<template>
	<div id="app">
		<div class="container my-5">
			<Header />
			<div class="shadow-sm">
				<CreateTodo />
				<TodoList />
			</div>
			<Pagination />
			<SpeedBump v-if="showSpeedBump" />
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CreateTodo from '@/components/CreateTodo';
import Header from '@/components/Header';
import Pagination from '@/components/Pagination';
import SpeedBump from '@/components/shared/SpeedBump';
import TodoList from '@/components/TodoList';

export default {
	components: {
		CreateTodo,
		Header,
		Pagination,
		SpeedBump,
		TodoList
	},
	computed: {
		...mapState(['showSpeedBump'])
	},
	created() {
		this.getTodos({});
	},
	methods: {
		...mapActions(['getTodos'])
	}
};
</script>

<style lang="scss" scoped>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
