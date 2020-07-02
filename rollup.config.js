import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import polyfills from 'rollup-plugin-node-polyfills';

export default {
	input: 'src/bane.js',
	output: {
		file: 'out/bane.js',
		format: 'iife',
		sourcemap: 'true',
		name:'main',
	},
	plugins: [
		babel({
			exclude: 'node_modules/**',
			extensions: ['.js', '.node','.ts']
		}),
		resolve({extensions: ['.js', '.node','.ts']}),
		commonjs({extensions: ['.js', '.node','.ts']}),
		json(),
		polyfills()
	],
};