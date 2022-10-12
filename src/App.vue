<script setup>
import customers from './assets/customers';
import AutoComplete from './components/AutoComplete.vue'
	const customerSelected = (customer) => {
		console.log(`Customer Selected:\nid: ${customer.id}\nname: ${customer.name}`);
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