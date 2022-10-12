<script setup>
import { computed, ref } from "vue";
const props = defineProps(["data", "filterBy", "title"]);
const emit = defineEmits(['setSelected']);
const input = ref(null);
const optionsList = ref(null);
const itemHeight = ref(39);
const selectedItem = ref(null);
const visible = ref(true);
const query = ref('');

const matches = computed(() => {
	return props.data.filter((item) => item[props.filterBy].toLowerCase().includes(query.value.toLowerCase()))
})

const itemClicked = (match) => {
	selectedItem.value = match;
	query.value = match.name;
	emit('setSelected', selectedItem.value);
}

const remove = () => {
	query.value = '';
	selectedItem.value = 0;
}

// const scrollToItem = () => {
// 	return optionsList.value.scrollTop = selected.value * itemHeight.value;
// }

</script>
<template>
	<!-- <div class="autocomplete"> -->
	<div class="container">
		<pre>{{matches}}</pre>
		<div class="popover" v-show="visible">
			<div class="input-wrapper">
				<input class="popover__input" type="text" ref="input" v-model.trim="query"
					@keydown.enter="selectItem" placeholder="Start Typing...">
				<button class="close" @click="remove " v-if="selectedItem">X</button>
			</div>

			<div class="options" ref="optionsList">
				<ul>
					<li v-for="match in matches" :key="match.id" :class="{ 'selected': (selectedItem?.id == match.id)}"
						@click="itemClicked(match)" v-text="match[props.filterBy]"></li>
				</ul>
			</div>
		</div>
	</div>


	<!-- </div> -->
</template>
<style scoped>

.container{
	display: flex;
}
.popover {
	min-width: 300px;
	border: 2px solid lightgray;
	border-radius: 25px;
	overflow: hidden;
	text-align: center;
	justify-content: center;
}


.input-wrapper {
	display: flex;
}

.popover__input {
	flex: 1;
	padding: 15px 20px;
	font-size: 16px;
	border-radius: 25px;
}

.close {
	color: black;
	padding: 0 8px;
	cursor: pointer;
}

.options {
	max-height: 450px;
	color: black;
	align-items: center;
	justify-content: center;
	overflow-y: scroll;



}

.options ul {
	/* list-style-type: none; */
	text-align: left;
	border-top-right-radius: 25px;
	border-bottom-right-radius: 25px;
	border-top-left-radius: 25px;
	border-bottom-left-radius: 25px;

}

.options ul li {
	list-style-type: none;
	border-bottom: 1px solid lightgray;
	padding: 10px;
	cursor: pointer;
	min-width: 100%;
	background: #f1f1f1;
	position: flex;
	/* border-top-right-radius: 25px;
		border-bottom-right-radius: 25px;
		border-top-left-radius: 25px;
		border-bottom-left-radius: 25px; */
}

.options ul li:first-child {
	border-top: 2px solid #d6d6d6;
}

.options ul li:not(.selected):hover {
	background: #bfb3b3;
	color: #fff;
}

.options ul li.selected {
	background: rgb(143, 135, 135);
	color: #fff;
	font-weight: 600;
}
</style>
