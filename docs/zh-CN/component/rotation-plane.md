---
title: RotationPlane
lang: zh-CN
---

# RotationPlane

贴图 + 动画函数中改变 z 轴位置实现旋转

<img src="/geo/rotating-aperture.png" style="width: 50%;height: 50%;background-color: #000" />
<img src="/geo/rotating-point2.png" style="width: 50%;height: 50%;background-color: #000" />


## 基础用法

:::demo

rotation-plane/basic

:::

## API

### Attributes

| Name          | Description  | Type                      | Default     | Required |
| ------------- | ------------ | ------------------------- | ----------- | -------- |
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

