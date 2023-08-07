---
title: MeshLambertMaterial
lang: zh-CN
---

# MeshLambertMaterial

[Lambert网格材质](https://threejs.org/docs/index.html#api/zh/materials/MeshLambertMaterial)

一种非光泽表面的材质，没有镜面高光。

该材质使用基于非物理的Lambertian模型来计算反射率。 这可以很好地模拟一些表面（例如未经处理的木材或石材），但不能模拟具有镜面高光的光泽表面（例如涂漆木材）。 MeshLambertMaterial uses per-fragment shading。

由于反射率和光照模型的简单性，MeshPhongMaterial，MeshStandardMaterial或者MeshPhysicalMaterial 上使用这种材质时会以一些图形精度为代价，得到更高的性能。

## 基础用法
只有感光材质才对光照有反应
可以很好地模拟某些表面（例如未经处理的木材或石材），但不能模拟具有镜面高光的光泽表面（例如涂漆木材）
光照强度，颜色等都会与材质发生反应
:::demo

mesh-lambert-material/basic

:::

## API

### Attributes

| Name      | Description  | Type                             | Default     | Required |
| --------- | ------------ | -------------------------------- | ----------- | -------- |
| `params`  | 构造函数参数 | ^[MeshLambertMaterialParameters] | `undefined` | No       |
| `options` | 实例属性     | ^[MeshLambertMaterialOptions]    | `{}`        | No       |

### Events

| Name   | Description        | Type                                               |
| ------ | ------------------ | -------------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: HemisphereLightLoadEvent) => void` |

### Provide

| Key                 | Description | Type                   |
| ------------------- | ----------- | ---------------------- |
| `materialInjectKey` | 材质实例    | ^[MeshLambertMaterial] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

