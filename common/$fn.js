!function(t,e){for(var n in e)t[n]=e[n]}(window,function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e),n.d(e,"jjLog",(function(){return o}));var i={options:null,output:"",depth:0,parentSizes:"",currentResult:"",startTime:"",isLoad:!1,isLines:!1,init:function(t){if(this.options={isConsole:!0,useTimestamps:!0,useLocalStorage:!0,recordLogs:!0,autoTrim:!0,maxLines:2500,tailNumLines:100,logFilename:"debugout.txt",maxDepth:25},t&&(this.options=Object.assign(this.options,t)),this.depth=0,this.parentSizes=[0],this.currentResult="",this.startTime=new Date,this.output="",this.options.useLocalStorage){var e=window.localStorage.getItem("jjLog.js");if(e){e=JSON.parse(e),this.output=e.log;var n=new Date(e.startTime),i=new Date(e.lastLog);this.output+="\n---- Session end: "+i+" ----\n",this.output+=this.formatSessionDuration(n,i),this.output+="\n\n"}}this.output+="---- Session started: "+this.startTime+" ----\n\n",this.isLines&&this.lines(),this.isLoad=!0},getLog:function(){var t=new Date;if(this.options.recordLogs||this.log("[jjLog.js] log recording is off."),this.options.useLocalStorage){var e=window.localStorage.getItem("jjLog.js");e&&(e=JSON.parse(e),this.startTime=new Date(e.startTime),this.output=e.log,t=new Date(e.lastLog))}return this.output+"\n---- Log retrieved: "+t+" ----\n"+this.formatSessionDuration(this.startTime,t)},tail:function(t){var e=t||this.options.tailNumLines;return this.trimLog(this.getLog(),e)},search:function(t){for(var e=this.output.split("\n"),n=new RegExp(t),i=[],o=0;o<e.length;o++){var s="["+o+"] ";e[o].match(n)&&i.push(s+e[o])}var r=i.join("\n");return 0==r.length&&(r='Nothing found for "'+t+'".'),r},getSlice:function(t,e){return this.output.split("\n").slice(t,t+e).join("\n")},downLog:function(t){var e=this.getLog(),n=new Blob([e],{type:"data:text/plain;charset=utf-8"}),i=document.createElement("a");i.href=window.URL.createObjectURL(n),i.target="_blank",i.download=t||this.options.logFilename,document.body.appendChild(i),i.click(),document.body.removeChild(i),window.URL.revokeObjectURL(i.href)},clear:function(){var t,e=new Date;this.output="---- Log cleared: "+e+" ----\n",this.options.useLocalStorage&&(t={startTime:this.startTime,log:this.output,lastLog:e},t=JSON.stringify(t),window.localStorage.setItem("jjLog.js",t)),this.options.isConsole&&console.log("jjLog.js] clear()")},save:function(t){var e="",n=this.determineType(t);if(null!=n&&this.options.recordLogs){var i=this.formatType(n,t);if(this.options.useTimestamps){var o=new Date;this.output+=this.formatTimestamp(o),e+=this.formatTimestamp(o)}this.output+=i+"\n",e+=i+"\n",this.options.autoTrim&&(this.output=this.trimLog(this.output,this.options.maxLines));var s=void 0;if(this.options.useLocalStorage){var r=new Date;s={startTime:this.startTime,log:this.output,lastLog:r},s=JSON.stringify(s),window.localStorage.setItem("jjLog.js",s)}}return this.depth=0,this.parentSizes=[0],this.currentResult="",e},log:function(t){var e=this.save(t);this.options.isConsole&&console.log("✅%c"+e,"color:green;")},warn:function(t){var e=this.save(t);this.options.isConsole&&console.log("☢%c"+e,"color:#ef8d14;")},error:function(t){var e=this.save(t);this.options.isConsole&&console.log("❌%c"+e,"color:red;")},determineType:function(t){if(null!==t){var e=void 0,n=typeof t;if("object"===n)e=t.length?"Array":"function"==typeof t.getTime?"Date":"function"==typeof t.test?"RegExp":"Object";else e=n;return e}return null},formatType:function(t,e){if(this.options.maxDepth&&this.depth>=this.options.maxDepth)return"... (max-depth reached)";switch(t){case"Object":this.currentResult+="{\n",this.depth++,this.parentSizes.push(this.objectSize(e));var n=0;for(var i in e){this.currentResult+=this.indentsForDepth(this.depth),this.currentResult+=i+": ";var o=this.determineType(e[i]);(r=this.formatType(o,e[i]))?(this.currentResult+=r,n!=this.parentSizes[this.depth]-1&&(this.currentResult+=","),this.currentResult+="\n"):(n!=this.parentSizes[this.depth]-1&&(this.currentResult+=","),this.currentResult+="\n"),n++}if(this.depth--,this.parentSizes.pop(),this.currentResult+=this.indentsForDepth(this.depth),this.currentResult+="}",0==this.depth)return this.currentResult;break;case"Array":this.currentResult+="[",this.depth++,this.parentSizes.push(e.length);for(var s=0;s<e.length;s++){var r;"Object"!=(o=this.determineType(e[s]))&&"Array"!=o||(this.currentResult+="\n"+this.indentsForDepth(this.depth)),(r=this.formatType(o,e[s]))?(this.currentResult+=r,s!=this.parentSizes[this.depth]-1&&(this.currentResult+=", "),"Array"==o&&(this.currentResult+="\n")):(s!=this.parentSizes[this.depth]-1&&(this.currentResult+=", "),"Object"!=o?this.currentResult+="\n":s==this.parentSizes[this.depth]-1&&(this.currentResult+="\n"))}if(this.depth--,this.parentSizes.pop(),this.currentResult+="]",0==this.depth)return this.currentResult;break;case"function":for(var a=(e+="").split("\n"),u=0;u<a.length;u++)a[u].match(/\}/)&&this.depth--,this.currentResult+=this.indentsForDepth(this.depth),a[u].match(/\{/)&&this.depth++,this.currentResult+=a[u]+"\n";return this.currentResult;case"RegExp":return"/"+e.source+"/";case"Date":case"string":return this.depth>0||0==e.length?'"'+e+'"':e;case"boolean":return e?"true":"false";case"number":return e+""}},formatSessionDuration:function(t,e){var n=e-t,i=Math.floor(n/1e3/60/60),o=("0"+i).slice(-2);n-=1e3*i*60*60;var s=Math.floor(n/1e3/60),r=("0"+s).slice(-2);n-=1e3*s*60;var a=Math.floor(n/1e3);return n-=1e3*a,"---- Session duration: "+o+":"+r+":"+("0"+a).slice(-2)+" ----"},trimLog:function(t,e){var n=t.split("\n");return n.length>e&&(n=n.slice(n.length-e)),n.join("\n")},lines:function(){if(this.isLoad)return this.output.split("\n").length;this.isLines=!0},formatTimestamp:function(t){var e=t.getFullYear(),n=t.getDate();return"["+e+"-"+("0"+(t.getMonth()+1)).slice(-2)+"-"+n+" "+Number(t.getHours())+":"+("0"+t.getMinutes()).slice(-2)+":"+("0"+t.getSeconds()).slice(-2)+"]: "},objectSize:function(t){var e,n=0;for(e in t)t.hasOwnProperty(e)&&n++;return n},indentsForDepth:function(t){for(var e="",n=0;n<t;n++)e+="\t";return e},performanceTest:function(){var t=performance.timing,e=t.fetchStart-t.navigationStart,n=t.redirectEnd-t.redirectStart,i=t.domainLookupStart-t.fetchStart,o=t.unloadEventEnd-t.unloadEventStart,s=t.domainLookupEnd-t.domainLookupStart,r=t.connectEnd-t.connectStart,a=t.responseEnd-t.requestStart,u=t.domInteractive-t.responseEnd,h=t.domComplete-t.domInteractive,l=t.loadEventEnd-t.loadEventStart,c=t.loadEventEnd-t.navigationStart;console.log("准备新页面时间耗时："+e),console.log("redirect 重定向耗时："+n),console.log("Appcache 耗时"+i),console.log("unload 前文档耗时："+o),console.log("DNS 查询耗时："+s),console.log("TCP 连接耗时："+r),console.log("request 请求耗时："+a),console.log("请求完毕至DOM加载："+u),console.log("解析DOM树耗时："+h),console.log("Load事件耗时："+l),console.log("加载时间耗时："+c)}};e.default=i;var o=i}]));