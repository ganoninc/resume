import { ghPages } from 'vite-plugin-gh-pages'

/** @type {import('vite').UserConfig} */
export default {
    base: '/resume/',
    plugins: [ghPages()],
}
