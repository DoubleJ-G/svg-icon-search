<template>
	<div class="flex justify-between mt-4 w-full mx-auto">
		<div
			v-for="color in colorOptions"
			:key="color"
			:value="color"
			class="w-12 h-12 cursor-pointer border border-black"
			:style="{ backgroundColor: color }"
			@click="$emit('color', color)"
		/>
	</div>
</template>

<script>
export default {
	props: ['value'],
	data: function() {
		return {
			colorOptions: [
				'#78BE20', // Light Green
				'#509E2F', // Medium Green
				'#4A7729', // Dark Green

				'#009CDE', // Light Blue
				'#005788', // Medium Blue
				'#004C97', // Dark Blue

				'#FF8F1C', // Light Orange
				'#FF6900', // Medium Orange
				'#DC4405', // Dark Orange

				'#5C068C',
				'#3C1053',
				'#2E1A47',

				'#EE2737', // Light Red
				'#C8102E', // Medium Red
				'#A6192E', // Dark Red

				'#FFFFFF', // White
				'#F6F7F8', // Grey
				'#000000', // Black;
			],
		};
	},
};
</script>

<style scoped></style>
