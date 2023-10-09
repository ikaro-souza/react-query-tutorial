/** @type {import("prettier").Config} */
const config = {
    plugins: [require.resolve("prettier-plugin-tailwindcss")],
    tabWidth: 4,
    arrowParens: "always",
    trailingComma: "all",
    printWidth: 80,
};

module.exports = config;
