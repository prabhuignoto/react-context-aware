import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import strip from "@rollup/plugin-strip";
import terser from "@rollup/plugin-terser";
import autoprefixer from "autoprefixer";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json" assert { type: "json" };
import rollupDelete from "rollup-plugin-delete";

const postcssPlugins = [autoprefixer];
const name = pkg.name;

export default {
  input: "src/react-context.ts",
  output: [
    {
      file: `dist/${name}.esm.js`,
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
      extract: true,
      sourceMap: true,
      plugins: postcssPlugins,
      use: ["sass"],
    }),
    terser(),
  ],
};
