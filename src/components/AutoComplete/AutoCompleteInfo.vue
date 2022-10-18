<script setup>
import {invertColor} from "@/utils"
import { computed } from "vue";
const props = defineProps(["searchText", "isLoading", "color", "loadingMsg", "noOptionsMsg"])
const notFoundMsg = computed(() => props.noOptionsMsg(props.searchText))
const styleObj = {backgroundColor: props.color, color: invertColor(props.color)}
</script>

<template>
	<div class="info" :style="styleObj">
		<div v-if="props.isLoading" class="info__message">{{props.loadingMsg}}</div>
		<div v-if="props.searchText && !props.isLoading" class="info__message">{{notFoundMsg}}</div>
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