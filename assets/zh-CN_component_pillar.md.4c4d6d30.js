import{A as w,B as y,au as S,be as z,G as R,ai as T,am as G,D as L,ae as b,d as v,a5 as H,z as N,H as q,J as j,e as I,f as B,o as _,c as f,a as t,w as g,m as i,F as K,a_ as W,_ as M,r as O,j as n,p as r,b as V}from"./app.e23ab445.js";import{u as $}from"./chunks/index.8afcd991.js";import{b as U,g as Y,q as X,d as Z,F as J,a as Q}from"./chunks/index.4766a5d6.js";import{F as n2}from"./chunks/index.2c4c8a4f.js";import{F as s2}from"./chunks/index.e3f1504c.js";import{F as a2}from"./chunks/index.4aad40f9.js";import{_ as t2}from"./chunks/external-link-line.684acd58.js";const e2=w({options:{type:y(Object),default:()=>({})},groupOptions:{type:y(Object),default:()=>({})}}),p2={load:C=>C};function o2(C,c,E){const e={x:0,y:0,z:0,offsetX:0,offsetY:0,offsetZ:0,xKey:"x",yKey:"y",zKey:"z",height:3,hwRatio:6.219,texture:"/geo/light-column.png",materialOptions:{}},o=new S,s=new z,a=R.exports.merge(e,c),l=a.height,p=[a.x,a.y],[u,k]=E?E(p):p,F={x:u,y:k,z:a.z};function d(){const D=new T(l/a.hwRatio,l);D.translate(0,l/2,0);const x=new G({map:o.load(a.texture),color:"#00ffc4",transparent:!0,depthWrite:!1,side:L,...a.materialOptions}),A=new b(D,x);A.renderOrder=2,A.name="createLightPillar01";const m=A.clone();m.renderOrder=2,m.name="createLightPillar02",m.rotateY(Math.PI/2),s.add(A,m),s.position.set(F[a.xKey],F[a.yKey],F[a.zKey])}function h(){C.remove(s),s.children.forEach(D=>{D instanceof b&&(D.geometry.dispose(),D.material.dispose())}),s.remove(...s.children)}return d(),s.position.z+=a.offsetZ,s.position.x+=a.offsetX,s.position.y+=a.offsetY,C.add(s),{group:s,dispose:h}}const l2=v({name:"FtPillar"}),C2=v({...l2,props:e2,emits:p2,setup(C,{emit:c}){const E=C,e=c,o=U(),s=Y(),a=X(),l=s||o;let p,u;return H(()=>E.options,k=>{p==null||p(),u==null||u();const{dispose:F,group:d}=o2(l,k,a);p=F;const{watchStopHandle:h}=Z(E.groupOptions,d,o);u=h,e("load",{scene:o,group:d})},{deep:!0,immediate:!0}),N(()=>{p==null||p()}),(k,F)=>q(k.$slots,"default")}});var c2=C2;const P=j(c2);const E2=v({__name:"basic",setup(C){const c=I(),E=B({position:{set:[0,10,7]}}),e=B({x:0,y:0,z:0,materialOptions:{color:"#00ffc4"}}),{guiPromise:o}=$(c);return o.then(s=>{s.addColor(e.materialOptions,"color"),s.add(e,"x",-10,10,1),s.add(e,"y",-10,10,1),s.add(e,"z",-10,10,1)}),(s,a)=>(_(),f("div",{ref_key:"domRef",ref:c,class:"farst-three"},[t(i(Q),null,{default:g(()=>[t(i(n2),{options:E},null,8,["options"]),t(i(J),null,{default:g(()=>[t(i(P),{options:e},null,8,["options"]),(_(),f(K,null,W(5,l=>t(i(P),{key:l,options:{x:l,z:l,materialOptions:{color:"#ff0000"}}},null,8,["options"])),64)),t(i(s2)),t(i(a2))]),_:1})]),_:1})],512))}});var i2=M(E2,[["__scopeId","data-v-59340576"]]),r2=Object.freeze(Object.defineProperty({__proto__:null,default:i2},Symbol.toStringTag,{value:"Module"}));const u2=n("h1",{id:"pillar",tabindex:"-1"},[r("Pillar "),n("a",{class:"header-anchor vp-link",href:"#pillar","aria-hidden":"true"},"#")],-1),F2=n("h2",{id:"\u57FA\u7840\u7528\u6CD5",tabindex:"-1"},[r("\u57FA\u7840\u7528\u6CD5 "),n("a",{class:"header-anchor vp-link",href:"#\u57FA\u7840\u7528\u6CD5","aria-hidden":"true"},"#")],-1),D2=n("p",null,"pillar/basic",-1),k2=n("h2",{id:"api",tabindex:"-1"},[r("API "),n("a",{class:"header-anchor vp-link",href:"#api","aria-hidden":"true"},"#")],-1),d2=n("h3",{id:"attributes",tabindex:"-1"},[r("Attributes "),n("a",{class:"header-anchor vp-link",href:"#attributes","aria-hidden":"true"},"#")],-1),A2={class:"vp-table"},m2=n("thead",null,[n("tr",null,[n("th",null,"Name"),n("th",null,"Description"),n("th",null,"Type"),n("th",null,"Default"),n("th",null,"Required")])],-1),h2=n("td",null,[n("code",null,"skyColor")],-1),_2=n("td",null,"\u6784\u9020\u51FD\u6570\u53C2\u6570",-1),f2=n("td",null,[n("code",null,"undefined")],-1),g2=n("td",null,"No",-1),v2=n("td",null,[n("code",null,"options")],-1),y2=n("td",null,"\u5B9E\u4F8B\u5C5E\u6027",-1),b2=n("td",null,[n("code",null,"{}")],-1),B2=n("td",null,"No",-1),O2=n("h3",{id:"events",tabindex:"-1"},[r("Events "),n("a",{class:"header-anchor vp-link",href:"#events","aria-hidden":"true"},"#")],-1),P2={class:"vp-table"},x2=n("thead",null,[n("tr",null,[n("th",null,"Name"),n("th",null,"Description"),n("th",null,"Type")])],-1),w2=n("td",null,[n("code",null,"load")],-1),S2=n("td",null,"\u5B9E\u4F8B\u521B\u5EFA\u540E\u89E6\u53D1\u65B9\u6CD5",-1),z2=n("h3",{id:"provide",tabindex:"-1"},[r("Provide "),n("a",{class:"header-anchor vp-link",href:"#provide","aria-hidden":"true"},"#")],-1),R2={class:"vp-table"},T2=n("thead",null,[n("tr",null,[n("th",null,"Key"),n("th",null,"Description"),n("th",null,"Type")])],-1),G2=n("td",null,[n("code",null,"hemisphereLightInjectionKey")],-1),L2=n("td",null,"HemisphereLight\u5B9E\u4F8B",-1),H2=V('<h3 id="slots" tabindex="-1">Slots <a class="header-anchor vp-link" href="#slots" aria-hidden="true">#</a></h3><div class="vp-table"><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>default</code></td><td>\u9ED8\u8BA4\u63D2\u69FD</td></tr></tbody></table></div><h2 id="\u6E90\u4EE3\u7801" tabindex="-1">\u6E90\u4EE3\u7801 <a class="header-anchor vp-link" href="#\u6E90\u4EE3\u7801" aria-hidden="true">#</a></h2>',3),N2={href:"https://github.com/farst-three/farst-three/blob/dev/docs/en-US/component/pillar.md",class:"vp-link",target:"_blank",rel:"noopener noreferrer"},U2='{"title":"Pillar","description":"","frontmatter":{"title":"Pillar","lang":"zh-CN"},"headers":[{"level":2,"title":"\u57FA\u7840\u7528\u6CD5","slug":"\u57FA\u7840\u7528\u6CD5"},{"level":2,"title":"API","slug":"api"},{"level":3,"title":"Attributes","slug":"attributes"},{"level":3,"title":"Events","slug":"events"},{"level":3,"title":"Provide","slug":"provide"},{"level":3,"title":"Slots","slug":"slots"},{"level":2,"title":"\u6E90\u4EE3\u7801","slug":"\u6E90\u4EE3\u7801"}],"relativePath":"zh-CN/component/pillar.md","lastUpdated":1701938573000}',q2={},Y2=Object.assign(q2,{__name:"pillar",setup(C){const c={"../../examples/pillar/basic.vue":r2};return(E,e)=>{const o=O("Demo"),s=O("api-typing"),a=t2;return _(),f("div",null,[u2,F2,t(o,{demos:i(c),source:"%3Cpre%20v-pre%3E%3Ccode%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Ediv%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Eref%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3EdomRef%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Eclass%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Efarst-three%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtScene%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtPerspectiveCamera%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Aoptions%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3EcameraOptions%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtWebglRenderer%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtPillar%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Aoptions%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3EpillarOptions%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtPillar%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3Ev-for%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Eitem%20in%205%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Akey%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Eitem%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Aoptions%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20x%3A%20item%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20z%3A%20item%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20materialOptions%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20color%3A%20'%23ff0000'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtGridHelper%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtOrbitControls%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3EFtWebglRenderer%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3EFtScene%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Ediv%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Escript%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Esetup%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Elang%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Ets%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20script%22%3E%3Cspan%20class%3D%22token%20language-javascript%22%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20reactive%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20ref%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Efrom%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'vue'%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20useGui%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Efrom%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'%40farst-three%2Fhooks'%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20FtGridHelper%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20FtOrbitControls%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20FtPerspectiveCamera%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20FtPillar%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20FtScene%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20FtWebglRenderer%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Efrom%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'%40farst-three%2Fcomponents'%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%20type%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20PillarOptions%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Efrom%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'%40farst-three%2Fcomponents'%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20domRef%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20ref%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3EHTMLDivElement%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20cameraOptions%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20function%22%3Ereactive%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20literal-property%20property%22%3Eposition%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20literal-property%20property%22%3Eset%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%5B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20number%22%3E0%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E10%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E7%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%5D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20pillarOptions%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20reactive%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3EPillarOptions%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20literal-property%20property%22%3Ex%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E0%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20literal-property%20property%22%3Ey%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E0%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20literal-property%20property%22%3Ez%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E0%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20literal-property%20property%22%3EmaterialOptions%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20literal-property%20property%22%3Ecolor%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'%2300ffc4'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20guiPromise%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20function%22%3EuseGui%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3EdomRef%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0AguiPromise%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3E%3Cspan%20class%3D%22token%20function%22%3Ethen%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20parameter%22%3Egui%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20gui%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3E%3Cspan%20class%3D%22token%20function%22%3EaddColor%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3EpillarOptions%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3EmaterialOptions%3Cspan%20class%3D%22token%20operator%22%3E!%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'color'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%20%20gui%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3E%3Cspan%20class%3D%22token%20function%22%3Eadd%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3EpillarOptions%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'x'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3E%3Cspan%20class%3D%22token%20number%22%3E10%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E10%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E1%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%20%20gui%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3E%3Cspan%20class%3D%22token%20function%22%3Eadd%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3EpillarOptions%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'y'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3E%3Cspan%20class%3D%22token%20number%22%3E10%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E10%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E1%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%20%20gui%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3E%3Cspan%20class%3D%22token%20function%22%3Eadd%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3EpillarOptions%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'z'%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3E%3Cspan%20class%3D%22token%20number%22%3E10%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E10%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E1%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Escript%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Estyle%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Elang%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Escss%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Escoped%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20style%22%3E%3Cspan%20class%3D%22token%20language-css%22%3E%0A%3Cspan%20class%3D%22token%20selector%22%3E.farst-three%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20property%22%3Eheight%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3A%3C%2Fspan%3E%20700px%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20property%22%3Ewidth%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3A%3C%2Fspan%3E%20100%25%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20property%22%3Eposition%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3A%3C%2Fspan%3E%20relative%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%0A%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Estyle%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3C%2Fcode%3E%3C%2Fpre%3E",path:"pillar/basic","raw-source":"%3Ctemplate%3E%0A%20%20%3Cdiv%20ref%3D%22domRef%22%20class%3D%22farst-three%22%3E%0A%20%20%20%20%3CFtScene%3E%0A%20%20%20%20%20%20%3CFtPerspectiveCamera%20%3Aoptions%3D%22cameraOptions%22%20%2F%3E%0A%20%20%20%20%20%20%3CFtWebglRenderer%3E%0A%20%20%20%20%20%20%20%20%3CFtPillar%20%3Aoptions%3D%22pillarOptions%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%3CFtPillar%0A%20%20%20%20%20%20%20%20%20%20v-for%3D%22item%20in%205%22%0A%20%20%20%20%20%20%20%20%20%20%3Akey%3D%22item%22%0A%20%20%20%20%20%20%20%20%20%20%3Aoptions%3D%22%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20x%3A%20item%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20z%3A%20item%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20materialOptions%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20color%3A%20'%23ff0000'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%22%0A%20%20%20%20%20%20%20%20%2F%3E%0A%20%20%20%20%20%20%20%20%3CFtGridHelper%20%2F%3E%0A%20%20%20%20%20%20%20%20%3CFtOrbitControls%20%2F%3E%0A%20%20%20%20%20%20%3C%2FFtWebglRenderer%3E%0A%20%20%20%20%3C%2FFtScene%3E%0A%20%20%3C%2Fdiv%3E%0A%3C%2Ftemplate%3E%0A%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aimport%20%7B%20reactive%2C%20ref%20%7D%20from%20'vue'%0Aimport%20%7B%20useGui%20%7D%20from%20'%40farst-three%2Fhooks'%0Aimport%20%7B%0A%20%20FtGridHelper%2C%0A%20%20FtOrbitControls%2C%0A%20%20FtPerspectiveCamera%2C%0A%20%20FtPillar%2C%0A%20%20FtScene%2C%0A%20%20FtWebglRenderer%2C%0A%7D%20from%20'%40farst-three%2Fcomponents'%0Aimport%20type%20%7B%20PillarOptions%20%7D%20from%20'%40farst-three%2Fcomponents'%0Aconst%20domRef%20%3D%20ref%3CHTMLDivElement%3E()%0Aconst%20cameraOptions%20%3D%20reactive(%7B%0A%20%20position%3A%20%7B%0A%20%20%20%20set%3A%20%5B0%2C%2010%2C%207%5D%2C%0A%20%20%7D%2C%0A%7D)%0Aconst%20pillarOptions%20%3D%20reactive%3CPillarOptions%3E(%7B%0A%20%20x%3A%200%2C%0A%20%20y%3A%200%2C%0A%20%20z%3A%200%2C%0A%20%20materialOptions%3A%20%7B%0A%20%20%20%20color%3A%20'%2300ffc4'%2C%0A%20%20%7D%2C%0A%7D)%0Aconst%20%7B%20guiPromise%20%7D%20%3D%20useGui(domRef)%0AguiPromise.then((gui)%20%3D%3E%20%7B%0A%20%20gui.addColor(pillarOptions.materialOptions!%2C%20'color')%0A%20%20gui.add(pillarOptions%2C%20'x'%2C%20-10%2C%2010%2C%201)%0A%20%20gui.add(pillarOptions%2C%20'y'%2C%20-10%2C%2010%2C%201)%0A%20%20gui.add(pillarOptions%2C%20'z'%2C%20-10%2C%2010%2C%201)%0A%7D)%0A%3C%2Fscript%3E%0A%0A%3Cstyle%20lang%3D%22scss%22%20scoped%3E%0A.farst-three%20%7B%0A%20%20height%3A%20700px%3B%0A%20%20width%3A%20100%25%3B%0A%20%20position%3A%20relative%3B%0A%7D%0A%3C%2Fstyle%3E%0A",description:"",rawTabsSource:"%7B%7D",tabs:[]},{default:g(()=>[D2]),_:1},8,["demos"]),k2,d2,n("div",A2,[n("table",null,[m2,n("tbody",null,[n("tr",null,[h2,_2,n("td",null,[t(s,{type:"ColorRepresentation",details:""})]),f2,g2]),n("tr",null,[v2,y2,n("td",null,[t(s,{type:"HemisphereLightOptions",details:""})]),b2,B2])])])]),O2,n("div",P2,[n("table",null,[x2,n("tbody",null,[n("tr",null,[w2,S2,n("td",null,[t(s,{type:"Function",details:"(e: HemisphereLightLoadEvent) => void"})])])])])]),z2,n("div",R2,[n("table",null,[T2,n("tbody",null,[n("tr",null,[G2,L2,n("td",null,[t(s,{type:"HemisphereLight",details:""})])])])])]),H2,n("p",null,[n("a",N2,[r("\u6587\u6863"),t(a,{class:"link-icon"})])])])}}});export{U2 as __pageData,Y2 as default};
