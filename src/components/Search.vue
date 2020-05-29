<template>
	<div class="search-wrapper w-100 d-flex align-items-center">
		<div class="mr-3">Search:</div>
		<div class="search-input w-100">
			<input
				class="form-control rounded-0 w-100"
				@input="handleSearch"
				@keyup.enter="handleSearch"
				placeholder="Search Todo's..."
				ref="searchInput"
				v-model.trim="searchText"
			/>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { search, globals } from '../constants';

export default {
	data() {
		return {
			searchText: '',
			timeout: () => {}
		};
	},
	computed: {
		...mapState(['todos'])
	},
	methods: {
		...mapActions(['searchTodos']),
		...mapMutations(['SET_CURRENT_PAGE', 'SET_MESSAGE']),
		handleSearch() {
			if (this.timeout) {
				clearTimeout(this.timeout);
			}

			this.timeout = setTimeout(() => {
				if (!this.searchText) {
					this.SET_CURRENT_PAGE(1);
				}

				if (this.searchText.length > globals.SEARCH_TEXT_LIMIT) {
					this.SET_MESSAGE({
						content: search.SEARCH_TEXT_LENGTH,
						type: 'danger'
					});

					return;
				}

				const filterdSearchTerm = this.searchText.replace(
					/[^a-zA-Z0-9 ]/g,
					''
				);

				this.searchTodos(filterdSearchTerm);
			}, 500);
		}
	},
	mounted() {
		this.$refs.searchInput.focus();
	}
};
</script>
