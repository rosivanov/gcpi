//=include ./node_modules/ua-parser-js/src/ua-parser.js
import UAParser from 'ua-parser-js';
import Clipboard from 'clipboard';

'use strict';
(function() {

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
			uaobject = uaparser.getResult();

			for (var category in uaobject) {
				if ( uaobject[category] === 'ua' || typeof uaobject[category] !== 'object' ) continue;
				html += '<div>'+ category +'</div>';
				clipboard += category + '\r\n';
				for (var category_item in uaobject[category]) {
					html += '<div>'+ category_item + ': '+ uaobject[category][category_item] +'</div>';
					clipboard += category_item + ': '+ uaobject[category][category_item] + '\r\n';
				}
			}

			clipboard += 'screen' + '\r\n';
			clipboard += 'screen width: '+ window.screen.width + '\r\n';
			clipboard += 'screen availWidth: '+ window.screen.availWidth + '\r\n';
			clipboard += 'screen height: '+ window.screen.height + '\r\n';
			clipboard += 'screen availHeight: '+ window.screen.availHeight + '\r\n';
			clipboard += 'viewport' + '\r\n';
			clipboard += 'viewport width: '+ window.innerWidth + '\r\n';
			clipboard += 'viewport height: '+ window.innerHeight + '\r\n';
			clipboard += 'document' + '\r\n';
			clipboard += 'documentEl clientWidth: '+ document.documentElement.clientWidth + '\r\n';
			clipboard += 'documentEl offsetWidth: '+ document.documentElement.offsetWidth + '\r\n';
			clipboard += 'documentEl scrollWidth: '+ document.documentElement.scrollWidth + '\r\n';
			clipboard += 'documentEl clientHeight: '+ document.documentElement.clientHeight + '\r\n';
			clipboard += 'documentEl offsetHeight: '+ document.documentElement.offsetHeight + '\r\n';
			clipboard += 'documentEl scrollHeight: '+ document.documentElement.scrollHeight + '\r\n';

			html += '<div>screen</div>';
			html += '<div>screen width: '+ window.screen.width +'</div>';
			html += '<div>screen availWidth: '+ window.screen.availWidth +'</div>';
			html += '<div>screen height: '+ window.screen.height +'</div>';
			html += '<div>screen availHeight: '+ window.screen.availHeight +'</div>';
			html += '<div>viewport</div>';
			html += '<div>viewport width: '+ window.innerWidth +'</div>';
			html += '<div>viewport height: '+ window.innerHeight +'</div>';
			html += '<div>document</div>';
			html += '<div>documentEl clientWidth: '+ document.documentElement.clientWidth +'</div>';
			html += '<div>documentEl offsetWidth: '+ document.documentElement.offsetWidth +'</div>';
			html += '<div>documentEl scrollWidth: '+ document.documentElement.scrollWidth +'</div>';
			html += '<div>documentEl clientHeight: '+ document.documentElement.clientHeight +'</div>';
			html += '<div>documentEl offsetHeight: '+ document.documentElement.offsetHeight +'</div>';
			html += '<div>documentEl scrollHeight: '+ document.documentElement.scrollHeight +'</div>';
			html += '<div>documentEl scrollHeight: '+ document.documentElement.scrollHeight +'</div>';

			html += '<button data-clipboard-text=\"' + clipboard + '\" type="button" >Copy</button>';

			// create element
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

})();
