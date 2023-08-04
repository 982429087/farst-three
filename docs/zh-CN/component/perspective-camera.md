---
title: PerspectiveCamera
lang: zh-CN
---

# PerspectiveCamera

[透视相机](https://threejs.org/docs/index.html?q=camera#api/zh/cameras/PerspectiveCamera)这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
## 基础用法

:::demo

perspective-camera/basic

:::

## 相机漫游

:::demo

perspective-camera/camera-roam

:::

## API

### Attributes

| Name             | Description      | Type                        | Default     | Required |
| ---------------- | ---------------- | --------------------------- | ----------- | -------- |
| `fov`            | 构造函数参数     | ^[number]                   | `undefined` | No       |
| `aspect`         | 构造函数参数     | ^[number]                   | `undefined` | No       |
| `near`           | 构造函数参数     | ^[number]                   | `undefined` | No       |
| `far`            | 构造函数参数     | ^[number]                   | `undefined` | No       |
| `isRenderCamera` | 是否为主渲染相机 | ^[boolean]                  | `true`      | No       |
| `options`        | 实例属性         | ^[PerspectiveCameraOptions] | `{}`        | No       |


### Events

| Name   | Description        | Type                                                 |
| ------ | ------------------ | ---------------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: PerspectiveCameraLoadEvent) => void` |

### Provide

| Key                             | Description       | Type                 |
| ------------------------------- | ----------------- | -------------------- |
| `perspectiveCameraInjectionKey` | webGLRenderer实例 | ^[PerspectiveCamera] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |
