<script setup>
import { ref, computed } from 'vue';
import { useClickOnTarget } from '@/composables/clickOnTarget';
import OptionComp from './AutoCompleteOption.vue';
import InfoComp from './AutoCompleteInfo.vue';
import InputComp from './AutoCompleteInput.vue';

const props = defineProps({
	options: Array,
	searchValue: String,
	textKey: Function,
	isLoading: Boolean,
	loadingMsg: {
		type: String,
		default: "Options loading."
	},

	noOptionsMsg: {
		type: Function,
		default(searchText){
			return `Your search - ${searchText} - did not match any options.`
		}
	},

	label: {
		type: String,
		default: "Type for search..."
	},
	matchComponent: {
		type: String,
		default: "b"
	},
	inputColor: {
		type: String,
		default: "#1E293B"
	},
	optionColor: {
		type: String,
		default: "#1E293B"
	},
	iconColor: {
		type: String,
		default: "#fff"
	},
	infoColor: {
		type: String,
		default: "#1E293B"
	}
	
})
const emits = defineEmits(["setSearchText","setSelected"])
const wrapper = ref(null) //template ref clickoutside özelliğini kullanabilmek için
const searchText = ref(props.searchValue)	//Inputtan gelen değer
const selectedOption = ref(null) // Seçilen option
const inputValue = computed(() => searchText.value || optionText(selectedOption.value)) //Inputa verilen değer seçilen option'ın text'i yada inputtan gelen değer.
const showOptions = computed(() => isClickOnTarget.value && !selectedOption.value && props.options?.length > 0) // Seçili option yoksa ve autocomplete'e focus olunduysa seçenekler gösterilir.
const isClickOnTarget = useClickOnTarget(wrapper) //Hedefe yani autocomplete'e tıklanıldı mı.
const optionText = (option) => props.textKey(option) //Dışarıdan alınan datanın text'i local data Örn: option.code, option.name.

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
	<div ref="wrapper"  class="autocomplete">
		<InputComp
			:color="props.inputColor"
			:iconColor="props.iconColor"
			:label="props.label"
			:inputValue="inputValue"
			:selectedOption="selectedOption"
			:showOptions="showOptions"
			:isLoading="props.isLoading"
			@setSearchText="searchTextHandler"
			@clearSearchText="clearSearchTextHandler"
		></InputComp>


		<div v-show="showOptions" class="autocomplete__options">
			<OptionComp
				:color="props.optionColor"
				:matchComponent= props.matchComponent
				:name="optionText(option)"
				:match="searchText"
				:class="{'selected' : optionText(selectedOption) === optionText(option)}"
				@setSelected="selectOptionHandler(option)"
				v-for="option in props.options">
			</OptionComp>
		</div>

		<InfoComp 
			v-if="props.isLoading || props.options?.length < 1" 
			:isLoading="props.isLoading" 
			:searchText="searchText" 
			:color="props.infoColor"
			:loadingMsg="props.loadingMsg"
			:noOptionsMsg="props.noOptionsMsg"
			></InfoComp>
	</div>
</template>

<style lang="scss" scoped>
.autocomplete {
	@apply w-[500px] mx-auto mt-5 select-none rounded-md overflow-hidden;

	&__options{
		@apply max-h-[300px] overflow-y-auto rounded-md divide-y border border-slate-400 border-t-0;
	}
}

::-webkit-scrollbar {
		width: 12px;
	}

::-webkit-scrollbar-track {
	background-color: #334155;
	border-radius: 100px;
}

::-webkit-scrollbar-thumb {
	background: #0f172a;
	border-radius: 100px;
	min-height: 15%;
}
</style>