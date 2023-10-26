---
title: NoisyPlane
lang: zh-CN
---

# NoisyPlane

## 基础用法

:::demo

noisy-plane/basic
>>>tabs
[noisy-plane/basic/f-dis,noisy-plane/basic/f-normal,noisy-plane/basic/v]
>>>
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

