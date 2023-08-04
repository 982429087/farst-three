---
title: Group
lang: zh-CN
---

# Group

[组](https://threejs.org/docs/index.html?q=group#api/zh/objects/Group)它几乎和Object3D是相同的，其目的是使得组中对象在语法上的结构更加清晰。

## 基础用法
使用组可以组合集合体，统一控制
:::demo

group/basic

:::

## API

### Attributes

| Name      | Description | Type            | Default | Required |
| --------- | ----------- | --------------- | ------- | -------- |
| `options` | 实例属性    | ^[GroupOptions] | `{}`    | No       |


### Events

| Name   | Description        | Type                                     |
| ------ | ------------------ | ---------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: GroupLoadEvent) => void` |

### Provide

| Key                 | Description | Type     |
| ------------------- | ----------- | -------- |
| `groupInjectionKey` | Group实例   | ^[Group] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |
