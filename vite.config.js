import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig(({ mode, command }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const isRunningBuild = command === 'build';
    const isProdBuild = isRunningBuild && mode === 'production';
    const isProdDevBuild = isRunningBuild && mode === 'development';
    const isTesting = !!process.env.VITEST;

    return {
        base: './',
        plugins: [
            tailwindcss(),
            laravel({
                input: ['resources/css/app.css', 'resources/js/index.js'],
                refresh: true,
                publicDirectory: isProdDevBuild ? 'resources/dist-dev' : 'resources/dist',
                hotFile: 'resources/dist/hot',
            }),
        ],
        css: {
            devSourcemap: true,
        },
        resolve: {
            tsconfigPaths: true,
            alias: {
                vue: 'vue/dist/vue.esm-bundler.js',
            },
        },
        build: {
            minify: isProdBuild
        },
        define: {
            ...(isRunningBuild && { 'process.env.NODE_ENV': isProdDevBuild ? '"development"' : '"production"' }),
        }
    };
});
