---
title: MeshMatcapMaterial
lang: zh-CN
---

# MeshMatcapMaterial

[MeshMatcapMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshMatcapMaterial)MeshMatcapMaterial 由一个材质捕捉（MatCap，或光照球（Lit Sphere））纹理所定义，其编码了材质的颜色与明暗。

由于mapcap图像文件编码了烘焙过的光照，因此MeshMatcapMaterial 不对灯光作出反应。 它将会投射阴影到一个接受阴影的物体上(and shadow clipping works)，但不会产生自身阴影或是接受阴影。



## 基础用法
在场景没有光源的情况下，模拟出物体被光照的效果（该纹理是将光源，材质信息直接在建模软件中烘焙到纹理图片上，渲染时不需要做额外的计算，性能提升明显）
MeshMatcapMaterial没有aoMap属性，但有matcap属性
不对灯光作出反应。它将会投射阴影到接受阴影的物体上(and shadow clipping works),但不会产生自身阴影或是接受阴影
:::demo

mesh-matcap-material/basic

:::

## API

### Attributes

| Name      | Description  | Type                            | Default     | Required |
| --------- | ------------ | ------------------------------- | ----------- | -------- |
| `params`  | 构造函数参数 | ^[MeshMatcapMaterialParameters] | `undefined` | No       |
| `options` | 实例属性     | ^[MeshMatcapMaterialOptions]    | `{}`        | No       |

### Events

| Name   | Description        | Type                                                  |
| ------ | ------------------ | ----------------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: MeshMatcapMaterialLoadEvent) => void` |

### Provide

| Key                 | Description | Type                  |
| ------------------- | ----------- | --------------------- |
| `materialInjectKey` | 材料实例    | ^[MeshMatcapMaterial] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

