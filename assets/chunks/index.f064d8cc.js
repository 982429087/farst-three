import{A as y,as as g,at as p,B as o,d as f,aB as b,aC as L,z as x,H as T,aw as S,J as _}from"../app.e23ab445.js";import{o as C,b as F,d as P}from"./index.4766a5d6.js";const E=y({urls:{type:o(Array),default:()=>[],required:!0},load:{type:o(Function),default:()=>()=>{}},progress:{type:o(Function),default:()=>()=>{}},error:{type:o(Function),default:()=>()=>{}},type:{type:o(String),default:"map"},options:{type:o(Object),default:()=>({})}}),v={load:r=>r,managerLoad:()=>!0,managerStart:(r,s,e)=>g(r)&&p(s)&&p(e),managerProgress:(r,s,e)=>g(r)&&p(s)&&p(e),managerError:r=>g(r)},w=f({name:"FtTextureLoader"}),A=f({...w,props:E,emits:v,setup(r,{emit:s}){const e=r,n=s;let u=C(),m=F(),a=new S,d=new b(a);d.setCrossOrigin("Anonymous"),L(e.urls)&&console.error("component `<cube-texture-loader />` props `url` is required");let l=d.load(e.urls,e.load,e.progress,e.error);return n("load",{cubeTextureLoader:d,material:u,scene:m,texture:l}),a.onStart=(t,i,c)=>{n("managerStart",t,i,c)},a.onLoad=()=>{n("managerLoad")},a.onProgress=(t,i,c)=>{n("managerProgress",t,i,c)},a.onError=t=>{n("managerError",t)},u&&(u[e.type]=l),P(e.options,l,m),x(()=>{u[e.type]=null,l.dispose(),u=null,m=null,a=null,l=null,d=null}),(t,i)=>T(t.$slots,"default")}});var B=A;const h=_(B);export{h as F};