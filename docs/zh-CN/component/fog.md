---
title: Fog
lang: zh-CN
---

# Fog

[雾](https://threejs.org/docs/index.html?q=fog#api/en/scenes/Fog)

这个类中的参数定义了线性雾。也就是说，雾的密度是随着距离线性增大的。

## 基础用法
雾的颜色和场景背景色相同效果更好

雾的密度是从Fog near的位置开始计算的，而不是相机，可以用来控制影响的区域范围

没有enabled开关，可以将near与far设置很大的值来实现

环境光等光源会影响雾的渲染效果，可以用来模拟白天和晚上

物体材质有个fog属性，可以控制是否受到雾的影响，默认为tru,适用场景如在房间内设置没有雾，那么房间内的物体就要设置为false

结合动画可以让雾"动起来"
:::demo

fog/basic

:::

## API

### Attributes

| Name      | Description  | Type                   | Default     | Required |
| --------- | ------------ | ---------------------- | ----------- | -------- |
| `color`   | 构造函数参数 | ^[ColorRepresentation] | `undefined` | No       |
| `near`    | 构造函数参数 | ^[NUmber]              | `undefined` | No       |
| `far`     | 构造函数参数 | ^[NUmber]              | `undefined` | No       |
| `options` | 实例属性     | ^[FogOptions]          | `{}`        | No       |

### Events

| Name   | Description        | Type                                               |
| ------ | ------------------ | -------------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: FogLoadEvent) => void` |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

