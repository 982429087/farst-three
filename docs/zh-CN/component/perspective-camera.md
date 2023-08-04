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


## API

### Attributes

| Name             | Description           | Type                         | Default     | Required |
| ---------------- | --------------------- | ---------------------------- | ----------- | -------- |
| `left`           | 构造函数参数          | ^[number]                    | `undefined` | No       |
| `right`          | 构造函数参数          | ^[number]                    | `undefined` | No       |
| `top`            | 构造函数参数          | ^[number]                    | `undefined` | No       |
| `bottom`         | 构造函数参数          | ^[number]                    | `undefined` | No       |
| `near`           | 构造函数参数          | ^[number]                    | `undefined` | No       |
| `far`            | 构造函数参数          | ^[number]                    | `undefined` | No       |
| `isRenderCamera` | 是否为主渲染相机      | ^[boolean]                   | `true`      | No       |
| `autoAddToScene` | 是否主动添加到scene上 | ^[boolean]                   | `true`      | No       |
| `options`        | 实例属性              | ^[OrthographicCameraOptions] | `{}`        | No       |


### Events

| Name   | Description        | Type                                                  |
| ------ | ------------------ | ----------------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: OrthographicCameraLoadEvent) => void` |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |
