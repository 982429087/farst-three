---
title: Line
lang: zh-CN
---

# Line

[线](https://threejs.org/docs/index.html#api/zh/objects/Line)
一条连续的线。

它几乎和LineSegments是一样的，唯一的区别是它在渲染时使用的是gl.LINE_STRIP， 而不是gl.LINES。


## 基础用法

:::demo

line/basic

:::

## API

### Attributes

| Name       | Description  | Type                                      | Default     | Required |
| ---------- | ------------ | ----------------------------------------- | ----------- | -------- |
| `geometry` | 构造函数参数 | ^[BufferGeometry<NormalBufferAttributes>] | `undefined` | No       |
| `material` | 构造函数参数 | ^[Material]                               | `undefined` | No       |
| `options`  | 实例属性     | ^[LineOptions]                            | `{}`        | No       |

### Events

| Name   | Description        | Type                                    |
| ------ | ------------------ | --------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: LineLoadEvent) => void` |

### Provide

| Key                           | Description          | Type                      |
| ----------------------------- | -------------------- | ------------------------- |
| `object3dInjectionKey`        | Mesh实例             | ^[Line]                   |
| `materialServiceInjectionKey` | 处理material的类实例 | ^[CountService<Material>] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

