<template>
	<div id="app">
		<div class="controls border-b border-black ">
			<input
				type="search"
				name="search"
				placeholder="Search Icons"
				id="search"
				class="border border-black px-4 py-1"
			/>
			<select
				name="color"
				id="color "
				class="border border-black px-4 py-1"
			>
				<option
					v-for="color in colorOptions"
					:key="color.value"
					:value="color.value"
				>
					{{ color.name }}
				</option>
			</select>
		</div>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			colorOptions: [{ name: 'SMB Light Blue', value: '#0000ff' }],
		};
	},
};
</script>

<style></style>
