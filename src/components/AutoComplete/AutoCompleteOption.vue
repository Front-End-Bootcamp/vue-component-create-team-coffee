<script setup>
import { computed } from 'vue';

const props = defineProps({
	name: String,
	match: String,
	matchComponent: {
		type: String,
		default: "mark"
	}
})
const emits = defineEmits(["setSelected"])

const regex = computed(() => props.match ? new RegExp(`(${props.match})`, "gi") : false)
const parts = computed(() => props.name.split(regex.value))
const checkComponent = (part) => regex.value.test?.(part) ? props.matchComponent : 'span'

const selectedOptionHandler = () => {
	emits("setSelected")
} 
</script>

<template>
	<button class="option" @click="selectedOptionHandler">
		<template v-for="part in parts">
			<component class="option__part" v-if="part" v-text="part" :is=checkComponent(part)></component>
		</template>
	</button>
</template>


<style lang="scss" scoped>
.option {
	@apply flex py-2.5 px-4 border-b border-slate-200 w-full outline-none;

	&:focus {
		@apply bg-slate-700;
	}

	&__part {
		@apply whitespace-pre-wrap;
	}
}
.selected {
	@apply bg-slate-700;
}
</style>