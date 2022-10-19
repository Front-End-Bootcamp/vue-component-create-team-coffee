<script setup>
const props = defineProps({ isPopupActive: Boolean });
const emit = defineEmits(['isPopupActive']);

const clickHandler = (status) => {
	emit('isPopupActive', status);
}
</script>

<template>
	<Transition name="popup">
		<div v-if="isPopupActive" class="popup__mask">
			<div class="popup__wrapper">
				<div class="popup__container">
					<button @click="clickHandler()">
							<svg id="close__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
								viewBox="0 0 1024 1024">
								<path
									d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4l-66.1-.3c-4.4 0-8 3.5-8 8c0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4l66 .3c4.4 0 8-3.5 8-8c0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"
									fill="currentColor"></path>
								<path
									d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448s448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"
									fill="currentColor"></path>
							</svg>
						</button>
					<div class="popup__header">
						<slot name="header">Pop-Up Title</slot>
					</div>
					<div class="popup__body">
						<slot name="body">On the other hand, we denounce with righteous indignation and dislike men who are so
							beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot
							foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their
							duty through weakness of will, which is the same as saying through shrinking from toil and pain. These
							cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is
							untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be
							welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the
							obligations of business it will frequently occur that pleasures have to be repudiated and annoyances
							accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects
							pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</slot>
					</div>
					<div class="popup__footer">
						<button class="popup__button" @click="clickHandler()">Close</button>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<style lang="scss" scoped>
.popup {
	position: fixed;

	&__mask {
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.5);
		display: table;
		transition: opacity 0.3s ease;
	}

	&__wrapper {
		display: table-cell;
		vertical-align: middle;
	}

	&__container {
		width: 50%;
		margin: 0px auto;
		padding: 20px 30px;
		background-color: #fff;
		border-radius: 3px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
		transition: all 0.3s ease;
		text-align: right;
	}

	&__header {
		margin-top: 0;
		color: #42b983;
		font-weight: bolder;
		text-align: center;
	}

	&__body {
		margin: 20px 0;
		font-weight: lighter;
		text-align: center;
	}

	&__footer {
		text-align: center;
	}

	&__button {
		background: linear-gradient(to bottom right, #EF4765, #FF9A5A);
		border: 0;
		border-radius: 12px;
		color: whitesmoke;
		cursor: pointer;
		display: inline-block;
		font-size: 16px;
		font-weight: 500;
		line-height: 2.5;
		outline: transparent;
		padding: 0 1rem;
		text-decoration: none;
		transition: box-shadow .2s ease-in-out;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
		white-space: nowrap;

		&:not([disabled]) {
			&:hover {
				box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5);
				color: black;
			}
		}
	}
}

.popup-enter-from {
	opacity: 0;
}

.popup-leave-to {
	opacity: 0;
}

.popup-enter-from .popup__container,
.popup-leave-to .popup__container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}

#close__svg {
	color: #42b983;
	height: 30px;
	&:hover {
		color: indianred;
	}
}
</style>