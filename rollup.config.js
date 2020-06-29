import babel from 'rollup-plugin-babel';

export default {
	input: 'src/bane.js',
	output: {
		file: 'out/bane.js',
		format: 'iife',
		sourcemap: 'true',
	},
	plugins: [
		babel({
			exclude: 'node_modules/**',
			'extensions': [ '.js', '.ts' ],
		})
	],
};