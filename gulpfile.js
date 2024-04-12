const { src, dest, watch, parallel } = require("gulp");
// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
// Imagenes
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const webp = require("gulp-webp");
const avif = require("gulp-avif");
// Javascript
const terser = require("gulp-terser-js");

function css(callback) {
  src("src/scss/**/*.scss") // Identificar el archivo SASS
    .pipe(sourcemaps.init()) // Iniciar el sourcemap
    .pipe(plumber())
    .pipe(sass()) // Compilarlo
    .pipe(postcss([autoprefixer(), cssnano()])) // Autoprefijar y minificarlo
    .pipe(sourcemaps.write(".")) // Terminar el sourcemap
    .pipe(dest("build/css")); // Almacenarlo en el disco duro

  callback(); // Callback que indica que la tarea ha terminado
}

function imagenes(callback) {
  const opciones = {
    optimizationLevel: 3,
  };
  src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));

  callback();
}

function versionWebp(callback) {
  const opciones = {
    quality: 50,
  };
  src("src/img/**/*.{png,jpg}").pipe(webp(opciones)).pipe(dest("build/img"));

  callback();
}

function versionAvif(callback) {
  const opciones = {
    quality: 50,
  };
  src("src/img/**/*.{png,jpg}").pipe(avif(opciones)).pipe(dest("build/img"));

  callback();
}

function javascript(callback) {
  src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/js"));

  callback();
}

function dev(callback) {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", javascript);

  callback();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);
