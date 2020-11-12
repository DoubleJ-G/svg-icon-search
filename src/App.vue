<template>
	<div id="app" class="w-1/2 mx-auto mt-8">
		<div class="flex">
			<input
				type="text"
				class="h-12 w-full block p-4 mx-auto border border-black"
				v-model="search"
				@input="runSearch"
			/>
			<select
				type="text"
				class="h-12 w-25 block px-4 mx-auto border border-black"
				v-model="size"
			>
				<option
					v-for="px in 21"
					:key="px"
					:value="75 + px * 25 + 'px'"
					>{{ 75 + px * 25 + 'px' }}</option
				>
			</select>
		</div>

		<ColorPicker :value="color" @color="color = $event" />
		<div class="w-full h-1/2 border-t mt-4 flex flex-wrap justify-center">
			<div
				v-for="svg in results"
				:key="svg.path"
				class="m-2 cursor-pointer mx-auto"
			>
				<div>
					<div
						@click="copy($event)"
						class="flex items-center justify-center flex-col fill"
						:style="{ width: size, height: size, color: color }"
					>
						<InlineSvg
							:src="
								require('./assets/svgs/' +
									/img\/([^\.]*)/
										.exec(svg.path)[1]
										.replace('img/', '') +
									'.svg')
							"
							fill="currentColor"
						/>
					</div>

					<div class="mx-auto w-3/4 text-center text-xl ">
						{{
							titleCase(
								/img\/([^\.]*)/.exec(svg.path)[1].toLowerCase()
							)
						}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ColorPicker from './components/ColorPicker';
import InlineSvg from 'vue-inline-svg';

export default {
	components: {
		ColorPicker,
		InlineSvg,
	},
	data: function() {
		return {
			color: '#000000',
			svgs: [],
			results: [],
			size: '200px',
			search: '',
		};
	},
	methods: {
		outerHTML(node) {
			return (
				node.outerHTML || new XMLSerializer().serializeToString(node)
			);
		},
		copy(el) {
			const svg = el.target.closest('svg');
			this.copyToClipboard(this.outerHTML(svg));
		},
		copyToClipboard(text) {
			if (navigator.clipboard) {
				// default: modern asynchronous API
				return navigator.clipboard.writeText(text);
			} else if (window.clipboardData && window.clipboardData.setData) {
				// for IE11
				window.clipboardData.setData('Text', text);
				return Promise.resolve();
			} else {
				// workaround: create dummy input
				var input = document.createElement('INPUT');
				input.setAttribute('type', 'text');
				input.value = text;
				document.body.append(input);
				input.focus();
				input.select();
				document.execCommand('copy');
				input.remove();
				return Promise.resolve();
			}
		},
		runSearch() {
			this.results = this.svgs.filter((svg) =>
				svg.path.toLowerCase().includes(this.search.toLowerCase())
			);
		},
		titleCase(str) {
			return str
				.split(' ')
				.map((s) => s.replace(s.charAt(0), s.charAt(0).toUpperCase()))
				.join(' ');
		},
	},
	computed: {
		css() {
			return `.fill svg { fill: ${this.color} }`;
		},
	},
	mounted() {
		const data = require.context('./assets/svgs/', true, /\.svg$/);
		data.keys().forEach((key) => {
			this.svgs.push({ path: './assets/svgs' + data(key) });
		});
		this.runSearch();
	},
};
</script>
