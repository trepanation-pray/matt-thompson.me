const dotenv = require("dotenv").config({ path: "../../../../.env" });
const gulp = require("gulp");
const rollup = require("gulp-better-rollup");
const babel = require("rollup-plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const format = require("date-format");
const log = require("fancy-log");
const colour = require("ansi-colors");
const sass = require("gulp-sass");
const del = require("del");
const image = require("gulp-image");
const cleanCSS = require("gulp-clean-css");
const autoprefix = require("gulp-autoprefixer");
const rename = require("gulp-rename");

// Notification Styles
let timeStyle = 'style="opacity: .5; float: right; margin-left: 10px;"';
let time =
	"<span " +
	timeStyle +
	">" +
	format.asString(new Date(), "[HH:MM:ss]") +
	"</span>";
let codeStyle =
	'style="marign-bottom: 0; color: white; border-radius: 5px; padding: 5px 10px; border: 1px solid rgba(255,255,255,.15);"';

// Build JS
function js() {
	let time =
		"<span " +
		timeStyle +
		">" +
		format.asString(new Date(), "[HH:MM:ss]") +
		"</span>";
	return gulp
		.src("src/js/*.js")
		.pipe(rollup({ plugins: [babel(), resolve(), commonjs()] }, "umd"))
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"))
		.on("error", function(err) {
			log(
				colour.red("⚠️ Javascript error"),
				browserSync.notify(
					"⚠️ <strong>Javascript error</strong> " +
						time +
						"<pre " +
						codeStyle +
						">" +
						err.message +
						"</pre>File: " +
						err.filename +
						"<br>Line: " +
						err.line,
					5000
				),
				err.toString()
			);
		})
		.pipe(sourcemaps.write("."))
		.pipe(
			browserSync.stream(),
			log(browserSync.notify("✅ Javascript built " + time))
		);
}

// Preprocess sass file + minify
function css() {
	let time =
		"<span " +
		timeStyle +
		">" +
		format.asString(new Date(), "[HH:MM:ss]") +
		"</span>";
	return gulp
		.src("src/scss/style.scss")
		.pipe(sass({ sourcemaps: true }))
		.on("error", function(err) {
			log(
				colour.red("⚠️ SCSS error"),
				browserSync.notify(
					"⚠️ <strong>SCSS error</strong> " +
						time +
						"<pre " +
						codeStyle +
						">" +
						err.messageOriginal +
						"</pre>File: " +
						err.relativePath +
						"<br>Line: " +
						err.line,
					5000
				),
				err.messageFormatted.toString()
			);
		})
		.pipe(autoprefix())
		.pipe(rename({ suffix: ".min" }))
		.pipe(cleanCSS({ rebase: false }))
		.pipe(gulp.dest("dist/css"))
		.pipe(
			browserSync.stream(),
			log(browserSync.notify("✅ SASS built " + time))
		);
}

function fonts() {
	return gulp
		.src(["src/fonts/**.*","node_modules/@fortawesome/fontawesome-pro/webfonts/**.*"])
		.pipe(gulp.dest("dist/fonts"))
		.pipe(browserSync.stream());
}

function images() {
	return gulp
		.src("src/images/**/*")
		.pipe(image())
		.pipe(gulp.dest("dist/images/"))
		.pipe(browserSync.stream());
}

function watch() {
	// Browser Sync
	build();
	browserSync.init({
		open: "external",
		host: process.env.WP_HOME.substring("http://".length),
		proxy: process.env.WP_HOME,
		notify: {
			styles: [
				"text-align: left",
				"display: none; ",
				"padding: 15px 20px 10px;",
				"position: fixed;",
				"font-size: 1em;",
				"line-height: 2em;",
				"z-index: 9999;",
				"left: 10px;",
				"bottom: 10px;",
				"border-radius: 5px;",
				"color: white;",
				"background-color: #0f2634;"
			]
		}
	});
	gulp.watch("**/*.php").on(
		"change",
		browserSync.reload,
		browserSync.notify("✅  PHP file change " + time)
	);
	gulp.watch("src/js/**/*.js", js);
	gulp.watch("src/scss/**/*.scss", css);
	gulp.watch("src/fonts/**/*", fonts);
	gulp.watch("src/images/**/*", images);
}

// Remove pre-existing content from dist folders
function clean() {
	return del(["dist/**"]);
}

// Define any complex build tasks
const build = gulp.series(clean, js, css, fonts, images);
const start = gulp.series(build, watch);

// export tasks
exports.css = css;
exports.js = js;
exports.images = images;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.start = start;
exports.default = build;
