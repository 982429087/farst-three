---
title: RectAreaLight
lang: zh-CN
---

# RectAreaLight

[平面光光源](https://threejs.org/docs/index.html?q=RectAreaLight#api/zh/lights/RectAreaLight)
平面光光源从一个矩形平面上均匀地发射光线。这种光源可以用来模拟像明亮的窗户或者条状灯光光源。

注意事项:

不支持阴影。
只支持 MeshStandardMaterial 和 MeshPhysicalMaterial 两种材质。
你必须在你的场景中加入 RectAreaLightUniformsLib，并调用 init()。


## 基础用法
从矩形平面上均匀地发射光线

不能产生阴影

只支特MeshStandardMaterial和MeshPhysicalMaterial两种材质。

必须在场景中加入RectAreaLightUniformsLib,并调用init()。
:::demo

rect-area-light/basic

:::

## API

### Attributes

| Name        | Description                       | Type                    | Default     | Required |
| ----------- | --------------------------------- | ----------------------- | ----------- | -------- |
| `color`     | 构造函数参数                      | ^[ColorRepresentation]  | `undefined` | No       |
| `intensity` | 构造函数参数                      | ^[Number]               | `undefined` | No       |
| `width`     | 构造函数参数                      | ^[Number]               | `undefined` | No       |
| `height`    | 构造函数参数                      | ^[Number]               | `undefined` | No       |
| `uniforms`  | 是否init RectAreaLightUniformsLib | ^[Boolean]              | `false`     | No       |
| `options`   | 实例属性                          | ^[RectAreaLightOptions] | `{}`        | No       |

### Events

| Name   | Description        | Type                                             |
| ------ | ------------------ | ------------------------------------------------ |
| `load` | 实例创建后触发方法 | ^[Function]`(e: RectAreaLightLoadEvent) => void` |

### Provide

| Key                         | Description       | Type               |
| --------------------------- | ----------------- | ------------------ |
| `rectAreaLightInjectionKey` | RectAreaLight实例 | ^[RectAreaLight] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

