import{A as d,B as p,d as m,af as u,E as l,z as h,H as g,ag as c,J as b}from"../app.e23ab445.js";import{j as y,b as f,d as x}from"./index.4766a5d6.js";const B=d({width:Number,height:Number,depth:Number,widthSegments:Number,heightSegments:Number,depthSegments:Number,options:{type:p(Object),default:()=>({})}}),S={load:s=>s},_=m({name:"FtBoxGeometry"}),w=m({..._,props:B,emits:S,setup(s,{emit:r}){const e=s,i=r;let o=y(),n=f(),t=new u(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments);return o.geometry=t,o.geometry.computeBoundingBox(),i("load",{geometry:t,obj3d:o,scene:n}),l(c,t),x(e.options,t,n),h(()=>{t.dispose(),t=null,o=null,n=null}),(a,N)=>g(a.$slots,"default")}});var G=w;const O=b(G);export{O as F};
