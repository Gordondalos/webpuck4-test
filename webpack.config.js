const webpack = require( 'webpack' );
const path = require( 'path' );

// Плагин для проверки регистра подключаемых файлов
const CaseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');
// Плагин уродывания js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Плагин для работы с html
const HtmlWebpackPlugin = require('html-webpack-plugin');




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
        // Плагин делает глобальные переменные для проекта в нем определяются константы которые нужны в коде
        new webpack.DefinePlugin({
            VERS: JSON.stringify("0.0.2"),
            PRODUCTION: false,
            HTML5_SUPPORT: true,
        }),

        // Плагин для провайда других либ оно не рекомендуется
        new webpack.ProvidePlugin({
            $: 'jquery' // если так либу удалить то ее можно не импортировать в файлах
        }),

        // создает и подключает файлы html
        new HtmlWebpackPlugin({
            title: 'Hello webpack',
            hash: true, // кешируем подключаемые библиотеки
            minify: true, // минификация html, смотри доку там много чего можно передать в минифай
            template: './index.html' // создаем это из шаблона
        }),

    ],

    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }



};