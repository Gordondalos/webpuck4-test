const webpack = require( 'webpack' );
const path = require( 'path' );

module.exports = {

    // указываем где лежит проект - абсолютный путь
    context: path.resolve(__dirname, 'src'),

    // указать точку входа или несколько
    //entry: './index.js',
    entry: {
        home: './home', // можно например ключ home заменить на index
        shop: './shop',
        profile: './profile',
    },

    // указать куда положить, или указать name в которое он подставит ключ из энтри
    output: {
        // filename: 'main.js',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },

    // указать сурсмапы eval || source-map
    // все виды карт смотри тут https://webpack.js.org/configuration/devtool/#src/components/Sidebar/Sidebar.jsx
    devtool: "source-map",


    // это указывает какие сущьности можно подключать без расширения
    resolve: {
        extensions: [
            '.js',
            '.html'
        ]
    },

    // по умолчанию фолс, если поставить true То будет запускать смотрение
    watch: true


};