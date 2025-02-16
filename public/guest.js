(()=>{var H=(()=>{let a=null,i=null,c=0,r=0,f=!0,s=()=>{c+=1},l=()=>`(${r}/${c}) [${parseInt(r/c*100).toFixed(0)}%]`;return{init:()=>{a=document.getElementById("progress-info"),i=document.getElementById("progress-bar"),a.style.display="block"},add:s,invalid:x=>{f=!1,i.style.backgroundColor="red",a.innerText=`Error loading ${x} ${l()}`},complete:x=>{f&&(r+=1,a.innerText=`Loading ${x} complete ${l()}`,i.style.width=Math.min(r/c*100,100).toString()+"%",r===c&&document.dispatchEvent(new Event("progress.done")))}}})();var J=(()=>{let a=null,i=null,c=!1,r=1e3*60*60*6,f="images",s=async h=>{let u=h.getAttribute("data-src"),d="x-expiration-time",y="image/webp",b=new Image;if(b.onload=()=>{h.src=b.src,h.width=b.width,h.height=b.height,b.remove(),H.complete("image")},a.has(u)){b.src=a.get(u);return}let E=n=>new Promise((t,T)=>{let e=document.createElement("canvas");e.width=n.width,e.height=n.height,e.getContext("2d").drawImage(n,0,0);let o=w=>{e.remove(),w?t(w):T(new Error("Failed to convert image to WebP"))};e.onerror=T,e.toBlob(o,y,.8)}),v=(n,t=3,T=1e3)=>fetch(u).then(e=>e.blob()).then(e=>window.createImageBitmap(e)).then(e=>E(e)).then(e=>{let o=new Headers;return o.set("Content-Type",y),o.set("Content-Length",String(e.size)),o.set(d,String(Date.now()+r)),n.put(u,new Response(e,{headers:o})).then(()=>e)}).catch(e=>{if(t<=0)throw e;return console.warn("Retrying fetch:"+u),new Promise(o=>setTimeout(()=>o(v(n,t-1,T+1e3)),T))}),S=n=>n.match(u).then(t=>t?Date.now()<=parseInt(t.headers.get(d))?t.blob():n.delete(u).then(T=>T?v(n):t.blob()):v(n));await caches.open(f).then(n=>S(n)).then(n=>{b.src=URL.createObjectURL(n),a.set(u,b.src)}).catch(()=>H.invalid("image"))},l=h=>{h.onerror=()=>H.invalid("image"),h.onload=()=>{h.width=h.naturalWidth,h.height=h.naturalHeight,H.complete("image")},h.complete&&h.naturalWidth!==0&&h.naturalHeight!==0?H.complete("image"):h.complete&&H.invalid("image")},p=()=>c,m=h=>{r=Number(h)},g=()=>{(async()=>{for(let h of i)h.hasAttribute("data-src")?await s(h):l(h)})()};return{init:()=>(a=new Map,i=document.querySelectorAll("img"),i.forEach(H.add),c=Array.from(i).some(h=>h.hasAttribute("data-src")),{load:g,setTtl:m,hasDataSrc:p})}})();var G=(()=>{let a=null,i=null,c=!1,r='<i class="fa-solid fa-circle-pause spin-button"></i>',f='<i class="fa-solid fa-circle-play"></i>',s=async()=>{if(navigator.onLine){a.disabled=!0;try{await i.play(),c=!0,a.disabled=!1,a.innerHTML=r}catch(m){c=!1,alert(m)}}},l=()=>{c=!1,i.pause(),a.innerHTML=f};return{init:()=>{a=document.getElementById("button-music"),a.style.display="block",i=new Audio(a.getAttribute("data-url")),i.volume=1,i.loop=!0,i.muted=!1,i.currentTime=0,i.autoplay=!1,i.controls=!1,i.addEventListener("canplay",s),a.addEventListener("offline",l),a.addEventListener("click",()=>c?l():s())}}})();var L=(()=>{let a=m=>String(m).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"),i=(m,g)=>{let x=null;x=setTimeout(()=>{m(),clearTimeout(x),x=null},g)};return{copy:async(m,g=null,x=1500)=>{let h=m.getAttribute("data-copy");if(!h||h.length===0){alert("Nothing to copy");return}m.disabled=!0;try{await navigator.clipboard.writeText(h)}catch{m.disabled=!1,alert("Failed to copy");return}let u=m.innerHTML;m.innerHTML=g||'<i class="fa-solid fa-check"></i>',i(()=>{m.disabled=!1,m.innerHTML=u},x)},timeOut:i,escapeHtml:a,base64Encode:m=>{let x=new TextEncoder().encode(m);return window.btoa(String.fromCharCode(...x))},base64Decode:m=>{let g=new TextDecoder,x=Uint8Array.from(window.atob(m),h=>h.charCodeAt(0));return g.decode(x)},disableButton:(m,g="Loading")=>{m.disabled=!0;let x=m.innerHTML;return m.innerHTML=`<span class="spinner-border spinner-border-sm my-0 ms-0 me-1 p-0" style="height: 0.8rem; width: 0.8rem"></span>${g}`,{restore:()=>{m.innerHTML=x,m.disabled=!1}}},disableCheckbox:m=>{m.disabled=!0;let g=document.querySelector(`label[for="${m.id}"]`),x=g.innerHTML;return g.innerHTML=`<span class="spinner-border spinner-border-sm my-0 ms-0 me-1 p-0" style="height: 0.8rem; width: 0.8rem"></span>${x}`,{restore:()=>{g.innerHTML=x,m.disabled=!1}}},parseUserAgent:m=>{let g=[{type:"Mobile",regex:/Android.*Mobile|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i},{type:"Tablet",regex:/iPad|Android(?!.*Mobile)|Tablet/i},{type:"Desktop",regex:/Windows NT|Macintosh|Linux/i}],x=[{name:"Chrome",regex:/Chrome|CriOS/i},{name:"Safari",regex:/Safari/i},{name:"Edge",regex:/Edg|Edge/i},{name:"Firefox",regex:/Firefox|FxiOS/i},{name:"Opera",regex:/Opera|OPR/i},{name:"Internet Explorer",regex:/MSIE|Trident/i}],h=[{name:"Windows",regex:/Windows NT ([\d.]+)/i},{name:"MacOS",regex:/Mac OS X ([\d_]+)/i},{name:"Android",regex:/Android ([\d.]+)/i},{name:"iOS",regex:/OS ([\d_]+) like Mac OS X/i},{name:"Linux",regex:/Linux/i}],u=g.find(v=>v.regex.test(m))?.type||"Unknown",d=x.find(v=>v.regex.test(m))?.name||"Unknown",y=h.find(v=>v.regex.test(m)),b=y&&m.match(y.regex)?.[1]?.replace(/_/g,".")||"",E=y?y.name:"Unknown";return b=b?`${E} ${b}`:E,`${d} ${u} ${b}`}}})();var K={tab:c=>window.bootstrap.Tab.getOrCreateInstance(document.getElementById(c)),modal:c=>window.bootstrap.Modal.getOrCreateInstance(document.getElementById(c))};var A=a=>{let i=(l=null)=>{let p=JSON.parse(localStorage.getItem(a));return l?p[String(l)]:p},c=(l,p)=>{let m=i();m[String(l)]=p,localStorage.setItem(a,JSON.stringify(m))},r=l=>Object.keys(i()).includes(String(l)),f=l=>{if(!r(l))return;let p=i();delete p[String(l)],localStorage.setItem(a,JSON.stringify(p))},s=()=>localStorage.setItem(a,"{}");return localStorage.getItem(a)||s(),{set:c,get:i,has:r,clear:s,unset:f}};var F=(()=>{let a={"#000000":"#ffffff","#ffffff":"#000000","#212529":"#f8f9fa","#f8f9fa":"#212529"},i=["#ffffff","#f8f9fa"],c=["#000000","#212529"],r=!1,f=null,s=null,l=()=>f.set("active","light"),p=()=>f.set("active","dark"),m=E=>{let v=s.getAttribute("content");s.setAttribute("content",E.some(S=>S===v)?a[v]:v)},g=()=>{l(),document.documentElement.setAttribute("data-bs-theme","light"),m(c)},x=()=>{p(),document.documentElement.setAttribute("data-bs-theme","dark"),m(i)},h=(E=null,v=null)=>{let S=f.get("active")==="dark";return E&&v?S?E:v:S};return{init:()=>{switch(f=A("theme"),s=document.querySelector('meta[name="theme-color"]'),f.has("active")||(window.matchMedia("(prefers-color-scheme: dark)").matches?p():l()),document.documentElement.getAttribute("data-bs-theme")){case"dark":p();break;case"light":l();break;default:r=!0}h()?x():g()},spyTop:()=>{let E=S=>S.filter(n=>n.isIntersecting).forEach(n=>{let t=n.target.classList.contains("bg-white-black")?h(c[0],i[0]):h(c[1],i[1]);s.setAttribute("content",t)}),v=new IntersectionObserver(E,{rootMargin:"0% 0% -95% 0%"});document.querySelectorAll("section").forEach(S=>v.observe(S))},change:()=>h()?g():x(),isDarkMode:h,isAutoMode:()=>r}})();var M=(()=>{let a=(u,d,y)=>({code:u,data:d,error:y}),i=(u=0)=>({love:u}),c=({uuid:u,own:d,name:y,presence:b,comment:E,created_at:v,is_admin:S,ip:n,user_agent:t,comments:T,like:e})=>({uuid:u,own:d,name:y,presence:b,comment:E,created_at:v,is_admin:S??!1,ip:n,user_agent:t,comments:T?.map(c)??[],like:i(e?.love??0)});return{uuidResponse:({uuid:u})=>({uuid:u}),baseResponse:a,tokenResponse:({token:u})=>({token:u}),statusResponse:({status:u})=>({status:u}),commentResponse:({name:u,presence:d,comment:y,is_admin:b,created_at:E})=>({name:u,presence:d,comment:y,is_admin:b,created_at:E}),likeCommentResponse:i,getCommentResponse:c,getCommentsResponse:u=>u.map(c),commentShowMore:(u,d=!1)=>({uuid:u,show:d}),postCommentRequest:(u,d,y,b)=>({id:u,name:d,presence:y,comment:b}),postSessionRequest:(u,d)=>({email:u,password:d}),updateCommentRequest:(u,d)=>({presence:u,comment:d})}})();var j="GET",Z="PUT",U="POST",X="PATCH",Y="DELETE",z=200,V=201,ie=500,O=(a,i)=>{let c=new AbortController,r=document.body.getAttribute("data-url"),f={signal:c.signal,method:String(a).toUpperCase(),headers:new Headers({Accept:"application/json","Content-Type":"application/json"})};return window.addEventListener("offline",()=>c.abort()),window.addEventListener("popstate",()=>c.abort()),window.addEventListener("beforeunload",()=>c.abort()),r.slice(-1)==="/"&&(r=r.slice(0,-1)),{send(s=null){return fetch(r+i,f).then(l=>l.json().then(p=>{if(l.status>=ie&&(p.message??p[0]))throw new Error(p.message??p[0]);if(p.error)throw new Error(p.error[0]);return s&&(p.data=s(p.data)),M.baseResponse(p.code,p.data,p.error)})).catch(l=>{if(l.name==="AbortError")return console.warn("Fetch abort:",l),l;throw alert(l),new Error(l)})},download(){return fetch(r+i,f).then(s=>{if(s.status!==z)return!1;let l=document.querySelector("a[download]");l&&document.body.removeChild(l);let p=s.headers.get("content-disposition")?.match(/filename="(.+)"/)?.[1]??"download.csv";return s.blob().then(m=>{let g=document.createElement("a"),x=window.URL.createObjectURL(m);return g.href=x,g.download=p,document.body.appendChild(g),g.click(),document.body.removeChild(g),window.URL.revokeObjectURL(x),!0})}).catch(s=>{if(s.name==="AbortError")return console.warn("Fetch abort:",s),s;throw alert(s),new Error(s)})},token(s){return s.split(".").length===3?(f.headers.append("Authorization","Bearer "+s),this):(f.headers.append("x-access-key",s),this)},body(s){return f.body=JSON.stringify(s),this}}};var $=(()=>{let a=null,i=()=>a.get("token"),c=g=>a.set("token",g),r=g=>O(U,"/api/session").body(g).send(M.tokenResponse).then(x=>(x.code===z&&c(x.data.token),x.code===z),()=>!1),f=()=>a.unset("token"),s=()=>String(i()??".").split(".").length===3;return{init:()=>{a=A("session")},guest:()=>O(j,"/api/config").token(i()).send().then(g=>{if(g.code!==z)throw new Error("failed to get config.");let x=A("config");for(let[h,u]of Object.entries(g.data))x.set(h,u);return g}),login:r,logout:f,decode:()=>{if(!s())return null;try{return JSON.parse(window.atob(i().split(".")[1]))}catch{return null}},isAdmin:s,setToken:c,getToken:i}})();var Q=(()=>{let a=null,i=!0,c=()=>i,r=u=>new Promise(d=>{let y=parseFloat(a.style.opacity),b=null,E=u?.05:-.05,v=u?1:0;b=setInterval(()=>{y=Math.max(0,Math.min(1,y+E)),a.style.opacity=y.toFixed(2),y===v&&(d(),clearInterval(b),b=null)},10)}),f=()=>{let u=a.firstElementChild.firstElementChild;u.classList.remove("bg-success"),u.classList.add("bg-danger"),u.firstElementChild.innerHTML='<i class="fa-solid fa-ban me-2"></i>Koneksi tidak tersedia'},s=()=>{let u=a.firstElementChild.firstElementChild;u.classList.remove("bg-danger"),u.classList.add("bg-success"),u.firstElementChild.innerHTML='<i class="fa-solid fa-cloud me-2"></i>Koneksi tersedia kembali'},l=async()=>{await r(!1),f()},p=()=>{let u=null;u=setTimeout(()=>{clearTimeout(u),u=null,i&&l()},3e3)},m=()=>{let u=["input[data-offline-disabled]","button[data-offline-disabled]","select[data-offline-disabled]","textarea[data-offline-disabled]"].join(", ");document.querySelectorAll(u).forEach(d=>{d.dispatchEvent(new Event(c()?"online":"offline")),d.setAttribute("data-offline-disabled",c()?"false":"true"),d.tagName==="BUTTON"?c()?d.classList.remove("disabled"):d.classList.add("disabled"):c()?d.removeAttribute("disabled"):d.setAttribute("disabled","true")})},g=()=>{i=!1,f(),r(!0),m()},x=()=>{i=!0,s(),p(),m()};return{init:()=>{window.addEventListener("online",x),window.addEventListener("offline",g),a=document.getElementById("offline-mode"),a.innerHTML=`
        <div class="d-flex justify-content-center mx-auto">
            <div class="d-flex justify-content-center align-items-center rounded-pill my-2 bg-danger shadow">
                <small class="text-center py-1 px-2 mx-1 mt-1 mb-0 text-white" style="font-size: 0.8rem;"></small>
            </div>
        </div>`},isOnline:c}})();var R=(()=>{let a=null,i=null,c=null,r=null,f=null,s=null,l=250,p=()=>`
        <div class="bg-theme-auto shadow p-3 mx-0 mt-0 mb-3 rounded-4">
            <div class="d-flex flex-wrap justify-content-between align-items-center placeholder-wave">
                <span class="placeholder bg-secondary col-5 rounded-3 my-1"></span>
                <span class="placeholder bg-secondary col-3 rounded-3 my-1"></span>
            </div>
            <hr class="my-1">
            <p class="placeholder-wave m-0">
                <span class="placeholder bg-secondary col-6 rounded-3"></span>
                <span class="placeholder bg-secondary col-5 rounded-3"></span>
                <span class="placeholder bg-secondary col-12 rounded-3 my-1"></span>
            </p>
        </div>`,m=e=>([["*",'<strong class="text-theme-auto">$1</strong>'],["_",'<em class="text-theme-auto">$1</em>'],["~",'<del class="text-theme-auto">$1</del>'],["```",'<code class="font-monospace text-theme-auto">$1</code>']].forEach(w=>{let k=w[0],P=w[1];e=e.replace(new RegExp(`\\${k}(?=\\S)(.*?)(?<!\\s)\\${k}`,"gs"),P)}),e),g=e=>`
        <button style="font-size: 0.8rem;" onclick="undangan.comment.like.love(this)" data-uuid="${e.uuid}" class="btn btn-sm btn-outline-auto ms-auto rounded-3 p-0 shadow-sm d-flex justify-content-start align-items-center" data-offline-disabled="false">
            <span class="my-0 mx-1" data-count-like="${e.like.love}">${e.like.love}</span>
            <i class="me-1 ${c.has(e.uuid)?"fa-solid fa-heart text-danger":"fa-regular fa-heart"}"></i>
        </button>`,x=e=>{let o=`<div class="d-flex flex-wrap justify-content-start align-items-center" data-button-action="${e.uuid}">`;return(r.get("can_reply")===!0||r.get("can_reply")===void 0)&&(o+=`<button style="font-size: 0.8rem;" onclick="undangan.comment.reply(this)" data-uuid="${e.uuid}" class="btn btn-sm btn-outline-auto rounded-4 py-0 me-1 shadow-sm" data-offline-disabled="false">Reply</button>`),i.has(e.uuid)&&(r.get("can_edit")===!0||r.get("can_edit")===void 0)&&(o+=`<button style="font-size: 0.8rem;" onclick="undangan.comment.edit(this)" data-uuid="${e.uuid}" class="btn btn-sm btn-outline-auto rounded-4 py-0 me-1 shadow-sm" data-offline-disabled="false">Edit</button>`),$.isAdmin()?o+=`<button style="font-size: 0.8rem;" onclick="undangan.comment.remove(this)" data-uuid="${e.uuid}" class="btn btn-sm btn-outline-auto rounded-4 py-0 me-1 shadow-sm" data-own="${e.own}" data-offline-disabled="false">Delete</button>`:i.has(e.uuid)&&(r.get("can_delete")===!0||r.get("can_delete")===void 0)&&(o+=`<button style="font-size: 0.8rem;" onclick="undangan.comment.remove(this)" data-uuid="${e.uuid}" class="btn btn-sm btn-outline-auto rounded-4 py-0 me-1 shadow-sm" data-offline-disabled="false">Delete</button>`),o+="</div>",o},h=(e,o)=>{let w=s.get("show").includes(e);return`<a class="text-theme-auto" style="font-size: 0.8rem;" onclick="undangan.comment.showOrHide(this)" data-uuid="${e}" data-uuids="${o.join(",")}" data-show="${w?"true":"false"}" role="button" class="me-auto ms-1 py-0">${w?"Hide replies":`Show replies (${o.length})`}</a>`},u=e=>`
        <div class="d-flex flex-wrap justify-content-between align-items-center" id="button-${e.uuid}">
            ${x(e)}
            ${e.comments.length>0?h(e.uuid,e.comments.map(o=>o.uuid)):""}
            ${g(e)}
        </div>`,d=e=>e.ip===void 0||e.user_agent===void 0||e.is_admin?"":`
        <div class="mb-1 mt-3">
            <p class="text-theme-auto mb-1 mx-0 mt-0 p-0" style="font-size: 0.7rem;" id="ip-${e.uuid}"><i class="fa-solid fa-location-dot me-1"></i>${L.escapeHtml(e.ip)} ${f.has(e.ip)?`<strong>${f.get(e.ip)}</strong>`:'<span class="mb-1 placeholder col-2 rounded-3"></span>'}</p>
            <p class="text-theme-auto m-0 p-0" style="font-size: 0.7rem;"><i class="fa-solid fa-mobile-screen-button me-1"></i>${L.parseUserAgent(L.escapeHtml(e.user_agent))}</p>
        </div>`,y=(e,o)=>o?'class="bg-theme-auto shadow p-3 mx-0 mt-0 mb-3 rounded-4" data-parent="true"':`class="${s.get("hidden").find(w=>w.uuid===e.uuid).show?"":"d-none"} overflow-x-scroll mw-100 border-start bg-theme-auto py-2 ps-2 pe-0 my-2 ms-2 me-0"`,b=(e,o)=>e.is_admin?`<strong class="me-1">${L.escapeHtml(a.get("name")??r.get("name"))}</strong><i class="fa-solid fa-certificate text-primary"></i>`:o?`<strong class="me-1">${L.escapeHtml(e.name)}</strong><i id="badge-${e.uuid}" class="fa-solid ${e.presence?"fa-circle-check text-success":"fa-circle-xmark text-danger"}"></i>`:`<strong>${L.escapeHtml(e.name)}</strong>`,E=(e,o)=>{let w=m(L.escapeHtml(e.comment)),k=w.length>l;return`
        <div class="d-flex flex-wrap justify-content-between align-items-center">
            <p class="text-theme-auto text-truncate m-0 p-0" style="font-size: 0.95rem;">${b(e,o)}</p>
            <small class="text-theme-auto m-0 p-0" style="font-size: 0.75rem;">${e.created_at}</small>
        </div>
        <hr class="my-1">
        <p class="text-theme-auto my-1 mx-0 p-0" style="white-space: pre-wrap !important; font-size: 0.95rem;" ${k?`data-comment="${L.base64Encode(w)}"`:""} id="content-${e.uuid}">${k?w.slice(0,l)+"...":w}</p>
        ${k?`<p class="mb-2 mt-0 mx-0 p-0"><a class="text-theme-auto" role="button" style="font-size: 0.85rem; display: block;" data-show="false" onclick="undangan.comment.showMore(this, '${e.uuid}')">Selengkapnya</a></p>`:""}`},v=(e,o)=>`
        <div ${y(e,o)} id="${e.uuid}" style="overflow-wrap: break-word !important;">
            <div id="body-content-${e.uuid}" data-tapTime="0" data-liked="false" tabindex="0">
            ${E(e,o)}
            </div>
            ${d(e)}
            ${u(e)}
            <div id="reply-content-${e.uuid}">${e.comments.map(w=>S(w)).join("")}</div>
        </div>`,S=e=>v(e,!1);return{init:()=>{a=A("user"),i=A("owns"),c=A("likes"),r=A("config"),f=A("tracker"),s=A("comment")},renderEdit:(e,o)=>{let w=document.createElement("div");return w.classList.add("my-2"),w.id=`inner-${e}`,w.innerHTML=`
        <label for="form-inner-${e}" class="form-label my-1" style="font-size: 0.95rem;"><i class="fa-solid fa-pen me-2"></i>Edit</label>
        ${document.getElementById(e).getAttribute("data-parent")==="true"&&!$.isAdmin()?`
        <select class="form-select shadow-sm mb-2 rounded-4" id="form-inner-presence-${e}" data-offline-disabled="false">
            <option value="1" ${o?"selected":""}>Datang</option>
            <option value="2" ${o?"":"selected"}>Berhalangan</option>
        </select>`:""}
        <textarea class="form-control shadow-sm rounded-4 mb-2" id="form-inner-${e}" minlength="1" maxlength="1000" placeholder="Type update comment" rows="3" data-offline-disabled="false"></textarea>
        <div class="d-flex flex-wrap justify-content-end align-items-center mb-0">
            <button style="font-size: 0.8rem;" onclick="undangan.comment.cancel('${e}')" class="btn btn-sm btn-outline-auto rounded-4 py-0 me-1" data-offline-disabled="false">Cancel</button>
            <button style="font-size: 0.8rem;" onclick="undangan.comment.update(this)" data-uuid="${e}" class="btn btn-sm btn-outline-auto rounded-4 py-0" data-offline-disabled="false">Update</button>
        </div>`,w},renderReply:e=>{let o=document.createElement("div");return o.classList.add("my-2"),o.id=`inner-${e}`,o.innerHTML=`
        <label for="form-inner-${e}" class="form-label my-1" style="font-size: 0.95rem;"><i class="fa-solid fa-reply me-2"></i>Reply</label>
        <textarea class="form-control shadow-sm rounded-4 mb-2" id="form-inner-${e}" minlength="1" maxlength="1000" placeholder="Type reply comment" rows="3" data-offline-disabled="false"></textarea>
        <div class="d-flex flex-wrap justify-content-end align-items-center mb-0">
            <button style="font-size: 0.8rem;" onclick="undangan.comment.cancel('${e}')" class="btn btn-sm btn-outline-auto rounded-4 py-0 me-1" data-offline-disabled="false">Cancel</button>
            <button style="font-size: 0.8rem;" onclick="undangan.comment.send(this)" data-uuid="${e}" class="btn btn-sm btn-outline-auto rounded-4 py-0" data-offline-disabled="false">Send</button>
        </div>`,o},renderLoading:p,renderReadMore:h,renderInnerContent:S,renderContent:e=>v(e,!0),convertMarkdownToHTML:m,maxCommentLength:l}})();var ee=()=>window.confetti.shapeFromPath({path:"M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",matrix:[.03333333333333333,0,0,.03333333333333333,-5.566666666666666,-5.533333333333333]}),te=()=>{window.confetti({origin:{y:1},zIndex:1057})},ne=(a=15)=>{let i=a*1e3,c=Date.now()+i,r=ee(),f=["#FFC0CB","#FF1493","#C71585"],s=(l,p)=>Math.random()*(p-l)+l;(function l(){let p=c-Date.now();f.forEach(m=>{window.confetti({particleCount:1,startVelocity:0,ticks:Math.max(50,75*(p/i)),origin:{x:Math.random(),y:Math.abs(Math.random()-p/i)},zIndex:1057,colors:[m],shapes:[r],drift:s(-.5,.5),gravity:s(.5,1),scalar:s(.5,1)})}),p>0&&requestAnimationFrame(l)})()},ae=a=>{if(!window.confetti)return;let i=Date.now()+25,c=Math.max(.3,Math.min(1,a.getBoundingClientRect().top/window.innerHeight+.2)),r=ee(),f=["#FF69B4","#FF1493"];(function s(){f.forEach(l=>{window.confetti({particleCount:2,angle:60,spread:55,shapes:[r],origin:{x:0,y:c},zIndex:1057,colors:[l]}),window.confetti({particleCount:2,angle:120,spread:55,shapes:[r],origin:{x:1,y:c},zIndex:1057,colors:[l]})}),Date.now()<i&&requestAnimationFrame(s)})()};var W=(()=>{let a=null,i=async f=>{let s=f.firstElementChild,l=f.lastElementChild,p=f.getAttribute("data-uuid"),m=parseInt(s.getAttribute("data-count-like"));f.disabled=!0,a.has(p)?await O(X,"/api/comment/"+a.get(p)).token($.getToken()).send(M.statusResponse).then(g=>{g.data.status&&(a.unset(p),l.classList.remove("fa-solid","text-danger"),l.classList.add("fa-regular"),s.setAttribute("data-count-like",String(m-1)))}):await O(U,"/api/comment/"+p).token($.getToken()).send(M.uuidResponse).then(g=>{g.code===V&&(a.set(p,g.data.uuid),l.classList.remove("fa-regular"),l.classList.add("fa-solid","text-danger"),s.setAttribute("data-count-like",String(m+1)))}),s.innerText=s.getAttribute("data-count-like"),f.disabled=!1};return{init:()=>{a=A("likes")},love:i,tapTap:async f=>{if(!navigator.onLine)return;let s=Date.now(),l=s-parseInt(f.getAttribute("data-tapTime")),p=f.id.replace("body-content-",""),m=l<300&&l>0,g=!a.has(p)&&f.getAttribute("data-liked")!=="true";if(m&&g){navigator.vibrate&&navigator.vibrate(100),ae(f);let x=document.querySelector(`[onclick="undangan.comment.like.love(this)"][data-uuid="${p}"]`);f.setAttribute("data-liked","true"),await i(x),f.setAttribute("data-liked","false")}f.setAttribute("data-tapTime",s)}}})();var _=(()=>{let a=10,i=0,c=0,r=null,f=null,s=null,l=null,p=e=>{a=Number(e)},m=()=>a,g=()=>i,x=()=>c,h=()=>f.classList.contains("disabled")?null:f.classList.add("disabled"),u=()=>f.classList.contains("disabled")?f.classList.remove("disabled"):null,d=()=>s.classList.contains("disabled")?null:s.classList.add("disabled"),y=()=>s.classList.contains("disabled")?s.classList.remove("disabled"):null,b=()=>{l.classList.contains("d-none")&&l.classList.remove("d-none")},E=e=>{e.disabled=!0;let o=e.innerHTML;e.innerHTML='<span class="spinner-border spinner-border-sm my-0 mx-1 p-0" style="height: 0.8rem; width: 0.8rem;"></span>';let w=async()=>{await q.show(),e.disabled=!1,e.innerHTML=o,q.scroll()};return{next:async()=>{i+=a,e.innerHTML="Next"+e.innerHTML,await w(),r.innerText=String(parseInt(r.innerText)+1)},prev:async()=>{i-=a,e.innerHTML=e.innerHTML+"Prev",await w(),r.innerText=String(parseInt(r.innerText)-1)}}};return{init:()=>{l=document.getElementById("pagination"),l.innerHTML=`
        <ul class="pagination mb-2 shadow-sm rounded-4">
            <li class="page-item disabled" id="previous">
                <button class="page-link rounded-start-4" onclick="undangan.comment.pagination.previous(this)" data-offline-disabled="false">
                    <i class="fa-solid fa-circle-left me-1"></i>Prev
                </button>
            </li>
            <li class="page-item disabled">
                <span class="page-link text-theme-auto" id="page">1</span>
            </li>
            <li class="page-item" id="next">
                <button class="page-link rounded-end-4" onclick="undangan.comment.pagination.next(this)" data-offline-disabled="false">
                    Next<i class="fa-solid fa-circle-right ms-1"></i>
                </button>
            </li>
        </ul>`,r=document.getElementById("page"),f=document.getElementById("previous"),s=document.getElementById("next")},setPer:p,getPer:m,getNext:g,reset:async()=>i===0?!1:(i=0,c=0,r.innerText=1,d(),h(),await q.show(),!0),setResultData:e=>{if(c=e,i>0&&u(),c<a){d();return}y(),b()},getResultData:x,previous:async e=>{h(),!(i<0)&&(d(),await E(e).prev())},next:async e=>{d(),!(c<a)&&(h(),await E(e).next())}}})();var q=(()=>{let a=null,i=null,c=null,r=null,f=()=>'<div class="text-center p-4 my-2 bg-theme-auto rounded-4 shadow"><p class="fw-bold p-0 m-0" style="font-size: 0.95rem;">Yuk bagikan undangan ini biar banyak komentarnya</p></div>',s=(n,t)=>{document.querySelector(`[data-button-action="${n}"]`).childNodes.forEach(T=>{T.disabled=t})},l=()=>document.getElementById("comments").scrollIntoView({behavior:"smooth"}),p=n=>{n.comments&&n.comments.forEach(p);let t=document.getElementById(`body-content-${n.uuid}`);t.addEventListener("touchend",()=>W.tapTap(t))},m=async n=>{if(!confirm("Are you sure?"))return;let t=n.getAttribute("data-uuid");$.isAdmin()&&a.set(t,n.getAttribute("data-own")),s(t,!0);let T=L.disableButton(n),e=document.querySelector(`[onclick="undangan.comment.like.love(this)"][data-uuid="${t}"]`);if(e.disabled=!0,!await O(Y,"/api/comment/"+a.get(t)).token($.getToken()).send(M.statusResponse).then(k=>k.data.status,()=>!1)){T.restore(),e.disabled=!1;return}document.querySelectorAll('a[onclick="undangan.comment.showOrHide(this)"]').forEach(k=>{let P=k.getAttribute("data-uuids").split(",");if(P.find(D=>D===t)){let D=P.filter(B=>B!==t).join(",");D.length===0?k.remove():k.setAttribute("data-uuids",D)}}),a.unset(t),document.getElementById(t).remove();let w=document.getElementById("comments");w.children.length===0&&(w.innerHTML=f())},g=async n=>{let t=n.getAttribute("data-uuid"),T=!1,e=document.getElementById(`form-inner-presence-${t}`);e&&(e.disabled=!0,T=e.value==="1");let o=document.getElementById(`form-${t?`inner-${t}`:"comment"}`),w=!1,k=document.getElementById(`badge-${t}`);if(k&&(w=k.classList.contains("text-success")),t&&L.base64Encode(o.value)===o.getAttribute("data-original")&&w===T){s(t,!1),document.getElementById(`inner-${t}`).remove();return}o.disabled=!0;let P=document.querySelector(`[onclick="undangan.comment.cancel('${t}')"]`);P&&(P.disabled=!0);let D=L.disableButton(n),B=await O(Z,"/api/comment/"+a.get(t)).token($.getToken()).body(M.updateCommentRequest(e?T:null,o.value)).send(M.statusResponse).then(se=>se.data.status,()=>!1);if(o.disabled=!1,P&&(P.disabled=!1),e&&(e.disabled=!1),D.restore(),!B)return;s(t,!1),document.getElementById(`inner-${t}`).remove();let C=document.querySelector(`[onclick="undangan.comment.showMore(this, '${t}')"]`),I=R.convertMarkdownToHTML(L.escapeHtml(o.value)),N=document.getElementById(`content-${t}`);if(I.length>R.maxCommentLength?(N.innerHTML=C?.getAttribute("data-show")==="false"?I.slice(0,R.maxCommentLength)+"...":I,N.setAttribute("data-comment",L.base64Encode(I)),C?.style.display==="none"&&(C.style.display="block")):(N.innerHTML=I,N.removeAttribute("data-comment"),C?.style.display==="block"&&(C.style.display="none")),e&&(document.getElementById("form-presence").value=T?"1":"2",A("information").set("presence",T)),!(!e||!k)){if(T){k.classList.remove("fa-circle-xmark","text-danger"),k.classList.add("fa-circle-check","text-success");return}k.classList.remove("fa-circle-check","text-success"),k.classList.add("fa-circle-xmark","text-danger")}},x=async n=>{let t=n.getAttribute("data-uuid"),T=document.getElementById("form-name"),e=T.value;if($.isAdmin()&&(e=i.get("name")),e.length===0){t&&document.getElementById("comment").scrollIntoView({behavior:"smooth"}),alert("Silakan masukkan nama Anda.");return}let o=document.getElementById("form-presence");if(!t&&o&&o.value==="0"){alert("Silakan pilih status kehadiran Anda.");return}!t&&T&&!$.isAdmin()&&(T.disabled=!0),o&&o.value!=="0"&&(o.disabled=!0);let w=document.getElementById(`form-${t?`inner-${t}`:"comment"}`);w.disabled=!0;let k=document.querySelector(`[onclick="undangan.comment.cancel('${t}')"]`);k&&(k.disabled=!0);let P=L.disableButton(n),D=o?o.value==="1":!0;if(!$.isAdmin()){let C=A("information");C.set("name",e),t||C.set("presence",D)}let B=await O(U,"/api/comment").token($.getToken()).body(M.postCommentRequest(t,e,D,w.value)).send(M.getCommentResponse).then(C=>C,()=>null);if(T&&(T.disabled=!1),w.disabled=!1,k&&(k.disabled=!1),o&&(o.disabled=!1),P.restore(),!(!B||B.code!==V)){if(a.set(B.data.uuid,B.data.own),w.value=null,!t){if(await _.reset()){l();return}let I=document.getElementById("comments");_.setResultData(I.children.length),_.getResultData()===_.getPer()&&I.lastElementChild.remove(),B.data.is_admin=$.isAdmin(),I.innerHTML=R.renderContent(B.data)+I.innerHTML,l()}if(t){r.set("hidden",r.get("hidden").concat([M.commentShowMore(B.data.uuid,!0)])),r.set("show",r.get("show").concat([t])),s(t,!1),document.getElementById(`inner-${t}`).remove(),B.data.is_admin=$.isAdmin(),document.getElementById(`reply-content-${t}`).insertAdjacentHTML("beforeend",R.renderInnerContent(B.data));let C=document.getElementById(`button-${t}`),I=C.querySelector("a"),N=[B.data.uuid];I&&(I.getAttribute("data-show")==="false"&&b(I),I.remove()),C.querySelector(`button[onclick="undangan.comment.like.love(this)"][data-uuid="${t}"]`).insertAdjacentHTML("beforebegin",R.renderReadMore(t,I?I.getAttribute("data-uuids").split(",").concat(N):N))}p(B.data)}},h=n=>{let t=document.getElementById(`form-inner-${n}`),T=!1,e=document.getElementById(`form-inner-presence-${n}`);e&&(T=e.value==="1");let o=!1,w=document.getElementById(`badge-${n}`);w&&(o=w.classList.contains("text-success")),(t.value.length===0||L.base64Encode(t.value)===t.getAttribute("data-original")&&o===T||confirm("Are you sure?"))&&(s(n,!1),document.getElementById(`inner-${n}`).remove())},u=n=>{let t=n.getAttribute("data-uuid");document.getElementById(`inner-${t}`)||(s(t,!0),document.getElementById(`button-${t}`).insertAdjacentElement("afterend",R.renderReply(t)))},d=async n=>{let t=n.getAttribute("data-uuid");if(document.getElementById(`inner-${t}`))return;s(t,!0);let T=L.disableButton(n);await O(j,"/api/comment/"+t).token($.getToken()).send(M.commentResponse).then(e=>{if(e.code!==z)return;document.getElementById(`button-${t}`).insertAdjacentElement("afterend",R.renderEdit(t,e.data.presence));let o=document.getElementById(`form-inner-${t}`);o.value=e.data.comment,o.setAttribute("data-original",L.base64Encode(e.data.comment))}),T.restore(),n.disabled=!0},y=()=>{let n=document.getElementById("comments");return n.getAttribute("data-loading")==="false"&&(n.setAttribute("data-loading","true"),n.innerHTML=R.renderLoading().repeat(_.getPer())),O(j,`/api/comment?per=${_.getPer()}&next=${_.getNext()}`).token($.getToken()).send(M.getCommentsResponse).then(t=>{if(_.setResultData(t.data.length),n.setAttribute("data-loading","false"),t.data.length===0)return n.innerHTML=f(),t;let T=(e,o)=>(e.forEach(w=>{o.find(k=>k.uuid===w.uuid)||o.push(M.commentShowMore(w.uuid)),w.comments&&w.comments.length>0&&T(w.comments,o)}),o);return r.set("hidden",T(t.data,r.get("hidden"))),n.innerHTML=t.data.map(e=>R.renderContent(e)).join(""),t.data.forEach(v),t.data.forEach(p),t})},b=n=>{let t=n.getAttribute("data-uuids").split(","),T=n.getAttribute("data-show")==="true",e=n.getAttribute("data-uuid");T?(n.setAttribute("data-show","false"),n.innerText="Show replies",n.innerText+=" ("+t.length+")",r.set("show",r.get("show").filter(o=>o!==e))):(n.setAttribute("data-show","true"),n.innerText="Hide replies",r.set("show",r.get("show").concat([e])));for(let o of t){r.set("hidden",r.get("hidden").map(k=>(k.uuid===o&&(k.show=!T),k)));let w=document.getElementById(o).classList;T?w.add("d-none"):w.remove("d-none")}},E=(n,t)=>{let T=document.getElementById(`content-${t}`),e=L.base64Decode(T.getAttribute("data-comment")),o=n.getAttribute("data-show")==="false";T.innerHTML=o?e:e.slice(0,R.maxCommentLength)+"...",n.innerText=o?"Sebagian":"Selengkapnya",n.setAttribute("data-show",o?"true":"false")},v=n=>{$.isAdmin()&&(n.comments&&n.comments.forEach(v),!(n.ip===void 0||n.user_agent===void 0||n.is_admin||c.has(n.ip))&&fetch(`https://freeipapi.com/api/json/${n.ip}`).then(t=>t.json()).then(t=>{let T=t.cityName+" - "+t.regionName;t.cityName==="-"&&t.regionName==="-"&&(T="localhost"),c.set(n.ip,T),document.getElementById(`ip-${n.uuid}`).innerHTML=`<i class="fa-solid fa-location-dot me-1"></i>${L.escapeHtml(n.ip)} <strong>${T}</strong>`}).catch(t=>{document.getElementById(`ip-${n.uuid}`).innerHTML=`<i class="fa-solid fa-location-dot me-1"></i>${L.escapeHtml(n.ip)} <strong>${L.escapeHtml(t.message)}</strong>`}))};return{like:W,pagination:_,init:()=>{W.init(),R.init(),_.init(),a=A("owns"),i=A("user"),c=A("tracker"),r=A("comment"),r.has("hidden")||r.set("hidden",[]),r.has("show")||r.set("show",[])},scroll:l,cancel:h,send:x,edit:d,reply:u,remove:m,update:g,show:y,showMore:E,showOrHide:b}})();var oe=(()=>{let a=null,i=()=>{let d=document.getElementById("count-down")?.getAttribute("data-time")?.replace(" ","T");if(!d){alert("invalid count down date.");return}let y=new Date(d).getTime();setInterval(()=>{let b=Math.abs(y-Date.now());document.getElementById("day").innerText=Math.floor(b/(1e3*60*60*24)),document.getElementById("hour").innerText=Math.floor(b%(1e3*60*60*24)/(1e3*60*60)),document.getElementById("minute").innerText=Math.floor(b%(1e3*60*60)/(1e3*60)),document.getElementById("second").innerText=Math.floor(b%(1e3*60)/1e3)},1e3)},c=(d,y=.01)=>{let b=document.getElementById(d),E=parseFloat(b.style.opacity),v=null;v=setInterval(()=>{if(E>0){b.style.opacity=E.toFixed(3),E-=y;return}clearInterval(v),v=null,b.remove()},10)},r=()=>{let d=window.location.search.split("to="),y=null;if(d.length>1&&d[1].length>=1&&(y=window.decodeURIComponent(d[1])),y){let E=document.getElementById("guest-name"),v=document.createElement("div");v.classList.add("m-2"),v.innerHTML=`
                <small class="mt-0 mb-1 mx-0 p-0">${E?.getAttribute("data-message")}</small>
                <p class="m-0 p-0" style="font-size: 1.5rem">${L.escapeHtml(y)}</p>
            `,E?.appendChild(v)}let b=document.getElementById("form-name");b&&(b.value=a.get("name")??y)},f=d=>{d.disabled=!0,document.body.scrollIntoView({behavior:"instant"}),F.isAutoMode()&&(document.getElementById("button-theme").style.display="block"),G.init(),F.spyTop(),te(),c("welcome",.025),L.timeOut(ne,1500)},s=d=>{let y=document.getElementById("show-modal-image");y.src=d.src,y.width=d.width,y.height=d.height,K.modal("modal-image").show()},l=()=>a.set("info",!0),p=()=>{document.querySelectorAll(".font-arabic").forEach(d=>{d.innerHTML=String(d.innerHTML).normalize("NFC")})},m=()=>{document.querySelectorAll("svg").forEach(d=>{L.timeOut(()=>d.classList.add(d.getAttribute("data-class")),parseInt(d.getAttribute("data-time")))})},g=()=>{let d=E=>new Date(E+"Z").toISOString().replace(/[-:]/g,"").split(".")[0],y=new URL("https://calendar.google.com/calendar/render"),b={action:"TEMPLATE",text:"The Wedding of Wahyu and Riski",dates:"2023-03-15 10:00:00/2023-03-15 11:00:00",details:"Tanpa mengurangi rasa hormat, kami mengundang Anda untuk berkenan menghadiri acara pernikahan kami. Terima kasih atas perhatian dan doa restu Anda, yang menjadi kebahagiaan serta kehormatan besar bagi kami.",location:"https://goo.gl/maps/ALZR6FJZU3kxVwN86",ctz:"Asia/Jakarta"};b.dates=`${d(b.dates.split("/")[0])}/${d(b.dates.split("/")[1])}`,Object.entries(b).forEach(([E,v])=>y.searchParams.set(E,v)),document.querySelector("#home button")?.addEventListener("click",()=>window.open(y,"_blank"))},x=()=>{m(),i(),r(),p(),g(),document.getElementById("root").style.opacity="1",a.has("presence")&&(document.getElementById("form-presence").value=a.get("presence")?"1":"2"),a.get("info")&&document.getElementById("information")?.remove(),window.AOS.init(),document.body.scrollIntoView({behavior:"instant"}),c("loading",.025)},h=()=>{Q.init(),H.init(),a=A("information");let d=document.body.getAttribute("data-key");if(document.addEventListener("progress.done",()=>x()),document.addEventListener("hide.bs.modal",()=>document.activeElement?.blur()),(!d||d.length<=0)&&(J.init().load(),document.getElementById("comment")?.remove(),document.querySelector('a.nav-link[href="#comment"]')?.closest("li.nav-item")?.remove()),d.length>0){H.add(),H.add();let y=J.init();y.hasDataSrc()||y.load();let b=new URLSearchParams(window.location.search);$.setToken(b.get("k")??d),window.addEventListener("load",()=>$.guest().then(()=>{H.complete("config"),y.hasDataSrc()&&y.load(),q.init(),q.show().then(()=>H.complete("comment")).catch(()=>H.invalid("comment"))}).catch(()=>H.invalid("config")))}};return{init:()=>(F.init(),$.init(),$.isAdmin()&&(A("user").clear(),A("owns").clear(),A("likes").clear(),A("session").clear(),A("comment").clear(),A("tracker").clear()),window.addEventListener("DOMContentLoaded",h),{util:L,theme:F,comment:q,guest:{open:f,modal:s,closeInformation:l}})}})();(a=>{a.undangan=oe.init()})(window);})();
