<script setup>
import customers from './assets/data/customers.json';
import AutoComplete from './components/AutoComplete.vue'
	const customerSelected = (customer) => {
		console.log(`Customer Selected:\nid: ${customer.id}\nname: ${customer.name}`);
	}
</script>
<template>
  <div id="app">
    <AutoComplete :data="customers"
      filterby="name"
      title="Search for a customer"
      @selected="customerSelected"/>
  </div>
</template>
<style>
#app {
  margin: 0px auto;
  margin-top: 60px;
  width: 400px;
}
</style>