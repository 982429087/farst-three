---
title: WebGLRender
lang: zh-CN
---

# WebGLRender

WebGL Render 用WebGL渲染出你精心制作的场景。
## 基础用法

:::demo

webgl-renderer/basic

:::


## 裁剪

:::demo

webgl-renderer/thumbnail

:::


## API

### Attributes

| Name                     | Description                    | Type                                            | Default     | Required |
| ------------------------ | ------------------------------ | ----------------------------------------------- | ----------- | -------- |
| `animationFn`            | requestAnimationFrame 中的回调 | ^[Function]`(e: WebGLRendererLoadEvent) => any` | `undefined` | No       |
| `params`                 | webglrenderer 构造函数参数     | ^[WebGLRendererParameters]                      | `undefined` | No       |
| `scissor`                | 是否开启裁剪                   | ^[boolean]                                      | `false`     | No       |
| `scissorClearColor`      | 裁剪颜色                       | ^[string]                                       | `#999999`   | No       |
| `scissorClearColorAlpha` | 裁剪透明度                     | ^[number]                                       | `1`         | No       |
| `options`                | WebGLRenderer的实例上的属性    | ^[WebglRendererOptions]                         | `{}`        | No       |


### Events

| Name   | Description                       | Type                                             |
| ------ | --------------------------------- | ------------------------------------------------ |
| `load` | webGLRrenderer 实例创建后触发方法 | ^[Function]`(e: WebGLRendererLoadEvent) => void` |

<!-- ### Exposes

| Method       | Description                 | Type                    |
| ------------ | --------------------------- | ----------------------- |
| `update`     | update affix state manually | ^[Function]`() => void` |
| `updateRoot` | update rootRect info        | ^[Function]`() => void` | -->

### Provide

| Key                    | Description       | Type             |
| ---------------------- | ----------------- | ---------------- |
| `rendererInjectionKey` | webGLRenderer实例 | ^[WebGLRenderer] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

