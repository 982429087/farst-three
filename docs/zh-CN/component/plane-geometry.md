---
title: PlaneGeometry
lang: zh-CN
---

# PlaneGeometry

[平面几何体](https://threejs.org/docs/index.html?q=plane#api/zh/geometries/PlaneGeometry)一个用于生成平面几何体的类。
## 基础用法

:::demo

plane-geometry/basic

:::

## API

### Attributes

| Name             | Description  | Type                    | Default     | Required |
| ---------------- | ------------ | ----------------------- | ----------- | -------- |
| `width`          | 构造函数参数 | ^[number]               | `undefined` | No       |
| `height`         | 构造函数参数 | ^[number]               | `undefined` | No       |
| `widthSegments`  | 构造函数参数 | ^[number]               | `undefined` | No       |
| `heightSegments` | 构造函数参数 | ^[number]               | `undefined` | No       |
| `options`        | 实例属性     | ^[PlaneGeometryOptions] | `{}`        | No       |


### Events

| Name   | Description        | Type                                             |
| ------ | ------------------ | ------------------------------------------------ |
| `load` | 实例创建后触发方法 | ^[Function]`(e: PlaneGeometryLoadEvent) => void` |

### Provide

| Key                    | Description       | Type             |
| ---------------------- | ----------------- | ---------------- |
| `geometryInjectionKey` | webGLRenderer实例 | ^[PlaneGeometry] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |
