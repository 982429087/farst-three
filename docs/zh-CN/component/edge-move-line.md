---
title: EdgeMoveLine
lang: zh-CN
---

# EdgeMoveLine



## 基础用法

:::demo

edge-move-line/basic

:::

## API

### Attributes

| Name      | Description | Type                           | Default     | Required |
| --------- | ----------- | ------------------------------ | ----------- | -------- |
| `options` | 实例属性    | ^[EdgeMoveLineOptions]         | `{}`        | No       |
| `geojson` | geojson数据 | ^[FeatureCollection<Geometry>] | `undefined` | true     |

### Events

| Name   | Description        | Type                                            |
| ------ | ------------------ | ----------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: EdgeMoveLineLoadEvent) => void` |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

