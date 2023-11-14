---
title: ReflectorPlane
lang: zh-CN
---

# ReflectorPlane

threejs 自带镜面反射类`Reflector`加上两张贴图实现的镜面反射效果

:::tip
闪烁问题可以通过修改每个平面的间距来解决，距离和相机的远近是有关系的
或者可以设置WebGLRenderer 的logarithmicDepthBuffer属性为true
:::


![floor-background](/geo/floor-background.png)

![floor-circle-point](/geo/floor-circle-point.png)

## 基础用法

:::demo

reflector-plane/basic

:::

## API

### Attributes

| Name          | Description  | Type                      | Default     | Required |
| ------------- | ------------ | ------------------------- | ----------- | -------- |
| `skyColor`    | 构造函数参数 | ^[ColorRepresentation]    | `undefined` | No       |
| `options`     | 实例属性     | ^[HemisphereLightOptions] | `{}`        | No       |

### Events

| Name   | Description        | Type                                               |
| ------ | ------------------ | -------------------------------------------------- |
| `load` | 实例创建后触发方法   | ^[Function]`(e: HemisphereLightLoadEvent) => void` |

### Provide

| Key                           | Description         | Type               |
| ----------------------------- | ------------------- | ------------------ |
| `hemisphereLightInjectionKey` | HemisphereLight实例 | ^[HemisphereLight] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

