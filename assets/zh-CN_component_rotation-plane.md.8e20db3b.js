import{A as b,B as h,G as y,au as B,am as P,ai as O,ae as R,d as F,a5 as x,z as w,H as S,J as T,e as N,f as m,o as g,c as f,a as t,w as D,m as E,_ as I,r as A,j as n,p as u,b as v}from"./app.e23ab445.js";import{u as q}from"./chunks/index.8afcd991.js";import{b as L,n as j,d as M,F as V,a as W}from"./chunks/index.4766a5d6.js";import{F as G}from"./chunks/index.2c4c8a4f.js";import{F as H}from"./chunks/index.4aad40f9.js";import{_ as z}from"./chunks/external-link-line.684acd58.js";const $=b({meshOptions:{type:h(Object),default:()=>({})},options:{type:h(Object),default:()=>({})}}),U={load:p=>p};function K(p,l){const c={texture:"/geo/rotating-aperture.png",speed:.005,materialOptions:{},geometryOptions:[100,100]},e=y.exports.merge(c,l),o=new B().load(e.texture),a=new P({map:o,transparent:!0,opacity:1,depthTest:!0,depthWrite:!1,...e.materialOptions}),C=new O(...e.geometryOptions),s=new R(C,a);s.rotateX(-Math.PI/2),s.position.y=.15,s.scale.set(1,1,1),p.add(s);function i(){s&&(s.rotation.z+=e.speed)}function r(){p.remove(s),o.dispose(),a.dispose(),C.dispose()}return{render:i,dispose:r,mesh:s}}const J=F({name:"FtRotationPlane"}),X=F({...J,props:$,emits:U,setup(p,{emit:l}){const c=p,e=l,o=L(),a=j(),C=`rotation-plane${Math.random()}`;let s,i;return x(()=>c.options,()=>{s&&s();const{render:r,dispose:k,mesh:d}=K(o,c.options);s=k,i=r,M(c.meshOptions,d,o),e("load",{scene:o,mesh:d})},{immediate:!0,deep:!0}),a.on(C,()=>{i&&i()}),w(()=>{s(),a.off(C)}),(r,k)=>S(r.$slots,"default")}});var Q=X;const _=T(Q);const Y=F({__name:"basic",setup(p){const l=N(),c=m({position:{set:[3,74,100]}}),e=m({texture:"/geo/rotating-point2.png",speed:-.001}),{guiPromise:o}=q(l);return o.then(a=>{a.add(e,"speed",-.01,.01,.001)}),(a,C)=>(g(),f("div",{ref_key:"domRef",ref:l,class:"farst-three"},[t(E(W),null,{default:D(()=>[t(E(G),{options:c},null,8,["options"]),t(E(V),null,{default:D(()=>[t(E(_),{options:{speed:.001}}),t(E(_),{options:e,"mesh-options":{scale:{set:[1.2,1.2,1.2]}}},null,8,["options"]),t(E(H))]),_:1})]),_:1})],512))}});var Z=I(Y,[["__scopeId","data-v-5de3a7e7"]]),n2=Object.freeze(Object.defineProperty({__proto__:null,default:Z},Symbol.toStringTag,{value:"Module"})),s2="/geo/rotating-aperture.png",a2="/geo/rotating-point2.png";const t2=v('<h1 id="rotationplane" tabindex="-1">RotationPlane <a class="header-anchor vp-link" href="#rotationplane" aria-hidden="true">#</a></h1><p>\u8D34\u56FE + \u52A8\u753B\u51FD\u6570\u4E2D\u6539\u53D8 z \u8F74\u4F4D\u7F6E\u5B9E\u73B0\u65CB\u8F6C</p><img src="'+s2+'" style="width:50%;height:50%;background-color:#000;"><img src="'+a2+'" style="width:50%;height:50%;background-color:#000;"><h2 id="\u57FA\u7840\u7528\u6CD5" tabindex="-1">\u57FA\u7840\u7528\u6CD5 <a class="header-anchor vp-link" href="#\u57FA\u7840\u7528\u6CD5" aria-hidden="true">#</a></h2>',5),e2=n("p",null,"rotation-plane/basic",-1),o2=n("h2",{id:"api",tabindex:"-1"},[u("API "),n("a",{class:"header-anchor vp-link",href:"#api","aria-hidden":"true"},"#")],-1),p2=n("h3",{id:"attributes",tabindex:"-1"},[u("Attributes "),n("a",{class:"header-anchor vp-link",href:"#attributes","aria-hidden":"true"},"#")],-1),l2={class:"vp-table"},c2=n("thead",null,[n("tr",null,[n("th",null,"Name"),n("th",null,"Description"),n("th",null,"Type"),n("th",null,"Default"),n("th",null,"Required")])],-1),C2=n("td",null,[n("code",null,"options")],-1),E2=n("td",null,"\u5B9E\u4F8B\u5C5E\u6027",-1),i2=n("td",null,[n("code",null,"{}")],-1),r2=n("td",null,"No",-1),u2=n("h3",{id:"events",tabindex:"-1"},[u("Events "),n("a",{class:"header-anchor vp-link",href:"#events","aria-hidden":"true"},"#")],-1),D2={class:"vp-table"},F2=n("thead",null,[n("tr",null,[n("th",null,"Name"),n("th",null,"Description"),n("th",null,"Type")])],-1),k2=n("td",null,[n("code",null,"load")],-1),d2=n("td",null,"\u5B9E\u4F8B\u521B\u5EFA\u540E\u89E6\u53D1\u65B9\u6CD5",-1),h2=n("h3",{id:"provide",tabindex:"-1"},[u("Provide "),n("a",{class:"header-anchor vp-link",href:"#provide","aria-hidden":"true"},"#")],-1),m2={class:"vp-table"},A2=n("thead",null,[n("tr",null,[n("th",null,"Key"),n("th",null,"Description"),n("th",null,"Type")])],-1),_2=n("td",null,[n("code",null,"hemisphereLightInjectionKey")],-1),g2=n("td",null,"HemisphereLight\u5B9E\u4F8B",-1),f2=v('<h3 id="slots" tabindex="-1">Slots <a class="header-anchor vp-link" href="#slots" aria-hidden="true">#</a></h3><div class="vp-table"><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>default</code></td><td>\u9ED8\u8BA4\u63D2\u69FD</td></tr></tbody></table></div><h2 id="\u6E90\u4EE3\u7801" tabindex="-1">\u6E90\u4EE3\u7801 <a class="header-anchor vp-link" href="#\u6E90\u4EE3\u7801" aria-hidden="true">#</a></h2>',3),v2={href:"https://github.com/farst-three/farst-three/blob/dev/docs/en-US/component/rotation-plane.md",class:"vp-link",target:"_blank",rel:"noopener noreferrer"},w2='{"title":"RotationPlane","description":"","frontmatter":{"title":"RotationPlane","lang":"zh-CN"},"headers":[{"level":2,"title":"\u57FA\u7840\u7528\u6CD5","slug":"\u57FA\u7840\u7528\u6CD5"},{"level":2,"title":"API","slug":"api"},{"level":3,"title":"Attributes","slug":"attributes"},{"level":3,"title":"Events","slug":"events"},{"level":3,"title":"Provide","slug":"provide"},{"level":3,"title":"Slots","slug":"slots"},{"level":2,"title":"\u6E90\u4EE3\u7801","slug":"\u6E90\u4EE3\u7801"}],"relativePath":"zh-CN/component/rotation-plane.md","lastUpdated":1701938573000}',b2={},S2=Object.assign(b2,{__name:"rotation-plane",setup(p){const l={"../../examples/rotation-plane/basic.vue":n2};return(c,e)=>{const o=A("Demo"),a=A("api-typing"),C=z;return g(),f("div",null,[t2,t(o,{demos:E(l),source:"%3Cpre%20v-pre%3E%3Ccode%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Ediv%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Eref%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3EdomRef%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Eclass%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Efarst-three%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtScene%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtPerspectiveCamera%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Aoptions%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3EcameraOptions%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtWebglRenderer%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtRotationPlane%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Aoptions%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%7B%20speed%3A%200.001%20%7D%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtRotationPlane%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Aoptions%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3EplaneOption%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Amesh-options%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20scale%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20set%3A%20%5B1.2%2C%201.2%2C%201.2%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtOrbitControls%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3EFtWebglRenderer%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3EFtScene%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Ediv%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Escript%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Esetup%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Elang%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Ets%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20script%22%3E%3Cspan%20class%3D%22token%20language-javascript%22%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20reactive%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20ref%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Efrom%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'vue'%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20useGui%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Efrom%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'%40farst-three%2Fhooks'%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20FtOrbitControls%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20FtPerspectiveCamera%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20FtRotationPlane%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20FtScene%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20FtWebglRenderer%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Efrom%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'%40farst-three%2Fcomponents'%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%20type%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20RotationPlaneOptions%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Efrom%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'%40farst-three%2Fcomponents'%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20domRef%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20ref%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3EHTMLDivElement%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20cameraOptions%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20function%22%3Ereactive%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20literal-property%20property%22%3Eposition%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20literal-property%20property%22%3Eset%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%5B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20number%22%3E3%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E74%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E100%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%5D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20planeOption%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20reactive%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3ERotationPlaneOptions%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20literal-property%20property%22%3Etexture%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'%2Fgeo%2Frotating-point2.png'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20literal-property%20property%22%3Espeed%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3E%3Cspan%20class%3D%22token%20number%22%3E0.001%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20guiPromise%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20function%22%3EuseGui%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3EdomRef%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0AguiPromise%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3E%3Cspan%20class%3D%22token%20function%22%3Ethen%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20parameter%22%3Egui%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20gui%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3E%3Cspan%20class%3D%22token%20function%22%3Eadd%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3EplaneOption%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'speed'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3E%3Cspan%20class%3D%22token%20number%22%3E0.01%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E0.01%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E0.001%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Escript%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Estyle%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Elang%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Escss%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Escoped%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20style%22%3E%3Cspan%20class%3D%22token%20language-css%22%3E%0A%3Cspan%20class%3D%22token%20selector%22%3E.farst-three%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20property%22%3Eheight%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3A%3C%2Fspan%3E%20700px%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20property%22%3Ewidth%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3A%3C%2Fspan%3E%20100%25%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20property%22%3Eposition%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3A%3C%2Fspan%3E%20relative%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%0A%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Estyle%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3C%2Fcode%3E%3C%2Fpre%3E",path:"rotation-plane/basic","raw-source":"%3Ctemplate%3E%0A%20%20%3Cdiv%20ref%3D%22domRef%22%20class%3D%22farst-three%22%3E%0A%20%20%20%20%3CFtScene%3E%0A%20%20%20%20%20%20%3CFtPerspectiveCamera%20%3Aoptions%3D%22cameraOptions%22%20%2F%3E%0A%20%20%20%20%20%20%3CFtWebglRenderer%3E%0A%20%20%20%20%20%20%20%20%3CFtRotationPlane%20%3Aoptions%3D%22%7B%20speed%3A%200.001%20%7D%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%3CFtRotationPlane%0A%20%20%20%20%20%20%20%20%20%20%3Aoptions%3D%22planeOption%22%0A%20%20%20%20%20%20%20%20%20%20%3Amesh-options%3D%22%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20scale%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20set%3A%20%5B1.2%2C%201.2%2C%201.2%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%22%0A%20%20%20%20%20%20%20%20%2F%3E%0A%20%20%20%20%20%20%20%20%3CFtOrbitControls%20%2F%3E%0A%20%20%20%20%20%20%3C%2FFtWebglRenderer%3E%0A%20%20%20%20%3C%2FFtScene%3E%0A%20%20%3C%2Fdiv%3E%0A%3C%2Ftemplate%3E%0A%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aimport%20%7B%20reactive%2C%20ref%20%7D%20from%20'vue'%0Aimport%20%7B%20useGui%20%7D%20from%20'%40farst-three%2Fhooks'%0Aimport%20%7B%0A%20%20FtOrbitControls%2C%0A%20%20FtPerspectiveCamera%2C%0A%20%20FtRotationPlane%2C%0A%20%20FtScene%2C%0A%20%20FtWebglRenderer%2C%0A%7D%20from%20'%40farst-three%2Fcomponents'%0Aimport%20type%20%7B%20RotationPlaneOptions%20%7D%20from%20'%40farst-three%2Fcomponents'%0Aconst%20domRef%20%3D%20ref%3CHTMLDivElement%3E()%0Aconst%20cameraOptions%20%3D%20reactive(%7B%0A%20%20position%3A%20%7B%0A%20%20%20%20set%3A%20%5B3%2C%2074%2C%20100%5D%2C%0A%20%20%7D%2C%0A%7D)%0Aconst%20planeOption%20%3D%20reactive%3CRotationPlaneOptions%3E(%7B%0A%20%20texture%3A%20'%2Fgeo%2Frotating-point2.png'%2C%0A%20%20speed%3A%20-0.001%2C%0A%7D)%0Aconst%20%7B%20guiPromise%20%7D%20%3D%20useGui(domRef)%0AguiPromise.then((gui)%20%3D%3E%20%7B%0A%20%20gui.add(planeOption%2C%20'speed'%2C%20-0.01%2C%200.01%2C%200.001)%0A%7D)%0A%3C%2Fscript%3E%0A%0A%3Cstyle%20lang%3D%22scss%22%20scoped%3E%0A.farst-three%20%7B%0A%20%20height%3A%20700px%3B%0A%20%20width%3A%20100%25%3B%0A%20%20position%3A%20relative%3B%0A%7D%0A%3C%2Fstyle%3E%0A",description:"",rawTabsSource:"%7B%7D",tabs:[]},{default:D(()=>[e2]),_:1},8,["demos"]),o2,p2,n("div",l2,[n("table",null,[c2,n("tbody",null,[n("tr",null,[C2,E2,n("td",null,[t(a,{type:"HemisphereLightOptions",details:""})]),i2,r2])])])]),u2,n("div",D2,[n("table",null,[F2,n("tbody",null,[n("tr",null,[k2,d2,n("td",null,[t(a,{type:"Function",details:"(e: HemisphereLightLoadEvent) => void"})])])])])]),h2,n("div",m2,[n("table",null,[A2,n("tbody",null,[n("tr",null,[_2,g2,n("td",null,[t(a,{type:"HemisphereLight",details:""})])])])])]),f2,n("p",null,[n("a",v2,[u("\u6587\u6863"),t(C,{class:"link-icon"})])])])}}});export{w2 as __pageData,S2 as default};