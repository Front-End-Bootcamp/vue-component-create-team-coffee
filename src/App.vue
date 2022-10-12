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
  <div id="app">
    <AutoComplete :data="customers"
      filterby="name"
      title="Search for a customer"
      @setSelected="customerSelected"/>
  </div>
</template>
<style>
#app {
  margin: 0px auto;
  margin-top: 60px;
}
</style>