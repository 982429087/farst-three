---
title: MeshDepthMaterial
lang: zh-CN
---

# MeshDepthMaterial

[深度网格材质](https://threejs.org/docs/index.html#api/zh/materials/MeshDepthMaterial)一种按深度绘制几何体的材质。深度基于相机远近平面。白色最近，黑色最远。


## 基础用法
按深度绘制几何体的材质。深度基于相机远近平面。可以用于观测几何体与相机的距离几何体 **接近相机就是白色，远离则是黑色** 。
对光照没有反应，适合被用来创建雾中的场景。

控制相机的near属性来控制内容的可见性。
:::demo

mesh-depth-material/basic

:::

## API

### Attributes

| Name      | Description  | Type                           | Default     | Required |
| --------- | ------------ | ------------------------------ | ----------- | -------- |
| `params`  | 构造函数参数 | ^[MeshDepthMaterialParameters] | `undefined` | No       |
| `options` | 实例属性     | ^[MeshDepthMaterialOptions]    | `{}`        | No       |

### Events

| Name   | Description        | Type                                                 |
| ------ | ------------------ | ---------------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: MeshDepthMaterialLoadEvent) => void` |

### Provide

| Key                 | Description | Type                 |
| ------------------- | ----------- | -------------------- |
| `materialInjectKey` | 材质实例    | ^[MeshDepthMaterial] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

