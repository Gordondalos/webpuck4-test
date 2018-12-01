import * as app from './component/app';
import './Module';
import * as $ from 'jquery';

app.action();

$( 'body' ).html( 'Привет мир' );

if ( !( PRODUCTION ) ) {
    console.log( VERS );
} else {
    console.log( HTML5_SUPPORT );
}


console.log( 'Home page' );