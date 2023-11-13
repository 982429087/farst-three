---
title: DomMarker
lang: zh-CN
---

# DomMarker

主要使用 `CSS2DRenderer` 和 `CSS2DObject` 两个api

## 基础用法

:::demo

dom-marker/basic

:::

## API

### Attributes

| Name      | Description      | Type                  | Default | Required |
| --------- | ---------------- | --------------------- | ------- | -------- |
| `options` | 实例属性         | ^[CSS2DObjectOptions] | `{}`    | No       |
| `x`       | x坐标            | ^[number]             | `0`     | No       |
| `y`       | y坐标            | ^[number]             | `0`     | No       |
| `z`       | z坐标            | ^[number]             | `0`     | No       |
| `offsetX` | x偏移            | ^[number]             | `0`     | No       |
| `offsetY` | y偏移            | ^[number]             | `0`     | No       |
| `offsetZ` | z便宜            | ^[number]             | `0`     | No       |
| `xKey`    | 设置位置时的键值 | ^[string]             | `x`     | No       |
| `yKey`    | 设置位置时的键值 | ^[string]             | `y`     | No       |
| `zKey`    | 设置位置时的键值 | ^[string]             | `z`     | No       |

### Events

| Name   | Description        | Type                                         |
| ------ | ------------------ | -------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: DomMarkerLoadEvent) => void` |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

