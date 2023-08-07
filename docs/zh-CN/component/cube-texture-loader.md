---
title: CubeTextureLoader
lang: zh-CN
---

# CubeTextureLoader

[纹理加载器](https://threejs.org/docs/index.html?q=cube#api/zh/loaders/CubeTextureLoader)加载CubeTexture的一个类。 内部使用ImageLoader来加载文件。

加载的CubeTexture在sRGB颜色空间中。这意味着colorSpace属性被设置为THREE。默认为SRGBColorSpace。
texture在给material赋值的时候是微任务异步的，为了确保的修改属性在赋值前。
## 基础用法

:::demo

cube-texture-loader/basic

:::



## API

### Attributes

| Name       | Description  | Type                           | Default           | Required |
| ---------- | ------------ | ------------------------------ | ----------------- | -------- |
| `type`     | 纹理类型     | ^[CubeTextureType]             | `'map'`           | Yes      |
| `urls`     | 构造函数参数 | ^[Array<string>]               | `[]`              | Yes      |
| `load`     | 构造函数参数 | ^[CubeTextureLoaderOnLoad]     | `() => undefined` | No       |
| `progress` | 构造函数参数 | ^[CubeTextureLoaderOnProgress] | `() => undefined` | No       |
| `error`    | 构造函数参数 | ^[CubeTextureLoaderOnError]    | `() => undefined` | No       |
| `options`  | 实例属性     | ^[CubeTextureLoaderOptions]    | `{}`              | No       |


### Events

| Name              | Description        | Type                                                               |
| ----------------- | ------------------ | ------------------------------------------------------------------ |
| `load`            | 实例创建后触发方法 | ^[Function]`(e: CubeTextureLoadEvent) => void`                         |
| `managerLoad`     | LoadingManager方法 | ^[Function]`() => void`                                            |
| `managerStart`    | LoadingManager方法 | ^[Function]` (url: string, loaded: number, total: number) => void` |
| `managerProgress` | LoadingManager方法 | ^[Function]` (url: string, loaded: number, total: number) => void` |
| `managerError`    | LoadingManager方法 | ^[Function]` (url: string) => void`                                |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |
