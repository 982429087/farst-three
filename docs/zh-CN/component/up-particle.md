---
title: UpParticle
lang: zh-CN
---

# UpParticle

使用以下图片的1/9来做为贴图，在动画函数中调整贴图的offset来实现数字替换滚动。

改变mesh的position来实现上下移动。

![alt](/geo/up-particle.png)

:::tip
使用组件时需要自行将图片下载后放入项目中。并修改`options`中的`texture`属性。
比如贴图默认地址为/geo/up-particle.png，那么需要将图片放入项目中的public/geo文件夹下。
:::

## 基础用法

:::demo

up-particle/basic

:::

## API

### Attributes

| Name      | Description | Type                 | Default     | Required |
| --------- | ----------- | -------------------- | ----------- | -------- |
| `options` | 配置参数    | ^[UpParticleOptions] | `undefined` | No       |

### Events

| Name   | Description        | Type                                          |
| ------ | ------------------ | --------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: UpParticleLoadEvent) => void` |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

