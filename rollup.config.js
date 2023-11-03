import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import strip from "@rollup/plugin-strip";
import terser from "@rollup/plugin-terser";
import autoprefixer from "autoprefixer";
import cssNano from "cssnano";
import postcssPreset from "postcss-preset-env";
import pluginDelete from "rollup-plugin-delete";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";
import stylelint from "stylelint";
import pkg from "./package.json" assert { type: "json" };

const postcssPlugins = [
  autoprefixer,
  cssNano({
    preset: "default",
  }),
  stylelint({
    quiet: true,
  }),
  postcssPreset({
    stage: 2,
  }),
];
const name = pkg.name;

export default {
  input: "src/react-pointer-plus.ts",
  output: [
    {
      file: `dist/${name}.js`,
      format: "es",
      sourcemap: true,
    },
    {
      file: `dist/${name}.cjs.js`,
      format: "cjs",
      sourcemap: true,
    },
    {
      name: "ReactContextAware",
      file: `dist/${name}.umd.js`,
      format: "umd",
      sourcemap: true,
    },
    // {
    //   name: "YourLibrary",
    //   file: "dist/react-custom-pointer.system.js",
    //   format: "system",
    //   sourcemap: true,
    // },
  ],
  plugins: [
    pluginDelete({ targets: "dist/*" }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    peerDepsExternal(),
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      clean: true,
      tsconfig: "./tsconfig-lib.json",
    }),
    strip(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "runtime",
      presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript",
      ],
      plugins: [
        // Add any additional Babel plugins you need
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-transform-destructuring",
      ],
    }),
    postcss({
      modules: true,
      extract: `${name}.css`,
      sourceMap: true,
      plugins: postcssPlugins,
      use: ["sass"],
    }),
    terser(),
  ],
};
