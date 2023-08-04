---
title: BoxGeometry
lang: zh-CN
---

# BoxGeometry

[立方缓冲几何体](https://threejs.org/docs/index.html?q=box#api/zh/geometries/BoxGeometry)BoxGeometry是四边形的原始几何类，它通常使用构造函数所提供的“width”、“height”、“depth”参数来创建立方体或者不规则四边形。

## 基础用法

:::demo

box-geometry/basic

:::

## API

### Attributes

| Name             | Description  | Type                    | Default     | Required |
| ---------------- | ------------ | ----------------------- | ----------- | -------- |
| `width`          | 构造函数参数 | ^[number]               | `undefined` | No       |
| `height`         | 构造函数参数 | ^[number]               | `undefined` | No       |
| `depth`          | 构造函数参数 | ^[number]               | `undefined` | No       |
| `widthSegments`  | 构造函数参数 | ^[number]               | `undefined` | No       |
| `heightSegments` | 构造函数参数 | ^[number]               | `undefined` | No       |
| `depthSegments` | 构造函数参数 | ^[number]               | `undefined` | No       |
| `options`        | 实例属性     | ^[BoxGeometryOptions] | `{}`        | No       |


### Events

| Name   | Description        | Type                                             |
| ------ | ------------------ | ------------------------------------------------ |
| `load` | 实例创建后触发方法 | ^[Function]`(e: BoxGeometryLoadEvent) => void` |

### Provide

| Key                    | Description       | Type             |
| ---------------------- | ----------------- | ---------------- |
| `geometryInjectionKey` | webGLRenderer实例 | ^[BoxGeometry] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |
