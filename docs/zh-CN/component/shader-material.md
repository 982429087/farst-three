---
title: ShaderMaterial
lang: zh-CN
---

# ShaderMaterial




## 基础用法

:::demo

shader-material/basic

:::

## 自定义雾化和着色

:::demo

shader-material/star-tunnel

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

