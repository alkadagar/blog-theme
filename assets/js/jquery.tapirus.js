(function(a){a.fn.Tapirus=function(e,l){l=a.extend(true,{dateFormat:"MMMM D, YYYY",queryFilter:undefined,inputSelector:'input[type="search"]',sessionStorage:false,sortBy:undefined,templates:{count:'<h3 class="search-results-count">{{count}} results for <q>{{query}}</q></h3>',result:'<div class="search-result"><h2 class="post-title"><a href="{{link}}">{{title}}</a></h2><time class="post-date" datetime="{{published_on}}">{{date}}</div>'}},l);var c=a(window),f=a(document.body),i=a(l.inputSelector),m=i.parent(),j=a(this);var g=d(e,l.url);var k={reset:function(){j.empty();f.removeClass("search-active");sessionStorage.removeItem("tapirsearchquery")},submit:function(n){if(n===""){return}g.search(n,l.queryFilter,l.sortBy).done(function(o){if(o.length){j.append(Handlebars.compile(l.templates.count)({count:o.length,query:n}));a(o).each(function(){if(typeof moment==="function"){this.date=moment(this.published_on).format(l.dateFormat)}var p=a("<div></div>").html(Handlebars.compile(l.templates.result)(this));j.append(p.html())})}else{j.append(Handlebars.compile(l.templates.count)({count:0,query:n}))}f.addClass("search-active");if(l.sessionStorage){sessionStorage.setItem("tapirsearchquery",n);sessionStorage.setItem("tapirsearchcache",JSON.stringify(g.getCache()))}})}};if(l.sessionStorage){var b=sessionStorage.getItem("tapirsearchcache"),h=sessionStorage.getItem("tapirsearchquery");if(b){g.setCache(JSON.parse(b))}if(h){k.submit(h);i.val(h)}}m.on("reset",function(n){k.reset()}).on("submit",function(n){n.preventDefault();k.reset();k.submit(i.val())});i.on("input",function(){if(a(this).val()===""){k.reset()}});function d(p,o){var n={};o=o||"http://www.tapirgo.com/api/1/search.json?token=%token&query=%query&callback=?";o=o.replace("%token",p);return{getCache:function(){return n},setCache:function(q){n=q},search:function(t,q,u){var r=a.Deferred();t=(typeof q==="function"?q(t):t.replace(/\W/g,""));if(t===""){s([])}else{if(n[t]){s(n[t])}else{a.getJSON(o.replace("%query",encodeURI(t))).done(function(v){s(n[t]=v)})}}function s(v){if(v.length&&typeof u==="string"){v=v.sort(function(A,z){var w=A[u],B=z[u];return((w<B)?-1:((w>B)?1:0))})}r.resolve(v)}return r.promise()}}}return this}})(jQuery);