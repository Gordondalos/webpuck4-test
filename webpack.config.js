const webpack = require( 'webpack' );
const path = require( 'path' );

// Плагин для проверки регистра подключаемых файлов
const CaseSensitivePathsWebpackPlugin = require( 'case-sensitive-paths-webpack-plugin' );
// Плагин уродывания js
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );

// Плагин для работы с html
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const ExtractTextPlugin = require( "extract-text-webpack-plugin" );

const { CheckerPlugin } = require( 'awesome-typescript-loader' );

const WebpackStrip = require( 'strip-loader' );


module.exports = {

    // указываем где лежит проект - абсолютный путь
    context: path.resolve( __dirname, 'src' ),

    // указать точку входа или несколько
    //entry: './index.js',
    entry: {
        home: './home', // можно например ключ home заменить на index
        shop: './shop',
        profile: './profile',
        index: './index',
        styles: './styles.scss',
        vendor: [ 'jquery' ]
    },

    // указать куда положить, или указать name в которое он подставит ключ из энтри
    output: {
        // filename: 'main.js',
        filename: '[name].js',
        path: path.resolve( __dirname, 'dist' ),
    },

    // указать сурсмапы eval || source-map
    // все виды карт смотри тут https://webpack.js.org/configuration/devtool/#src/components/Sidebar/Sidebar.jsx
    devtool: "source-map",


    // это указывает какие сущьности можно подключать без расширения
    resolve: {
        extensions: [
            '.ts', '.tsx', '.js', '.jsx'
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
        new webpack.DefinePlugin( {
            VERS: JSON.stringify( "0.0.2" ),
            PRODUCTION: false,
            HTML5_SUPPORT: true,
        } ),

        // Плагин для провайда других либ оно не рекомендуется
        new webpack.ProvidePlugin( {
            $: 'jquery' // если так либу удалить то ее можно не импортировать в файлах
        } ),

        // создает и подключает файлы html
        new HtmlWebpackPlugin( {
            title: 'Hello webpack',
            hash: true, // кешируем подключаемые библиотеки
            minify: true, // минификация html, смотри доку там много чего можно передать в минифай
            template: './index.html' // создаем это из шаблона
        } ),

        // лоадер тайп скрипта
        new CheckerPlugin(),

        new ExtractTextPlugin( '[name].css' ),

    ],

    // загрузка лоадеров
    module: {
        rules: [

            // лоадер по идее удаляет все консоли, то ли я криворукий, толи конфиг устарел - пока не работает
            {
                test: /\.js$/,
                loader: "strip-loader",
                options: {
                    strip: [
                        'console.*'
                    ]
                }
            },

            //  экспортировать не экспортируемое
            {
                test: /no-eaport.js/,
                loader: "exports-loader?noexport"
            },

            // зафигачить либы в вендоров в глобальную видимость
            {
                test: require.resolve( 'jquery' ),
                loader: 'expose-loader?$' // тут указывается в какую переменную их положить
            },


            // работа с sass
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract( {
                    fallback: "style-loader",
                    allChunks: true,
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                // If you are having trouble with urls not resolving add this setting.
                                // See https://github.com/webpack-contrib/css-loader#url
                                url: false,
                                minimize: false,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]

                } ),
            },

            // лоадер для тайпскрипта
            {
                // регулярка для расширения
                test: /\.ts$/,
                // указываем какой лоадер будет сним работать
                loader: 'awesome-typescript-loader'
            }
        ]
    },

    optimization: {
        // непонятная фигня или не работает так делается оптисизация
        // splitChunks: {
        //     chunks: 'async',
        //     minSize: 30000,
        //     maxSize: 0,
        //     minChunks: 1,
        //     maxAsyncRequests: 5,
        //     maxInitialRequests: 3,
        //     automaticNameDelimiter: '~',
        //     name: true,
        //     cacheGroups: {
        //         vendors: {
        //             test: /[\\/]node_modules[\\/]/,
        //             priority: -10
        //         },
        //         default: {
        //             minChunks: 2,
        //             priority: -20,
        //             reuseExistingChunk: true
        //         }
        //     }
        // }
    }


};