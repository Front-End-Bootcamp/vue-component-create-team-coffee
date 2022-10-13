<script setup>
const props = defineProps(["searchText"])
</script>

<template>
	<div class="not-found">Your search - {{props.searchText}} - did not match any options.</div>
</template>


<style lang="scss" scoped>
.not-found {
	@apply px-3 py-2 border border-slate-200 rounded-md break-words
}
</style>