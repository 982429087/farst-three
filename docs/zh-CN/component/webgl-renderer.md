---
title: Scene
lang: zh-CN
---

# Scene

场景能够让你在什么地方、摆放什么东西来交给three.js来渲染，这是你放置物体、灯光和摄像机的地方。
## 基础用法

默认情况下，词缀固定在页面的顶部。

:::demo 你可以设置`offset`属性来改变偏移顶部，默认值为0。

scene/basic

:::


## Scene API

### Affix Attributes

| Name      | Description             | Type            | Default | Required |
| --------- | ----------------------- | --------------- | ------- | -------- |
| `options` | Scene实例上的属性和方法 | ^[SceneOptions] | `{}`    | No       |


### Affix Events

| Name   | Description             | Type                                     |
| ------ | ----------------------- | ---------------------------------------- |
| `load` | scene实例创建后触发方法 | ^[Function]`(e: SceneLoadEvent) => void` |

### Affix Exposes

| Method       | Description                 | Type                    |
| ------------ | --------------------------- | ----------------------- |
| `update`     | update affix state manually | ^[Function]`() => void` |
| `updateRoot` | update rootRect info        | ^[Function]`() => void` |

### Affix Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |
