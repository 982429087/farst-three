---
title: Sprite
lang: zh-CN
---

# Sprite
创建粒子系统的方法

1. Sprite SpriteMaterial (简单)
2. Points PointsMaterial (相对容易，性能比较高)
3. Points PointsMaterial Shader (实现复杂，性能最好)


[精灵](https://threejs.org/docs/index.html?q=spr#api/zh/objects/Sprite)精灵是一个总是面朝着摄像机的平面，通常含有使用一个半透明的纹理。
精灵不会投射任何阴影，即使设置了
castShadow = true也将不会有任何效果。

:::tip

152 版本后开启全新的色彩空间管理

:::

## 基础用法

:::demo

sprite/basic

:::

## API

### Attributes

| Name       | Description  | Type                      | Default     | Required |
| ---------- | ------------ | ------------------------- | ----------- | -------- |
| `material` | 构造函数参数 | ^[SpriteMaterial]         | `undefined` | No       |
| `options`  | 实例属性     | ^[HemisphereLightOptions] | `{}`        | No       |

### Events

| Name   | Description        | Type                                      |
| ------ | ------------------ | ----------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: SpriteLoadEvent) => void` |

### Provide

| Key                           | Description          | Type                      |
| ----------------------------- | -------------------- | ------------------------- |
| `object3dInjectionKey`        | Sprite实例           | ^[Sprite]                 |
| `materialServiceInjectionKey` | 记录material数量的类 | ^[CountService<Material>] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

