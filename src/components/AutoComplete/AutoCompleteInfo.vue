<script setup>
import {invertColor} from "@/utils"
const props = defineProps(["searchText", "isLoading", "color"])
const styleObj = {backgroundColor: props.color, color: invertColor(props.color)}
</script>

<template>
	<div class="info" :style="styleObj">
		<div v-if="props.isLoading" class="info__message">Options loading.</div>
		<div v-else class="info__message">Your search - {{props.searchText}} - did not match any options.</div>
	</div>

</template>


<style lang="scss" scoped>
.info{
	@apply border border-slate-400 border-t-0 rounded-md;

	&__message {
	@apply p-3 break-words text-sm italic tracking-wider ;
}
}

</style>