---
title: Scene
lang: zh-CN
---

# Scene

场景能够让你在什么地方、摆放什么东西来交给three.js来渲染，这是你放置物体、灯光和摄像机的地方。
## 基础用法

:::demo

scene/basic

:::


## Scene API

### Attributes

| Name      | Description                                                                                | Type            | Default | Required |
| --------- | ------------------------------------------------------------------------------------------ | --------------- | ------- | -------- |
| `options` | [Scene](https://threejs.org/docs/index.html?q=scene#api/zh/scenes/Scene)实例上的属性和方法 | ^[SceneOptions] | `{}`    | No       |


### Events

| Name   | Description             | Type                                     |
| ------ | ----------------------- | ---------------------------------------- |
| `load` | scene实例创建后触发方法 | ^[Function]`(e: SceneLoadEvent) => void` |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |
