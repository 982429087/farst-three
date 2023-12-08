import{ad as h,ae as F,d as D,c1 as y,aj as k,ap as S,ac as _,ag as f,aq as x,ar as M,ah as B,c2 as w,at as P,e as T,o as d,c as A,a as e,w as u,m as o,F as j,a7 as R,bF as q,_ as I,r as m,j as a,p as C,b as O}from"./app.b6b87ec6.js";import{u as v,d as z,C as L,a as b,b as N,h as U,F as V,i as $,j as W,k as G}from"./chunks/index.a49ef920.js";import{F as K}from"./chunks/index.2254a4f0.js";import{_ as H}from"./chunks/external-link-line.b021b4f7.js";const J=h({options:{type:F(Object),default:()=>({})},material:{type:F(Object)}}),Q={load:l=>l},X=D({name:"FtSprite"}),Y=D({...X,props:J,emits:Q,setup(l,{emit:r}){const c=l,i=r;let t=v(),p=z(),s=new L,n=new y(c.material);return i("load",{scene:t,sprite:n}),b(c.options,n,t),t.add(n),k(x,n),k(M,s),S(()=>s.aollections,E=>{n&&(E.length===1?n.material=E[0]:E.length>1&&(n.material=E))},{deep:!0}),_(()=>{p===null?t==null||t.remove(n):p.remove(n),n.remove(...n.children),n=null,s=null,t=null,p=null}),(E,g)=>f(E.$slots,"default")}});var Z=Y;const a2=B(Z),n2=h({options:{type:F(Object),default:()=>({})},params:{type:F(Object)}}),s2={load:l=>l},t2=D({name:"FtSpriteMaterial"}),e2=D({...t2,props:n2,emits:s2,setup(l,{emit:r}){const c=l,i=r;let t=v(),p=N(),s=U(),n=new w(c.params);return s.addCount(n),i("load",{scene:t,obj3d:p,material:n}),k(P,n),b(c.options,n,t),_(()=>{s.subCount(n),n.dispose(),t=null,p=null,s=null,n=null}),(E,g)=>f(E.$slots,"default")}});var p2=e2;const o2=B(p2);const l2=D({__name:"basic",setup(l){const r=T(),c="/farst-three/",i=[];for(let p=-10;p<10;p++)for(let s=-10;s<10;s++)i.push({x:p*Math.random(),y:s*Math.random(),z:Math.random()*10});const t=()=>{};return(p,s)=>(d(),A("div",{ref_key:"domRef",ref:r,class:"farst-three"},[e(o(G),null,{default:u(()=>[e(o(V),{fov:75,near:.01,far:100,options:{position:{set:[.1,4,7]}}}),e(o($),{params:{antialias:!0},"animation-fn":t,options:{shadowMap:{enabled:!0}}},{default:u(()=>[(d(),A(j,null,R(i,n=>e(o(a2),{key:n,options:{position:{set:[n.x,n.y,n.z]}}},{default:u(()=>[e(o(o2),{params:{color:Math.random()*16777215,rotation:Math.random()*Math.PI,opacity:Math.random()}},{default:u(()=>[e(o(K),{options:{colorSpace:o(q)},url:o(c)+"textures/raindrop.png",type:"map"},null,8,["options","url"])]),_:1},8,["params"])]),_:2},1032,["options"])),64)),e(o(W))]),_:1})]),_:1})],512))}});var C2=I(l2,[["__scopeId","data-v-3db40ba8"]]),c2=Object.freeze(Object.defineProperty({__proto__:null,default:C2},Symbol.toStringTag,{value:"Module"}));const E2=a("h1",{id:"sprite",tabindex:"-1"},[C("Sprite "),a("a",{class:"header-anchor vp-link",href:"#sprite","aria-hidden":"true"},"#")],-1),r2=a("p",null,"\u521B\u5EFA\u7C92\u5B50\u7CFB\u7EDF\u7684\u65B9\u6CD5",-1),i2=a("ol",null,[a("li",null,"Sprite SpriteMaterial (\u7B80\u5355)"),a("li",null,"Points PointsMaterial (\u76F8\u5BF9\u5BB9\u6613\uFF0C\u6027\u80FD\u6BD4\u8F83\u9AD8)"),a("li",null,"Points PointsMaterial Shader (\u5B9E\u73B0\u590D\u6742\uFF0C\u6027\u80FD\u6700\u597D)")],-1),u2={href:"https://threejs.org/docs/index.html?q=spr#api/zh/objects/Sprite",class:"vp-link",target:"_blank",rel:"noopener noreferrer"},D2=a("div",{class:"tip custom-block"},[a("p",{class:"custom-block-title"},"TIP"),a("p",null,"152 \u7248\u672C\u540E\u5F00\u542F\u5168\u65B0\u7684\u8272\u5F69\u7A7A\u95F4\u7BA1\u7406")],-1),F2=a("h2",{id:"\u57FA\u7840\u7528\u6CD5",tabindex:"-1"},[C("\u57FA\u7840\u7528\u6CD5 "),a("a",{class:"header-anchor vp-link",href:"#\u57FA\u7840\u7528\u6CD5","aria-hidden":"true"},"#")],-1),k2=a("p",null,"sprite/basic",-1),d2=a("h2",{id:"api",tabindex:"-1"},[C("API "),a("a",{class:"header-anchor vp-link",href:"#api","aria-hidden":"true"},"#")],-1),A2=a("h3",{id:"attributes",tabindex:"-1"},[C("Attributes "),a("a",{class:"header-anchor vp-link",href:"#attributes","aria-hidden":"true"},"#")],-1),m2={class:"vp-table"},h2=a("thead",null,[a("tr",null,[a("th",null,"Name"),a("th",null,"Description"),a("th",null,"Type"),a("th",null,"Default"),a("th",null,"Required")])],-1),_2=a("td",null,[a("code",null,"material")],-1),f2=a("td",null,"\u6784\u9020\u51FD\u6570\u53C2\u6570",-1),B2=a("td",null,[a("code",null,"undefined")],-1),v2=a("td",null,"No",-1),b2=a("td",null,[a("code",null,"options")],-1),g2=a("td",null,"\u5B9E\u4F8B\u5C5E\u6027",-1),y2=a("td",null,[a("code",null,"{}")],-1),S2=a("td",null,"No",-1),x2=a("h3",{id:"events",tabindex:"-1"},[C("Events "),a("a",{class:"header-anchor vp-link",href:"#events","aria-hidden":"true"},"#")],-1),M2={class:"vp-table"},w2=a("thead",null,[a("tr",null,[a("th",null,"Name"),a("th",null,"Description"),a("th",null,"Type")])],-1),P2=a("td",null,[a("code",null,"load")],-1),T2=a("td",null,"\u5B9E\u4F8B\u521B\u5EFA\u540E\u89E6\u53D1\u65B9\u6CD5",-1),j2=a("h3",{id:"provide",tabindex:"-1"},[C("Provide "),a("a",{class:"header-anchor vp-link",href:"#provide","aria-hidden":"true"},"#")],-1),R2={class:"vp-table"},q2=a("thead",null,[a("tr",null,[a("th",null,"Key"),a("th",null,"Description"),a("th",null,"Type")])],-1),I2=a("td",null,[a("code",null,"object3dInjectionKey")],-1),O2=a("td",null,"Sprite\u5B9E\u4F8B",-1),z2=a("td",null,[a("code",null,"materialServiceInjectionKey")],-1),L2=a("td",null,"\u8BB0\u5F55material\u6570\u91CF\u7684\u7C7B",-1),N2=O("",3),U2={href:"https://github.com/farst-three/farst-three/blob/dev/docs/en-US/component/sprite.md",class:"vp-link",target:"_blank",rel:"noopener noreferrer"},H2='{"title":"Sprite","description":"","frontmatter":{"title":"Sprite","lang":"zh-CN"},"headers":[{"level":2,"title":"\u57FA\u7840\u7528\u6CD5","slug":"\u57FA\u7840\u7528\u6CD5"},{"level":2,"title":"API","slug":"api"},{"level":3,"title":"Attributes","slug":"attributes"},{"level":3,"title":"Events","slug":"events"},{"level":3,"title":"Provide","slug":"provide"},{"level":3,"title":"Slots","slug":"slots"},{"level":2,"title":"\u6E90\u4EE3\u7801","slug":"\u6E90\u4EE3\u7801"}],"relativePath":"zh-CN/component/sprite.md","lastUpdated":1702020886000}',V2={},J2=Object.assign(V2,{__name:"sprite",setup(l){const r={"../../examples/sprite/basic.vue":c2};return(c,i)=>{const t=H,p=m("Demo"),s=m("api-typing");return d(),A("div",null,[E2,r2,i2,a("p",null,[a("a",u2,[C("\u7CBE\u7075"),e(t,{class:"link-icon"})]),C("\u7CBE\u7075\u662F\u4E00\u4E2A\u603B\u662F\u9762\u671D\u7740\u6444\u50CF\u673A\u7684\u5E73\u9762\uFF0C\u901A\u5E38\u542B\u6709\u4F7F\u7528\u4E00\u4E2A\u534A\u900F\u660E\u7684\u7EB9\u7406\u3002 \u7CBE\u7075\u4E0D\u4F1A\u6295\u5C04\u4EFB\u4F55\u9634\u5F71\uFF0C\u5373\u4F7F\u8BBE\u7F6E\u4E86 castShadow = true\u4E5F\u5C06\u4E0D\u4F1A\u6709\u4EFB\u4F55\u6548\u679C\u3002")]),D2,F2,e(p,{demos:o(r),source:"%3Cpre%20v-pre%3E%3Ccode%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Ediv%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Eref%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3EdomRef%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Eclass%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Efarst-three%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtScene%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtPerspectiveCamera%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Afov%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E75%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Anear%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E0.01%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Afar%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E100%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Aoptions%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%7B%0A%20%20%20%20%20%20%20%20%20%20position%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20set%3A%20%5B0.1%2C%204%2C%207%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtWebglRenderer%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Aparams%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%7B%20antialias%3A%20true%20%7D%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Aanimation-fn%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3EanimationFn%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Aoptions%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%7B%0A%20%20%20%20%20%20%20%20%20%20shadowMap%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20enabled%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Etemplate%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Ev-for%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Eitem%20in%20positions%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Akey%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Eitem%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtSprite%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Aoptions%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20position%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20set%3A%20%5Bitem.x%2C%20item.y%2C%20item.z%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtSpriteMaterial%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Aparams%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20color%3A%20Math.random()%20*%200xffffff%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20rotation%3A%20Math.random()%20*%20Math.PI%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20opacity%3A%20Math.random()%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtTextureLoader%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Aoptions%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20colorSpace%3A%20SRGBColorSpace%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Aurl%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3EbaseUrl%20%2B%20'textures%2Fraindrop.png'%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Atype%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E'%3C%2Fspan%3Emap'%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3EFtSpriteMaterial%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3EFtSprite%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3EFtOrbitControls%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3EFtWebglRenderer%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3EFtScene%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Ediv%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Escript%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Esetup%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Elang%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Ets%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20script%22%3E%3Cspan%20class%3D%22token%20language-javascript%22%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20reactive%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20ref%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Efrom%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'vue'%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20SRGBColorSpace%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%20type%20Vector3%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Efrom%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'three'%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20FtOrbitControls%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20FtPerspectiveCamera%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20FtScene%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20FtSprite%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20FtSpriteMaterial%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20FtTextureLoader%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20FtWebglRenderer%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Efrom%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'%40farst-three%2Fcomponents'%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20domRef%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20ref%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3EHTMLDivElement%3Cspan%20class%3D%22token%20operator%22%3E%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20baseUrl%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3Emeta%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3Eenv%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3E%3Cspan%20class%3D%22token%20constant%22%3EVITE_BASE_URL%3C%2Fspan%3E%0A%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20literal-property%20property%22%3Epositions%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20literal-property%20property%22%3Ex%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20number%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%20y%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20number%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%20z%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20number%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%5B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%5D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%5B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%5D%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Efor%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20keyword%22%3Elet%3C%2Fspan%3E%20x%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3E%3Cspan%20class%3D%22token%20number%22%3E10%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%20x%20%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E10%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%20x%3Cspan%20class%3D%22token%20operator%22%3E%2B%2B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20keyword%22%3Efor%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20keyword%22%3Elet%3C%2Fspan%3E%20y%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E-%3C%2Fspan%3E%3Cspan%20class%3D%22token%20number%22%3E10%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%20y%20%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E10%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%20y%3Cspan%20class%3D%22token%20operator%22%3E%2B%2B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20%20%20positions%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3E%3Cspan%20class%3D%22token%20function%22%3Epush%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20%20%20%20%20%3Cspan%20class%3D%22token%20literal-property%20property%22%3Ex%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20x%20%3Cspan%20class%3D%22token%20operator%22%3E*%3C%2Fspan%3E%20Math%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3E%3Cspan%20class%3D%22token%20function%22%3Erandom%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20%20%20%20%20%3Cspan%20class%3D%22token%20literal-property%20property%22%3Ey%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20y%20%3Cspan%20class%3D%22token%20operator%22%3E*%3C%2Fspan%3E%20Math%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3E%3Cspan%20class%3D%22token%20function%22%3Erandom%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20%20%20%20%20%3Cspan%20class%3D%22token%20literal-property%20property%22%3Ez%3C%2Fspan%3E%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3E%20Math%3Cspan%20class%3D%22token%20punctuation%22%3E.%3C%2Fspan%3E%3Cspan%20class%3D%22token%20function%22%3Erandom%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E*%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E10%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%2C%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%0A%0A%3Cspan%20class%3D%22token%20keyword%22%3Econst%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20function-variable%20function%22%3EanimationFn%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20comment%22%3E%2F%2F%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%0A%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Escript%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Estyle%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Elang%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Escss%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Escoped%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20style%22%3E%3Cspan%20class%3D%22token%20language-css%22%3E%0A%3Cspan%20class%3D%22token%20selector%22%3E.farst-three%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20property%22%3Eheight%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3A%3C%2Fspan%3E%20700px%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20property%22%3Ewidth%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3A%3C%2Fspan%3E%20100%25%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20property%22%3Eposition%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3A%3C%2Fspan%3E%20relative%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%0A%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Estyle%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3C%2Fcode%3E%3C%2Fpre%3E",path:"sprite/basic","raw-source":"%3Ctemplate%3E%0A%20%20%3Cdiv%20ref%3D%22domRef%22%20class%3D%22farst-three%22%3E%0A%20%20%20%20%3CFtScene%3E%0A%20%20%20%20%20%20%3CFtPerspectiveCamera%0A%20%20%20%20%20%20%20%20%3Afov%3D%2275%22%0A%20%20%20%20%20%20%20%20%3Anear%3D%220.01%22%0A%20%20%20%20%20%20%20%20%3Afar%3D%22100%22%0A%20%20%20%20%20%20%20%20%3Aoptions%3D%22%7B%0A%20%20%20%20%20%20%20%20%20%20position%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20set%3A%20%5B0.1%2C%204%2C%207%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%22%0A%20%20%20%20%20%20%2F%3E%0A%20%20%20%20%20%20%3CFtWebglRenderer%0A%20%20%20%20%20%20%20%20%3Aparams%3D%22%7B%20antialias%3A%20true%20%7D%22%0A%20%20%20%20%20%20%20%20%3Aanimation-fn%3D%22animationFn%22%0A%20%20%20%20%20%20%20%20%3Aoptions%3D%22%7B%0A%20%20%20%20%20%20%20%20%20%20shadowMap%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20enabled%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%22%0A%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%3Ctemplate%20v-for%3D%22item%20in%20positions%22%20%3Akey%3D%22item%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3CFtSprite%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Aoptions%3D%22%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20position%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20set%3A%20%5Bitem.x%2C%20item.y%2C%20item.z%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%22%0A%20%20%20%20%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CFtSpriteMaterial%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Aparams%3D%22%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20color%3A%20Math.random()%20*%200xffffff%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20rotation%3A%20Math.random()%20*%20Math.PI%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20opacity%3A%20Math.random()%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CFtTextureLoader%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Aoptions%3D%22%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20colorSpace%3A%20SRGBColorSpace%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Aurl%3D%22baseUrl%20%2B%20'textures%2Fraindrop.png'%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Atype%3D%22'map'%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FFtSpriteMaterial%3E%0A%20%20%20%20%20%20%20%20%20%20%3C%2FFtSprite%3E%0A%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0A%20%20%20%20%20%20%20%20%3CFtOrbitControls%20%2F%3E%0A%20%20%20%20%20%20%3C%2FFtWebglRenderer%3E%0A%20%20%20%20%3C%2FFtScene%3E%0A%20%20%3C%2Fdiv%3E%0A%3C%2Ftemplate%3E%0A%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aimport%20%7B%20reactive%2C%20ref%20%7D%20from%20'vue'%0Aimport%20%7B%20SRGBColorSpace%2C%20type%20Vector3%20%7D%20from%20'three'%0Aimport%20%7B%0A%20%20FtOrbitControls%2C%0A%20%20FtPerspectiveCamera%2C%0A%20%20FtScene%2C%0A%20%20FtSprite%2C%0A%20%20FtSpriteMaterial%2C%0A%20%20FtTextureLoader%2C%0A%20%20FtWebglRenderer%2C%0A%7D%20from%20'%40farst-three%2Fcomponents'%0Aconst%20domRef%20%3D%20ref%3CHTMLDivElement%3E()%0Aconst%20baseUrl%20%3D%20import.meta.env.VITE_BASE_URL%0A%0Aconst%20positions%3A%20%7B%20x%3A%20number%3B%20y%3A%20number%3B%20z%3A%20number%20%7D%5B%5D%20%3D%20%5B%5D%0Afor%20(let%20x%20%3D%20-10%3B%20x%20%3C%2010%3B%20x%2B%2B)%20%7B%0A%20%20for%20(let%20y%20%3D%20-10%3B%20y%20%3C%2010%3B%20y%2B%2B)%20%7B%0A%20%20%20%20positions.push(%7B%0A%20%20%20%20%20%20x%3A%20x%20*%20Math.random()%2C%0A%20%20%20%20%20%20y%3A%20y%20*%20Math.random()%2C%0A%20%20%20%20%20%20z%3A%20Math.random()%20*%2010%2C%0A%20%20%20%20%7D)%0A%20%20%7D%0A%7D%0A%0Aconst%20animationFn%20%3D%20()%20%3D%3E%20%7B%0A%20%20%2F%2F%0A%7D%0A%3C%2Fscript%3E%0A%0A%3Cstyle%20lang%3D%22scss%22%20scoped%3E%0A.farst-three%20%7B%0A%20%20height%3A%20700px%3B%0A%20%20width%3A%20100%25%3B%0A%20%20position%3A%20relative%3B%0A%7D%0A%3C%2Fstyle%3E%0A",description:"",rawTabsSource:"%7B%7D",tabs:[]},{default:u(()=>[k2]),_:1},8,["demos"]),d2,A2,a("div",m2,[a("table",null,[h2,a("tbody",null,[a("tr",null,[_2,f2,a("td",null,[e(s,{type:"SpriteMaterial",details:""})]),B2,v2]),a("tr",null,[b2,g2,a("td",null,[e(s,{type:"HemisphereLightOptions",details:""})]),y2,S2])])])]),x2,a("div",M2,[a("table",null,[w2,a("tbody",null,[a("tr",null,[P2,T2,a("td",null,[e(s,{type:"Function",details:"(e: SpriteLoadEvent) => void"})])])])])]),j2,a("div",R2,[a("table",null,[q2,a("tbody",null,[a("tr",null,[I2,O2,a("td",null,[e(s,{type:"Sprite",details:""})])]),a("tr",null,[z2,L2,a("td",null,[e(s,{type:"CountService<Material>",details:""})])])])])]),N2,a("p",null,[a("a",U2,[C("\u6587\u6863"),e(t,{class:"link-icon"})])])])}}});export{H2 as __pageData,J2 as default};
