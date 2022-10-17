<script setup>
import { invertColor } from "@/utils"
const props = defineProps(["label", "inputValue", "selectedOption", "showOptions", "color", "iconColor"])
const emits = defineEmits(["setSearchText", "clearSearchText"])

const searchTextHandler = (event) => {
	emits("setSearchText", event.target.value)
}

const clearSearchTextHandler = () => {
	emits("clearSearchText")
}

const styleObj = {
	backgroundColor: props.color,
	color: invertColor(props.color)
}

</script>

<template>
	<div class="input" :style="styleObj">

		<input class="input__search" :placeholder="props.label" type="text" :value="props.inputValue"
			@input.trim="searchTextHandler" />

		<div class="input__icons" :style="{color: props.iconColor}">
			<span v-show="props.selectedOption" @click="clearSearchTextHandler" class="material-icons close-icon">
				close
			</span>

			<span :class="{'active': props.showOptions}" class="material-icons expand-icon">
				expand_more
			</span>
		</div>

	</div>
</template>


<style lang="scss" scoped>
.input {
	@apply flex gap-2 items-center h-12 rounded-md px-4 border border-slate-400;

	&__search {
		@apply bg-inherit flex-1 outline-none
	}
	
	&__icons {
		@apply flex;
		.close-icon {
			@apply text-lg flex items-center p-1 px-2 rounded-full cursor-pointer
		}
		.expand-icon {
			@apply delay-75 transition-all flex items-center p-1 rounded-full cursor-pointer
		}
		.active {
			@apply rotate-180
		}
	}

}
</style>