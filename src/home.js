import * as app from './component/app';
import './Module';
import * as $ from 'jquery'; //не надо импортировать так как ProvidePlugin
import * as _ from 'lodash';
import * as noexport from 'no-export';

app.action();

$( 'body > .wrapper' ).html( '<p>Привет мир</p>' );

console.log('noexport', noexport);

console.log(_);
console.log($);


// переменные определены глобально в вебпаке
if ( !( PRODUCTION ) ) {
    console.log( VERS );
} else {
    console.log( HTML5_SUPPORT );
}


console.log( 'Home page' );