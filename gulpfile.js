const { src, dest, watch, parallel } = require("gulp");
// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
// Imagenes
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function css(callback) {
  src("src/scss/**/*.scss") // Identificar el archivo SASS
    .pipe(plumber())
    .pipe(sass()) // Compilarlo
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
  src("src/js/**/*.js").pipe(dest("build/js"));
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
