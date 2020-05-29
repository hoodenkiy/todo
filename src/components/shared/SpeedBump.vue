<template>
	<div
		:aria-hidden="showSpeedBump"
		class="modal fade"
		id="speed-bump"
		role="dialog"
		tabindex="-1"
	>
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content rounded-0">
				<div class="modal-header">
					<h5 class="modal-title">{{ speedBump.title }}</h5>
					<button
						type="button"
						class="close"
						data-dismiss="modal"
						aria-label="Close modal"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					{{ speedBump.content }}
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-secondary rounded-0"
						data-dismiss="modal"
					>Close</button>

					<button
						type="button"
						class="btn btn-primary rounded-0"
						@click="continueSpeedbumb"
					>
						{{ speedBump.saveText }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import EventBus from '../../helpers/event-bus';

export default {
	computed: {
		...mapState(['speedBump', 'showSpeedBump'])
	},
	methods: {
		continueSpeedbumb
	}
};

/**
 * Emits an event and removes backdrop
 */
function continueSpeedbumb() {
	EventBus.$emit(this.speedBump.id || 'speedbump-continue');
	document.getElementsByClassName('modal-backdrop')[0].remove();
}
</script>
