//=include ./node_modules/ua-parser-js/src/ua-parser.js
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
	check_hash: function () {
		if ( window.location.hash === '#debug' ) GCPI.add_info();
		return;
	},
	add_info: function () {
		var info_div,
		html = '',
		clipboard = '',
		uaparser = new UAParser(),
		uaobject = uaparser.getResult(),
		groups = {
			'screen': {
				'screen width': window.screen.width,
				'screen availWidth': window.screen.availWidth,
				'screen height': window.screen.height,
				'screen availHeight': window.screen.availHeight
			},
			'viewport': {
				'viewport width': window.innerWidth,
				'viewport height': window.innerHeight
			},
			'document': {
				'documentEl clientWidth': document.documentElement.clientWidth,
				'documentEl offsetWidth': document.documentElement.offsetWidth,
				'documentEl scrollWidth': document.documentElement.scrollWidth,
				'documentEl clientHeight': document.documentElement.clientHeight,
				'documentEl offsetHeight': document.documentElement.offsetHeight,
				'documentEl scrollHeight': document.documentElement.scrollHeight
			}
		};

		for (var category in uaobject) {
			if ( uaobject[category] === 'ua' || typeof uaobject[category] !== 'object' ) continue;
			html += '<div>'+ category +'</div>';
			clipboard += category + '\r\n';
			for (var category_item in uaobject[category]) {
				html += '<div>'+ category_item + ': '+ uaobject[category][category_item] +'</div>';
				clipboard += category_item + ': '+ uaobject[category][category_item] + '\r\n';
			}
		}

		for (var group in groups) {
			html += '<div>' + group + '</div>';
			clipboard += group + '\r\n';
			for (var groupe_item in groups[group]) {
				html += '<div>' + groupe_item + ': ' + groups[group][groupe_item] + '</div>';
				clipboard += groupe_item + ': ' + groups[group][groupe_item] + '\r\n';
			}
		}

		// add copy btn
		html += '<button data-clipboard-text=\"' + clipboard + '\" type="button" >Copy</button>';

		// add div
		info_div = document.createElement('div');
		info_div.style.cssText = GCPI.styles;
		info_div.innerHTML = html;
		document.body.appendChild(info_div);

		new Clipboard('button[data-clipboard-text]'); // init Clipboard

		return;
	}
};
window.addEventListener('hashchange', function() { GCPI.check_hash() }, false);
GCPI.check_hash();
