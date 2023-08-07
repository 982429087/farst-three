---
title: HemisphereLight
lang: zh-CN
---

# HemisphereLight

[半球光](https://threejs.org/docs/index.html#api/zh/lights/HemisphereLight)光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。

半球光不能投射阴影。

## 基础用法
会将天空和地面反射的光照都计算在内，产生柔和、平衡的环境光照。无法产生阴影
:::demo

hemisphere-light/basic

:::

## API

### Attributes

| Name          | Description  | Type                      | Default     | Required |
| ------------- | ------------ | ------------------------- | ----------- | -------- |
| `skyColor`    | 构造函数参数 | ^[ColorRepresentation]    | `undefined` | No       |
| `groundColor` | 构造函数参数 | ^[ColorRepresentation]    | `undefined` | No       |
| `intensity`   | 构造函数参数 | ^[number]                 | `undefined` | No       |
| `options`     | 实例属性     | ^[HemisphereLightOptions] | `{}`        | No       |


### Events

| Name   | Description        | Type                                               |
| ------ | ------------------ | -------------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: HemisphereLightLoadEvent) => void` |

### Provide

| Key                           | Description         | Type               |
| ----------------------------- | ------------------- | ------------------ |
| `hemisphereLightInjectionKey` | HemisphereLight实例 | ^[HemisphereLight] |


### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |
