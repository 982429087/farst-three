---
title: DirectionalLight
lang: zh-CN
---

# DirectionalLight

[平行光](https://threejs.org/docs/index.html#api/zh/lights/DirectionalLight)平行光是沿着特定方向发射的光。这种光的表现像是无限远，从它发出的光线都是平行的。常常用平行光来模拟太阳光的效果。 太阳足够远，因此我们可以认为太阳的位置是无限远，所以我们认为从太阳发出的光线也都是平行的。

## 基础用法
具有特定的方向。能够产生阴影。不能在物体表面。强度、颜色、位置、目标都能影响渲染效果。
:::demo

directional-light/basic

:::

## API

### Attributes

| Name        | Description  | Type                       | Default     | Required |
| ----------- | ------------ | -------------------------- | ----------- | -------- |
| `color`     | 构造函数参数 | ^[number]                  | `undefined` | No       |
| `intensity` | 构造函数参数 | ^[number]                  | `undefined` | No       |
| `options`   | 实例属性     | ^[DirectionalLightOptions] | `{}`        | No       |


### Events

| Name   | Description        | Type                                            |
| ------ | ------------------ | ----------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: AmbientLightLoadEvent) => void` |

### Provide

| Key                                  | Description          | Type                |
| ------------------------------------ | -------------------- | ------------------- |
| `directionalLightInjectionKey` | DirectionalLight实例 | ^[DirectionalLight] |


### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |
