var e=this&&this.__awaiter||function(e,t,a,l){return new(a||(a=Promise))((function(r,n){function i(e){try{o(l.next(e))}catch(e){n(e)}}function s(e){try{o(l.throw(e))}catch(e){n(e)}}function o(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,s)}o((l=l.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,l,r,n,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return n={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(n[Symbol.iterator]=function(){return this}),n;function s(s){return function(o){return function(s){if(a)throw new TypeError("Generator is already executing.");for(;n&&(n=0,s[0]&&(i=0)),i;)try{if(a=1,l&&(r=2&s[0]?l.return:s[0]?l.throw||((r=l.return)&&r.call(l),0):l.next)&&!(r=r.call(l,s[1])).done)return r;switch(l=0,r&&(s=[2&s[0],r.value]),s[0]){case 0:case 1:r=s;break;case 4:return i.label++,{value:s[1],done:0};case 5:i.label++,l=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(r=i.trys,(r=r.length>0&&r[r.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){i.label=s[1];break}if(6===s[0]&&i.label<r[1]){i.label=r[1],r=s;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(s);break}r[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],l=0}finally{a=r=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:1}}([s,o])}}};Object.defineProperty(exports,"__esModule",{value:1});var a=require("cheerio"),l=require("@libs/fetch"),r=require("@libs/novelStatus"),n=require("@libs/defaultCover"),i=new(function(){function i(e){var t,a;this.fetchImage=l.fetchFile,this.id=e.id,this.name=e.sourceName,this.icon="multisrc/lightnovelwp/".concat(e.id.toLowerCase(),"/icon.png"),this.site=e.sourceSite;var r=(null===(t=e.options)||void 0===t?void 0:t.versionIncrements)||0;this.version="1.0.".concat(4+r),this.options=null!==(a=e.options)&&void 0!==a?a:{},this.filters=e.filters}return i.prototype.getHostname=function(e){var t=(e=e.split("/")[2]).split(".");return t.pop(),t.join(".")},i.prototype.getCheerio=function(r,n){return e(this,void 0,void 0,(function(){var e,i,s,o;return t(this,(function(t){switch(t.label){case 0:return[4,(0,l.fetchApi)(r)];case 1:if(!(e=t.sent()).ok&&1!=n)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return s=a.load,[4,e.text()];case 2:if(i=s.apply(void 0,[t.sent()]),o=i("title").text().trim(),this.getHostname(r)!=this.getHostname(e.url)||"Bot Verification"==o||"You are being redirected..."==o||"Un instant..."==o||"Just a moment..."==o||"Redirecting..."==o)throw new Error("Captcha error, please open in webview");return[2,i]}}))}))},i.prototype.parseNovels=function(e){var t=this,a=[];return e("div.listupd > article").each((function(l,r){var i=e(r).find("h2").text(),s=e(r).find("img"),o=e(r).find("a").attr("href");o&&a.push({name:i,cover:s.attr("data-src")||s.attr("src")||n.defaultCover,path:o.replace(t.site,"")})})),a},i.prototype.popularNovels=function(a,l){var r,n,i=l.filters,s=l.showLatestNovels;return e(this,void 0,void 0,(function(){var e,l,o,u,c,v,h;return t(this,(function(t){switch(t.label){case 0:for(o in e=null!==(n=null===(r=this.options)||void 0===r?void 0:r.seriesPath)&&void 0!==n?n:"/series/",l=this.site+e+"?page="+a,i||(i={}),s&&(l+="&order=latest"),i)if("object"==typeof i[o].value)for(u=0,c=i[o].value;u<c.length;u++)v=c[u],l+="&".concat(o,"=").concat(v);else i[o].value&&(l+="&".concat(o,"=").concat(i[o].value));return[4,this.getCheerio(l,0)];case 1:return h=t.sent(),[2,this.parseNovels(h)]}}))}))},i.prototype.parseNovel=function(a){var l,i;return e(this,void 0,void 0,(function(){var e,s,o,u,c,v,h,p=this;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,0)];case 1:switch(e=t.sent(),(s={path:a.replace(this.site,""),name:"Untitled"}).name=e("h1.entry-title").text().trim(),o=e("img.wp-post-image"),s.cover=o.attr("data-src")||o.attr("src")||n.defaultCover,(null===(l=e("div.sertostat > span").attr("class"))||void 0===l?void 0:l.toLowerCase())||""){case"completed":s.status=r.NovelStatus.Completed;break;case"ongoing":s.status=r.NovelStatus.Ongoing;break;case"hiatus":s.status=r.NovelStatus.OnHiatus;break;default:s.status=r.NovelStatus.Unknown}return(u=e("div.serl")).length||(u=e("div.spe > span")),u.each((function(){var t=e(this).contents().first().text().replace(":","").trim().toLowerCase(),a=e(this).contents().last().text().trim().toLowerCase();switch(t){case"الكاتب":case"author":case"auteur":case"autor":case"yazar":s.author=a;break;case"الحالة":case"status":case"statut":case"estado":case"durum":switch(a){case"مكتملة":case"completed":case"complété":case"completo":case"completado":case"tamamlandı":s.status=r.NovelStatus.Completed;break;case"مستمرة":case"ongoing":case"en cours":case"em andamento":case"en progreso":case"devam ediyor":s.status=r.NovelStatus.Ongoing;break;case"متوقفة":case"hiatus":case"en pause":case"hiato":case"pausa":case"pausado":case"duraklatıldı":s.status=r.NovelStatus.OnHiatus;break;default:s.status=r.NovelStatus.Unknown}break;case"الفنان":case"artist":case"artiste":case"artista":case"çizer":s.artist=a}})),(c=e(".sertogenre")).length||(c=e(".genxed")),s.genres=c.children("a").map((function(t,a){return e(a).text()})).toArray().join(","),(v=e(".sersys > p").map((function(t,a){return e(a).text().trim()})).toArray()).length||(v=e(".entry-content > p").map((function(t,a){return e(a).text().trim()})).toArray()),s.summary=v.join("\n"),h=[],e(".eplister li").each((function(t,a){var l,r=e(a).find(".epl-num").text()+" "+e(a).find(".epl-title").text(),n=e(a).find("a").attr("href")||"",i=e(a).find(".epl-date").text().trim();switch(e(a).find(".epl-price").text().trim().toLowerCase()){case"free":case"gratuit":case"مجاني":case"livre":case"":l=1;break;default:l=0}l&&h.push({name:r,path:n.replace(p.site,""),releaseTime:i})})),(null===(i=this.options)||void 0===i?void 0:i.reverseChapters)&&h.length&&h.reverse(),s.chapters=h,[2,s]}}))}))},i.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,0)];case 1:return[2,(e=t.sent())(".epcontent p").map((function(t,a){return e(a)})).toArray().join("\n")||""]}}))}))},i.prototype.searchNovels=function(a,l){return e(this,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return e=this.site+"page/"+l+"/?s="+a,[4,this.getCheerio(e,1)];case 1:return r=t.sent(),[2,this.parseNovels(r)]}}))}))},i}())({id:"universalnovel",sourceSite:"https://universalnovel.com/",sourceName:"Universal Novel",options:{lang:"English",reverseChapters:0},filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"Acting",value:"acting"},{label:"Action",value:"action"},{label:"Adult",value:"adult"},{label:"Adventure",value:"adventure"},{label:"Bl",value:"bl"},{label:"Comedy",value:"comedy"},{label:"Drama",value:"drama"},{label:"entertainment",value:"entertainment"},{label:"Fantasy",value:"fantasy"},{label:"Gender Bender",value:"gender-bender"},{label:"Ghost",value:"ghost"},{label:"Harem",value:"harem"},{label:"Historical",value:"historical"},{label:"Horror",value:"horror"},{label:"Isekai",value:"isekai"},{label:"Josei",value:"josei"},{label:"Male protagonist",value:"male-protagonist"},{label:"Martial Arts",value:"martial-arts"},{label:"Mature",value:"mature"},{label:"Mystery",value:"mystery"},{label:"Psychological",value:"psychological"},{label:"Reincarnation",value:"reincarnation"},{label:"Romance",value:"romance"},{label:"School Life",value:"school-life"},{label:"Sci-Fi",value:"sci-fi"},{label:"Shoujo",value:"shoujo"},{label:"Shounen",value:"shounen"},{label:"Shounen Ai",value:"shounen-ai"},{label:"Slice of Life",value:"slice-of-life"},{label:"Smut",value:"smut"},{label:"Sprited animal",value:"sprited-animal"},{label:"Supernatural",value:"supernatural"},{label:"Survival",value:"survival"},{label:"Transmigration",value:"transmigration"},{label:"Unlimited flow",value:"unlimited-flow"},{label:"Wuxia",value:"wuxia"},{label:"Xianxia",value:"xianxia"},{label:"Yaoi",value:"yaoi"},{label:"Yuri",value:"yuri"}]},"type[]":{type:"Checkbox",label:"Type",value:[],options:[{label:"Chinese",value:"chinese"},{label:"Chinese Novel",value:"chinese-novel"},{label:"Korean Novel",value:"korean-novel"},{label:"Published Novel (KR)",value:"published-novel-kr"},{label:"Web Novel",value:"web-novel"}]},status:{type:"Picker",label:"Status",value:"",options:[{label:"All",value:""},{label:"Ongoing",value:"ongoing"},{label:"Hiatus",value:"hiatus"},{label:"Completed",value:"completed"}]},order:{type:"Picker",label:"Order by",value:"",options:[{label:"Default",value:""},{label:"A-Z",value:"title"},{label:"Z-A",value:"titlereverse"},{label:"Latest Update",value:"update"},{label:"Latest Added",value:"latest"},{label:"Popular",value:"popular"}]}}});exports.default=i;