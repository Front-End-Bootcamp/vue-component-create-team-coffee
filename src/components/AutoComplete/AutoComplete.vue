<script setup>
import { ref, computed } from 'vue';
import { useClickOnTarget } from '@/composables/clickOnTarget';
import OptionComp from './AutoCompleteOption.vue';
import InfoComp from './AutoCompleteInfo.vue';
import InputComp from './AutoCompleteInput.vue';

const props = defineProps(["options", "searchValue","textKey", "label", "matchComponent", "color", "isLoading"])
const emits = defineEmits(["setSearchText","setSelected"])
const wrapper = ref(null) //template ref clickoutside özelliğini kullanabilmek için
const searchText = ref(props.searchValue)	//Inputtan gelen değer
const selectedOption = ref(null) // Seçilen option
const inputValue = computed(() => searchText.value || optionText(selectedOption.value)) //Inputa verilen değer seçilen option'ın text'i yada inputtan gelen değer.
const showOptions = computed(() => isClickOnTarget.value && !selectedOption.value && props.options) // Seçili option yoksa ve autocomplete'e focus olunduysa seçenekler gösterilir.
const isClickOnTarget = useClickOnTarget(wrapper) //Hedefe yani autocomplete'e tıklanıldı mı.
const optionText = (option) => option?.[props.textKey] //Dışarıdan alınan datanın text'i local data Örn: option.code, option.name.

const selectOptionHandler = (option) => {
	searchText.value = optionText(option)
	selectedOption.value = option
	emitHandler("setSelected", option)
	emitHandler("setSearchText", searchText.value)
}

const searchTextHandler = (text) => {
	searchText.value = text
	selectedOption.value = null
	emitHandler("setSearchText", searchText.value)
}

const clearSearchTextHandler = () => {
	searchText.value = ""
	selectedOption.value = null
	emitHandler("setSearchText", searchText.value)
}

const emitHandler = (emitName, emitValue) => {
	emits(emitName, emitValue)
}

</script>

<template>
	<div ref="wrapper" class="autocomplete">
		<InputComp
			:label="props.label"
			:inputValue="inputValue"
			:selectedOption="selectedOption"
			:showOptions="showOptions"
			@setSearchText="searchTextHandler"
			@clearSearchText="clearSearchTextHandler"
		></InputComp>


		<div v-show="showOptions" class="autocomplete__options">
			<OptionComp
				class="result"
				:matchComponent= props.matchComponent
				:name="optionText(option)"
				:match="searchText"
				:class="{'selected' : optionText(selectedOption) === optionText(option)}"
				@setSelected="selectOptionHandler(option)"
				v-for="option in props.options">
			</OptionComp>
		</div>

		<InfoComp v-if="props.isLoading || props.options?.length < 1" :isLoading="props.isLoading" :searchText="searchText"></InfoComp>
	</div>
</template>

<style lang="scss" scoped>
.autocomplete {
	@apply w-[500px] my-5 mx-auto select-none;

	&__options{
		@apply max-h-[300px] overflow-y-auto border rounded-md border-slate-200;
	}
}
</style>