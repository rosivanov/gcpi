//=include ./node_modules/ua-parser-js/src/ua-parser.js

(function() {

	var GCI = {
		check_hash: function () {
			if ( window.location.hash === '#debug' ) GCI.add_info();
			return;
		},
		add_info: function () {
			var info_div,
			html = '',
			uaparser = new UAParser(),
			uaobject = uaparser.getResult();

			for (var category in uaobject) {
				if ( uaobject[category] === 'ua' || typeof uaobject[category] !== 'object' ) continue;
				html += '<div>'+ category +'</div>';
				for (var category_item in uaobject[category]) {
					html += '<div>'+ category_item + ': '+ uaobject[category][category_item] +'</div>';
				}
			}

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

			info_div = document.createElement('div');
			info_div.style.cssText = "position: fixed; \
				top: 0; \
				left: 0; \
				bottom: 0; \
				z-index: 999; \
				overflow: auto; \
				padding: 1rem; \
				color: #000; \
				background-color: rgba(255, 255, 255, 0.9); \
				font-family: monospace; \
			";
			info_div.innerHTML = html;
			document.body.appendChild(info_div);
			return;
		}
	};
	window.addEventListener('hashchange', function() { GCI.check_hash() }, false);
	GCI.check_hash();

})();
