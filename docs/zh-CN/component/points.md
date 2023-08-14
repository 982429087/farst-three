---
title: Points
lang: zh-CN
---

# Points

[点](https://threejs.org/docs/index.html?q=points#api/zh/objects/Points)一个用于显示点的类。 由WebGLRenderer渲染的点使用 gl.POINTS。



<!-- ## 基础用法

:::demo

points/basic

:::

## 点阵几何体

:::demo

points/point-material

::: -->

## 点阵波纹

:::demo

points/lattice-ripple

:::

## API

### Attributes

| Name       | Description  | Type                                      | Default     | Required |
| ---------- | ------------ | ----------------------------------------- | ----------- | -------- |
| `geometry` | 构造函数参数 | ^[BufferGeometry<NormalBufferAttributes>] | `undefined` | No       |
| `material` | 构造函数参数 | ^[Material]                               | `undefined` | No       |
| `options`  | 实例属性     | ^[PointsOptions]                          | `{}`        | No       |

### Events

| Name   | Description        | Type                                      |
| ------ | ------------------ | ----------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: PointsLoadEvent) => void` |

### Provide

| Key                           | Description | Type                      |
| ----------------------------- | ----------- | ------------------------- |
| `object3dInjectionKey`        | Points实例  | ^[Points]                 |
| `materialServiceInjectionKey` | Points实例  | ^[CountService<Material>] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

