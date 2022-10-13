<script setup>
import { ref, computed } from 'vue';
import { useClickOnTarget } from '@/composables/clickOnTarget';
import OptionComp from './AutoCompleteOption.vue';
import NoOptionComp from './AutoCompleteNoOption.vue';
import InputComp from './AutoCompleteInput.vue';

const props = defineProps(["options", "optionText", "label"])
const emits = defineEmits(["setSelected"])

const wrapper = ref(null) //template ref clickoutside özelliğini kullanabilmek için
const searchText = ref("")	//Inputtan gelen değer
const selectedOption = ref(null) // Seçilen option
const inputValue = computed(() => searchText.value || optionText(selectedOption.value)) //Inputa verilen değer seçilen option'ın text'i yada inputtan gelen değer.
const filterBySearch = computed(() => props.options.filter(option => optionText(option).toLowerCase().includes(searchText.value.toLowerCase())))
const showOptions = computed(() => isClickOnTarget.value && !selectedOption.value) // Seçili option yoksa ve autocomplete'e focus olunduysa seçenekler gösterilir.
const isClickOnTarget = useClickOnTarget(wrapper) //Hedefe yani autocomplete'e tıklanıldı mı.
const optionText = (option) => option?.[props.optionText] //Dışarıdan alınan datanın text'i local data Örn: option.code, option.name.

const selectOptionHandler = (option) => {
	searchText.value = ""
	selectedOption.value = option
	emits("setSelected", option)
}

const searchTextHandler = (text) => {
	searchText.value = text
	selectedOption.value = null
}

const clearSearchTextHandler = () => {
	searchText.value = ""
	selectedOption.value = null
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

		<div v-if="filterBySearch.length > 0" v-show="showOptions" class="autocomplete__options">
			<OptionComp 
				class="result" 
				matchComponent="b" 
				:name="optionText(option)" 
				:match="searchText"
				:class="{'selected' : optionText(selectedOption) === optionText(option)}" 
				@setSelected="selectOptionHandler(option)"
				v-for="option in filterBySearch">
			</OptionComp>
		</div>

		<NoOptionComp v-else :searchText="searchText"></NoOptionComp>
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