const webpack = require( 'webpack' );
const path = require( 'path' );

// Плагин для проверки регистра подключаемых файлов
const CaseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');
// Плагин уродывания js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


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
    watch: true,


    // для подключения плагина достаточно просто положить экземпляр плагина
    plugins: [
        // плагин проверки регистра файлов
        new CaseSensitivePathsWebpackPlugin(),
        // плагин уродывания js
        new UglifyJsPlugin(),
    ]


};