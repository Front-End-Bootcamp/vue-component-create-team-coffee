<script setup>
	import AutoComplete from './components/AutoComplete/AutoComplete.vue';
	import Popup from './components/Popup/Popup.vue';
	import {fetchData} from './service/data';
	import { onMounted, ref } from 'vue';

	const autocompleteData = ref([])
	const selectHandler = (item) => {
		console.log('item :>> ', item);
	}

	onMounted(async () => {
		autocompleteData.value = await fetchData()
	})
	
</script>
<template>
	<AutoComplete :options="autocompleteData" optionText="name" label="Search for a customer" @setSelected="selectHandler"></AutoComplete>
	<Popup></Popup>
</template>