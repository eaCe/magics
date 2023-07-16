let mix = require('laravel-mix');
mix.options({ manifest: false });
mix.minify('src/magics.js', 'dist/magics.min.js');