<script setup>
const props = defineProps(["label", "inputValue", "selectedOption", "showOptions"])
const emits = defineEmits(["setSearchText", "clearSearchText"])

const searchTextHandler = (event) => {
	emits("setSearchText", event.target.value)
}

const clearSearchTextHandler = () => {
	emits("clearSearchText")
}

</script>

<template>
	<div class="input">

		<input class="input__search" :placeholder="props.label" type="text" :value="props.inputValue" @input.trim="searchTextHandler" />

		<span v-show="props.selectedOption" @click="clearSearchTextHandler" class="material-icons input__close">
			close
		</span>

		<span :class="{'active': props.showOptions}" class="material-icons input__expand">
			expand_more
		</span>

	</div>
</template>


<style lang="scss" scoped>
.input {
	@apply flex gap-2 items-center h-12 rounded-md px-4 border border-slate-200;

	&__search {
		@apply bg-inherit flex-1 outline-none
	}

	&__close {
		@apply text-lg flex items-center p-1 px-2 rounded-full cursor-pointer
	}

	&__expand {
		@apply delay-75 transition-all flex items-center p-1 rounded-full cursor-pointer
	}

	.active {
		@apply rotate-180
	}
}
</style>