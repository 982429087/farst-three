---
title: MeshBasicMaterial
lang: zh-CN
---

# MeshBasicMaterial

[基础网格材质](https://threejs.org/docs/index.html#api/zh/materials/MeshBasicMaterial)一个以简单着色（平面或线框）方式来绘制几何体的材质。

这种材质不受光照的影响。


## 基础用法

:::demo

mesh-basic-material/basic

:::

## API

### Attributes

| Name      | Description  | Type                           | Default     | Required |
| --------- | ------------ | ------------------------------ | ----------- | -------- |
| `params`  | 构造函数参数 | ^[MeshBasicMaterialParameters] | `undefined` | No       |
| `options` | 实例属性     | ^[MeshBasicMaterialOptions]    | `{}`        | No       |

### Events

| Name   | Description        | Type                                                 |
| ------ | ------------------ | ---------------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: MeshBasicMaterialLoadEvent) => void` |

### Provide

| Key                 | Description         | Type               |
| ------------------- | ------------------- | ------------------ |
| `materialInjectKey` | HemisphereLight实例 | ^[MeshBasicMaterial] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

