<script setup>
import { computed } from 'vue';
import {invertColor} from "@/utils"
const props = defineProps({
	name: String,
	match: String,
	color: String,
	matchComponent: String
})
const emits = defineEmits(["setSelected"])
const regex = computed(() => props.match ? new RegExp(`(${props.match})`, "gi") : false)
const parts = computed(() => props.name.split(regex.value))
const checkComponent = (part) => regex.value.test?.(part) ? props.matchComponent : 'span'
const styleObj = {backgroundColor: props.color, color: invertColor(props.color)}
const selectedOptionHandler = () => {
	emits("setSelected")
} 
</script>

<template>
	<button class="option" @click="selectedOptionHandler" :style="styleObj">
		<template v-for="part in parts">
			<component class="option__part" v-if="part" v-text="part" :is=checkComponent(part)></component>
		</template>
	</button>
</template>


<style lang="scss" scoped>
.option {
	@apply flex py-2.5 px-4  w-full outline-none;

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

mark{
	background-color: v-bind(invertColor(color));
	padding: 0 3px;
	border-radius: 5px
}
</style>