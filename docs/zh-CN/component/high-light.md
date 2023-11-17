---
title: HighLight
lang: zh-CN
---

# HighLight

利用threejs 后期处理能力 `FXAAShader` 和 `UnrealBloomPass` 实现的辉光效果

:::tip
[背景透明问题](https://github.com/mrdoob/three.js/issues/14104)合并背景纹理和辉光纹理来解决

颜色变暗问题，通过调整renderer 的 toneMappingExposure 来解决
:::

## 基础用法

:::demo

high-light/basic

:::

## API

### Attributes

| Name      | Description | Type                | Default | Required |
| --------- | ----------- | ------------------- | ------- | -------- |
| `options` | 实例属性    | ^[HighLightOptions] | `{}`    | No       |

### Events

| Name   | Description        | Type                                         |
| ------ | ------------------ | -------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: HighLightLoadEvent) => void` |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

