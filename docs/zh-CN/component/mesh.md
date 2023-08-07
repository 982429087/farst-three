---
title: Mesh
lang: zh-CN
---

# Mesh

[网格](https://threejs.org/docs/index.html#api/zh/objects/Mesh)表示基于以三角形为polygon mesh（多边形网格）的物体的类。 同时也作为其他类的基类，例如SkinnedMesh。

## 基础用法

:::demo

mesh/basic

:::

## API

### Attributes

| Name      | Description | Type           | Default | Required |
| --------- | ----------- | -------------- | ------- | -------- |
| `options` | 实例属性    | ^[MeshOptions] | `{}`    | No       |

### Events

| Name   | Description        | Type                                    |
| ------ | ------------------ | --------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: MeshLoadEvent) => void` |

### Provide

| Key                           | Description          | Type                      |
| ----------------------------- | -------------------- | ------------------------- |
| `object3dInjectionKey`        | Mesh实例             | ^[Mesh]                   |
| `materialServiceInjectionKey` | 处理material的类实例 | ^[CountService<Material>] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

