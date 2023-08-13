---
title: FogExp2
lang: zh-CN
---

# FogExp2

[雾-指数](https://threejs.org/docs/index.html?q=fog#api/zh/scenes/FogExp2)该类所包含的参数定义了指数雾，它可以在相机附近提供清晰的视野，且距离相机越远，雾的浓度随着指数增长越快。



## 基础用法
FogExρ2指数雾，在相机附近提供清晰的视野，且距离相机越远，雾的浓度随着指数增长越快
:::demo

fog-exp2/basic

:::

## API

### Attributes

| Name      | Description  | Type                      | Default     | Required |
| --------- | ------------ | ------------------------- | ----------- | -------- |
| `color`   | 构造函数参数 | ^[ColorRepresentation]    | `undefined` | No       |
| `density` | 构造函数参数 | ^[Number]                 | `undefined` | No       |
| `options` | 实例属性     | ^[HemisphereLightOptions] | `{}`        | No       |

### Events

| Name   | Description        | Type                                               |
| ------ | ------------------ | -------------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: FogExp2LoadEvent) => void` |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

