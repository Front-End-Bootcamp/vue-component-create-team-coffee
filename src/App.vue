<script setup>
	import AutoComplete from './components/AutoComplete/AutoComplete.vue';
	import Popup from './components/Popup/Popup.vue';
	import {delay} from '@/utils';
	import {fetchData} from '@/service/data';
	import { onMounted, ref} from 'vue';

	const autocompleteData = ref([])
	const isPopupActive = ref(false);

	const togglePopup = () => {
		isPopupActive.value = !(isPopupActive.value);
		return togglePopup;
	}
	const searchText = ref("")
	const isLoading = ref(false)

	const autocompleteData2 = ref([])
	const searchText2 = ref("")
	const isLoading2 = ref(false)

	const selectHandler = (item) => {
		console.log('item :>> ', item);
	}
	
	onMounted(async () => {
		isLoading.value = true
		autocompleteData.value = await fetchData()
		isLoading.value = false
	})
	
	const searchTextHandler = (text) => {
		searchText.value = text
	}

	const searchTextHandler2 = async (text) => {
		autocompleteData2.value = []
		searchText2.value = text
		isLoading2.value = true
		await delay(500)
		autocompleteData2.value = autocompleteData.value
		isLoading2.value = false
	}

</script>
<template>
	<div class="app-container">

		<AutoComplete
			matchComponent="b"
			inputColor="#1E293B"
			optionColor="#1E293B"
			infoColor="#1E293B"
			iconColor="#fff"
			label="Search in free apis..."
			loadingMsg="Suggestions loading"
			:noOptionsMsg="(searchText) => `Your search '${searchText}' did not match any options.`"
			:textKey="(option) => option?.API"
			:searchValue="searchText"
			:options="autocompleteData"
			:isLoading="isLoading"
			@setSelected="selectHandler"
			@setSearchText="searchTextHandler"
		></AutoComplete>

		<AutoComplete
			matchComponent="mark"
			inputColor="#1E293B"
			optionColor="#1E293B"
			infoColor="#1E293B"
			iconColor="#fff"
			label="Search in free apis..."
			loadingMsg="Suggestions loading"
			:noOptionsMsg="(searchText) => `Your search '${searchText}' did not match any options.`"
			:textKey="(option) => option?.API"
			:searchValue="searchText"
			:options="autocompleteData2"
			:isLoading="isLoading2"
			@setSelected="selectHandler"
			@setSearchText="searchTextHandler2"
		></AutoComplete>

		<button @click="isPopupActive = true">Show Popup</button>
		<Teleport to="body">
			<Popup @isPopupActive="togglePopup" :isPopupActive="isPopupActive"></Popup>
		</Teleport>
	</div>

</template>

<style scoped lang="scss">

</style>
