---
title: SpotLight
lang: zh-CN
---

# SpotLight

[聚光灯](https://threejs.org/docs/index.html?q=spo#api/zh/lights/SpotLight)光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大。

该光源可以投射阴影 - 跳转至 SpotLightShadow 查看更多细节。

## 基础用法

阴影属性：

castShadow:是否产生阴影，默认为false

receiveShadow:是否接收阴影，默认为false

bias:阴影偏移量，默认为0，非常小的调整（大约0.0001）可能有助于减少阴影中的伪影

mapSize:阴影贴图大小，默认为512，必须是2的幂，宽度和高度不必相同

radius:阴影模糊半径，默认为1，值越大，阴影越模糊，较高的值会在阴影中产生不必要的条带效果

target:.阴影的目标，默认为nul,如果设置了，阴影会围绕目标产生

camera:用于计算阴影的相机，默认为SpotLight.shadow.camera,
SpotLight这里是透视相机

·near:阴影相机的近裁剪面，决定了阴影的细节程度

.far:阴影相机的远裁剪面，决定了阴影的覆盖范围

·fov:此处无效，会被自动设置为90度
:::demo

spot-light/basic

:::

## API

### Attributes

| Name        | Description  | Type                   | Default     | Required |
| ----------- | ------------ | ---------------------- | ----------- | -------- |
| `color`     | 构造函数参数 | ^[ColorRepresentation] | `undefined` | No       |
| `intensity` | 构造函数参数 | ^[number]              | `undefined` | No       |
| `distance`  | 构造函数参数 | ^[number]              | `undefined` | No       |
| `angle`     | 构造函数参数 | ^[number]              | `undefined` | No       |
| `penumbra`  | 构造函数参数 | ^[number]              | `undefined` | No       |
| `decay`     | 构造函数参数 | ^[number]              | `undefined` | No       |
| `options`   | 实例属性     | ^[SpotLightOptions]    | `{}`        | No       |

### Events

| Name   | Description        | Type                                         |
| ------ | ------------------ | -------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: SpotLightLoadEvent) => void` |

### Provide

| Key                     | Description   | Type          |
| ----------------------- | ------------- | ------------- |
| `spotLightInjectionKey` | SpotLight实例 | ^[ SpotLight] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

