---
title: PointLight
lang: zh-CN
---

# PointLight

[点光源](https://threejs.org/docs/index.html?q=point#api/zh/lights/PointLight)从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光。

该光源可以投射阴影 - 跳转至 PointLightShadow 查看更多细节。


## 基础用法

:::demo

point-light/basic

:::

## API

### Attributes

| Name        | Description  | Type                   | Default     | Required |
| ----------- | ------------ | ---------------------- | ----------- | -------- |
| `color`     | 构造函数参数 | ^[ColorRepresentation] | `undefined` | No       |
| `intensity` | 构造函数参数 | ^[Number]              | `undefined` | No       |
| `distance`  | 构造函数参数 | ^[Number]              | `undefined` | No       |
| `decay`     | 构造函数参数 | ^[Number]              | `undefined` | No       |
| `options`   | 实例属性     | ^[PointLightOptions]   | `{}`        | No       |

### Events

| Name   | Description        | Type                                          |
| ------ | ------------------ | --------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: PointLightLoadEvent) => void` |

### Provide

| Key                      | Description    | Type          |
| ------------------------ | -------------- | ------------- |
| `pointLightInjectionKey` | PointLight实例 | ^[PointLight] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

