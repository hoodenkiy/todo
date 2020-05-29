<template>
	<header>
		<div class="d-flex align-items-center">
			<h1 class="text-muted mb-0 mr-3 font-weight-light">
				| my to<span class="text-primary">do</span>'s
			</h1>
			<Message />
		</div>
	</header>
</template>

<script>
import Message from './shared/Message';

export default {
	components: {
		Message
	}
};
</script>
