//#=include ./node_modules/ua-parser-js/src/ua-parser.js
import UAParser from 'ua-parser-js';
import Clipboard from 'clipboard';

'use strict';
var GCPI = {
	styles: 'position: fixed; \
		top: 0px; \
		left: 0px; \
		bottom: 0px; \
		z-index: 999; \
		overflow: auto; \
		padding: 1rem; \
		color: #000; \
		background-color: rgba(255, 255, 255, 0.9); \
		font-family: monospace;',

	uaobject: new UAParser().getResult(),

	'screen': {
		'screen width': function () { return window.screen.width },
		'screen availWidth': function () { return window.screen.availWidth },
		'screen height': function () { return window.screen.height },
		'screen availHeight': function () { return window.screen.availHeight }
	},
	'viewport': {
		'viewport width': function() { return window.innerWidth },
		'viewport height': function () { return window.innerHeight }
	},
	'document': {
		'documentEl clientWidth': function () { return document.documentElement.clientWidth },
		'documentEl offsetWidth': function () { return document.documentElement.offsetWidth },
		'documentEl scrollWidth': function () { return document.documentElement.scrollWidth },
		'documentEl clientHeight': function () { return document.documentElement.clientHeight },
		'documentEl offsetHeight': function () { return document.documentElement.offsetHeight },
		'documentEl scrollHeight': function () { return document.documentElement.scrollHeight }
	},

	check_hash: function () {
		if ( window.location.hash === '#debug' ) return true;
		return false;
	},

	collect_uaobject: function () {
		var rows = []; // strings array
		for (var category in GCPI.uaobject) {
			if ( GCPI.uaobject[category] === 'ua' || typeof GCPI.uaobject[category] !== 'object' ) continue;
			rows.push( category );
			for (var category_item in GCPI.uaobject[category]) {
				rows.push( category_item + ': '+ GCPI.uaobject[category][category_item] );
			}
		}
		return rows;
	},

	collect_dimensions: function () {
		var rows = [], // strings array
		dims = ['screen', 'viewport', 'document'];
		for (var index in dims) {
			var group = dims[index];
			rows.push( group );
			for (var group_item in GCPI[group]) {
				rows.push( group_item + ': ' + GCPI[group][group_item]() );
			}
		}
		return rows;
	},

	append_html: function () {
		var html = '', clipboard = '';

		// add uaobject
		html += '<div class="gcpi__uaobject">';
		var uaobject_array = GCPI.collect_uaobject();
		for (var k=0; k < uaobject_array.length; k++) {
			html += '<div>' + uaobject_array[k] + '</div>';
			clipboard += uaobject_array[k] + '\r\n';
		}
		html += '</div>';

		// add dimensions
		html += '<div class="gcpi__groups">';
		var dims_array = GCPI.collect_dimensions();
		for (var j=0; j < dims_array.length; j++) {
			html += '<div>' + dims_array[j] + '</div>';
			clipboard += dims_array[j] + '\r\n';
		}
		html += '</div>';

		// add close btn
		html += '<button class="gcpi__close" type="button" >Close</button>';

		// add copy btn
		html += '<button class="gcpi__clipboard" data-clipboard-text=\"' + clipboard + '\" type="button" >Copy</button>';

		// add div
		var gcpi_container = document.createElement('div');
		gcpi_container.className = 'gcpi';
		gcpi_container.style.cssText = GCPI.styles;
		gcpi_container.innerHTML = html;
		document.body.appendChild(gcpi_container);

		new Clipboard('.gcpi__clipboard'); // init Clipboard
		return;
	},

	update_on_resize: function () {
		var html = '', clipboard = '',
		dims_container = document.querySelector('.gcpi__groups'),
		clipboard_data = document.querySelector('.gcpi__clipboard');

		var uaobject_array = GCPI.collect_uaobject();
		for (var k=0; k < uaobject_array.length; k++) {
			clipboard += uaobject_array[k] + '\r\n';
		}

		var dims_array = GCPI.collect_dimensions();
		for (var j=0; j < dims_array.length; j++) {
			html += '<div>' + dims_array[j] + '</div>';
			clipboard += dims_array[j] + '\r\n';
		}

		dims_container.innerHTML = html;
		clipboard_data.dataset.clipboardText = clipboard;
		return;
	}

};


for (var event = ['load', 'hashchange'], i = 0; i < event.length; i++) {
	window.addEventListener( event[i], function() {
		if ( !GCPI.check_hash() ) return;
		// append html
		GCPI.append_html();
		// close event
		document.querySelector('.gcpi__close').addEventListener('click', function() {
			location.replace( location.href.replace('#debug', '') );
		}, false);
	}, false);
}


window.addEventListener('resize', function() {
	if ( GCPI.check_hash() ) GCPI.update_on_resize();
}, false);
