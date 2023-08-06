---
title: AmbientLight
lang: zh-CN
---

# AmbientLight

[环境光](https://threejs.org/docs/index.html?q=amb#api/zh/lights/AmbientLight)环境光会均匀的照亮场景中的所有物体。

环境光不能用来投射阴影，因为它没有方向。

## 基础用法
均匀照亮场景中所有物体。可以指定环境光的颜色、透明度。无法产生阴影。
:::demo

ambient-light/basic

:::

## API

### Attributes

| Name        | Description  | Type                   | Default     | Required |
| ----------- | ------------ | ---------------------- | ----------- | -------- |
| `color`     | 构造函数参数 | ^[number]              | `undefined` | No       |
| `intensity` | 构造函数参数 | ^[number]              | `undefined` | No       |
| `options`   | 实例属性     | ^[AmbientLightOptions] | `{}`        | No       |


### Events

| Name   | Description        | Type                                           |
| ------ | ------------------ | ---------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: AmbientLightLoadEvent) => void` |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |
