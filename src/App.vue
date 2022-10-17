<script setup>
	import AutoComplete from './components/AutoComplete/AutoComplete.vue';
	import Popup from './components/Popup/Popup.vue';
	import {delay} from '@/utils';
	import {fetchData , filterBySearchInput} from '@/service/data';
	import { onMounted, ref} from 'vue';

	const autocompleteData = ref([])
	const searchText = ref("")
	const filterBySearch = ref(null)
	const isLoading = ref(false)
	const selectHandler = (item) => {
		console.log('item :>> ', item);
	}
	
	onMounted(async () => {
		isLoading.value = true
		autocompleteData.value = await fetchData()
		isLoading.value = false
	})
	
	const searchTextHandler = async (text) => {
		filterBySearch.value = []
		searchText.value = text
		isLoading.value = true
		await delay(500)
		const filteredData = filterBySearchInput(autocompleteData.value, searchText.value)
		filterBySearch.value = searchText.value ? filteredData : null
		isLoading.value = false
	}

</script>
<template>
	<div class="app-container">
		<AutoComplete
			matchComponent="b"
			label="Search in free apis..."
			inputColor="#1E293B"
			optionColor="#1E293B"
			infoColor="#1E293B"
			iconColor="#fff"
			:textKey="(option) => option?.API"
			:searchValue="searchText"
			:options="filterBySearch"
			:isLoading="isLoading"
			@setSelected="selectHandler"
			@setSearchText="searchTextHandler"
		></AutoComplete>
		<Popup></Popup>
	</div>

</template>

<style scoped lang="scss">

</style>