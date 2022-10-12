<script setup>
import { ref } from 'vue';
import customers from './assets/data/customers.json';
import AutoComplete from './components/AutoComplete.vue'
const selectedItem = ref(null)
	const customerSelected = (customer) => {
		console.log(`Customer Selected:\nid: ${customer.id}\nname: ${customer.name}`);
		selectedItem.value = customer
	}
</script>
<template>
    <AutoComplete :data="customers"
      filterby="name"
      title="Search for a customer"
      @selected="customerSelected"/>
</template>
<style>

</style>