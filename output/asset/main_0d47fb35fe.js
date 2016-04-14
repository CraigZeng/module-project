define("base-nav",["require","exports","module"],function(e,t){var n={"/product/list":["/product/list","/product/add","/"]};t.init=function(){var e=this.element,t=location.pathname,r=location.search;e.find("a").each(function(){var e=$(this).attr("data-href"),r=n[e],i=$(this);r?$.each(r,function(e,n){if(n===t)return i.parent().addClass("active"),!1}):e===t&&i.parent().addClass("active"),i.attr("href",e).removeAttr("data-href")})}}),define("common/utils",["require","exports","module"],function(e,t){t.deepCopy=function(e){var t,n=e.constructor;return function r(e,n,i){var s=e&&e.constructor,o,u,a,f,l=n===undefined;if(s===Object){o=l?t={}:n[i]={};for(u in e)r(e[u],o,u)}else if(s===Array){a=0,f=e.length,o=l?t=[]:n[i]=[];while(a<f)r(e[a],o,a++)}else if(s===Function)try{n[i]=(new Function("return "+e.toString()))()}catch(c){n[i]=e}else typeof e=="object"?n[i]=new s(e):n[i]=e}(e),t},t.refreshQuery=function(e,t){var n=location.search;if(!e)return"";if(typeof e=="string"){var r={};r[e]=t,e=r}if(!n){var o=[];for(var i in e)o.push(i+"="+e[i]);return o.sort(),"?"+o.join("&")}for(var i in e){var s=!1;n=n.replace(new RegExp("([?&]"+i+"=)([^&$]*)"),function(t,n,r){return s=!0,n+e[i]}),s||(n+="&"+i+"="+e[i])}return n},t.getQuery=function(e){var t=location.search;if(!arguments.length){var n={};return t?(t.replace(/(?:\?|&)([^=]+)=([^&$]*)/g,function(e,t,r){n[t]=r}),n):n}var r=(new RegExp("[?&]"+e+"=([^&$]*)")).exec(t);return r&&r[1]},t.format=function(e,t,n){return t=t||",",n=n||3,(""+e).replace(new RegExp("(\\d{1,"+n+"})(?=(\\d{"+n+"})+(?:$|\\.))","g"),"$1"+t)},t.parseToDate=function(e){return t.toDate(t.parseToTimestamp(e))},t.parseToTimestamp=function(e){return Date.parse(e.replace(/\-/g,"/"))},t.addDay=function(e,n){var r=t.toDate(t.toTimestamp(e));return r.setDate(r.getDate()+n),r},t.toYMD=function(e){var t=e.getFullYear(),n=e.getMonth()+1,r=e.getDate();return n<10&&(n="0"+n),r<10&&(r="0"+r),t+"-"+n+"-"+r},t.toYMDHMS=function(e){var t=e.getFullYear(),n=e.getMonth()+1,r=e.getDate(),i=e.getHours(),s=e.getMinutes(),o=e.getSeconds();return n<10&&(n="0"+n),r<10&&(r="0"+r),i<10&&(i="0"+i),s<10&&(s="0"+s),o<10&&(o="0"+o),t+"-"+n+"-"+r+" "+i+":"+s+":"+o},t.toTimestamp=function(e){return e.getTime()},t.toDate=function(e){return new Date(e)},t.compareTo=function(e,n){return t.toTimestamp(e)-t.toTimestamp(n)},t.offsetOfWeek=function(e){return(e.getDay()||7)-1},t.firstOfWeek=function(e){return t.addDay(e,-t.offsetOfWeek(e))},t.getFormData=function(e,t){var n={};return t=t||"[name]",e.find(t).each(function(){n[this.name]=this.value}),n};var n=t.formatJSON=function(e,t,r){if(null==e)return""+e;r=r||"";var i=e.constructor;if(i===String)return t?'<span class="json-string-value">"'+e+'"</span>':'"'+e+'"';if(i===Number)return t?'<span class="json-number-value">'+e+"</span>":e;if(i===Array){var s=t?'<span class="json-array-tag">[</span>\n':"[\n";for(var o=0,u=e.length;o<u-1;o++)s+=r+"	"+n(e[o],t,r+"	")+",\n";return s+=r+"	"+n(e[u-1],t,r+"	")+"\n",s+r+(t?'<span class="json-array-tag">]</span>':"]")}if(i===Object){var a=t?'<span class="json-object-tag">{</span>\n':"{\n",f=!0;for(var l in e)f=!1,a+=r+"	"+(t?'<span class="json-object-key">"'+l+'"'+"</span>":'"'+l+'"')+": "+n(e[l],t,r+"	")+",\n";return f||(a=a.slice(0,-2)),a+"\n"+r+(t?'<span class="json-object-tag">}</span>':"}")}}}),define("common/store",["require","exports","module","./utils"],function(e,t){"use strict";var n=e("./utils"),r={},i=Array.prototype.slice;t.set=function(e,t){typeof e=="string"&&(r[e]=t)},t.get=function(e){return arguments.length?r[e]:r},t.dump=function(e){var t={};if(arguments.length)if(e.constructor===Array)for(var i=0,s=e.length;i<s;i++){var o=e[i];t[o]=n.deepCopy(r[o])}else t[e]=n.deepCopy(r[e]);else for(var o in r)t[o]=n.deepCopy(r[o]);return t}}),define("service/commonErrors",["require","exports","module"],function(e,t){"use strict";t[100001]="数据库连接错误",t[100002]="数据库查询错误",t[100003]="请求参数错误";var n=function(e){}}),define("service/ajax",["require","exports","module","./commonErrors"],function(e,t){var n=e("./commonErrors");t.post=function(e,t,r){return t=t||{},r=r||{},$.ajax({url:window.rootBase+e,data:JSON.stringify(t),method:"POST",type:"POST",dataType:"json",contentType:"application/json;charset=UTF-8",async:r.sync?!1:!0,timeout:2e4,beforeSend:r.beforeSend||function(){var e=(new Date).getTime();r._time=e,r.holder&&r.holder.append('<div class="data-loading data-loading-'+e+'">').addClass("data-loading-relative")}}).pipe(function(e){r.holder&&r.holder.removeClass("data-loading-relative").find(".data-loading-"+r._time).remove();if(e.status===200)return e;if(e.status!==302){var t=$.Deferred();return n[e.status]?t.reject(e):t.reject(e),t.promise()}window.location.href=window.rootBase+"/login"})},t.jsonp=function(e,t,r){return $.ajax({url:e,data:JSON.stringify(t),dataType:"jsonp",timeout:r,scriptCharset:"UTF-8"}).pipe(function(e){if(e.status===200)return e;var t=$.Deferred();return n[e.status]?t.reject(e):t.reject(e),t.promise()})}}),define("service/common/user-service",["require","exports","module","service/ajax"],function(e,t){var n=e("service/ajax");t.getUserData=function(e,t){return n.post("/api-prefix/common/user",e,t)}}),define("dep/moduleHandler",["require","exports","module"],function(e,t){"use strict";var n=function(e){if(!e)return;r(e);var t=e.subModules;if(!t)return;for(var n=0;n<t.length;n++){var i=t[n];i&&$.isFunction(i.dispose)&&(t.splice(n,1),n--,i.dispose())}},r=function(e){var t=e.parentModule;if(!t)return;var n=t.subModules;for(var r=0;r<n.length;r++){var i=n[r];i===e&&(n.splice(r,1),r--)}};t.init=function(e,n){e=e||$("body");var r=e.size();if(r>1)$.each(e,function(){t.init($(this),n)});else if(r===1){var i=e.data("modulePath");i?t.load(i,e,n):t.init(e.children(),n)}},t.load=function(r,i,s){var o=i.data(),u=o.interceptorPath,a=function(e,r){if(e){$.isFunction(e)&&(e=new e),e.element=i,e.data=o;if($.isFunction(e.init)){var u=e.init(r);u&&u.done?u.done(function(n){t.init(i.children(),e)}):t.init(i.children(),e)}else t.init(i.children(),e);if(s){var a=s.subModules;a||(a=s.subModules=[]),a.push(e),e.parentModule=s}var f=e.dispose;$.isFunction(f)?e.dispose=function(){n(this),f.apply(this,arguments)}:e.dispose=function(){n(this)}}};e([r],function(t){u?e([u],function(e){if(e){e.element=i,e.data=o;if($.isFunction(e.init)){var n=e.init();n&&n.done?n.done(function(e){a(t,e)}):a(t,n)}else a(t)}}):a(t)})}}),define("main",["require","exports","module","./base-nav","common/store","service/common/user-service","dep/moduleHandler"],function(e,t){e("./base-nav");var n=e("common/store"),r=e("service/common/user-service");t.init=function(){var e=this.element;return r.getUserData(Math.round(Math.random()*100)).done(function(t){t.status===200&&(n.set("userData",t.data),e.find(".user-name").text(t.data.name))})},e("dep/moduleHandler").init()});