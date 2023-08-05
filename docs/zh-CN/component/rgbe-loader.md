---
title: RgbeLoader
lang: zh-CN
---

# RgbeLoader

[环境贴图加载器](https://discourse.threejs.org/t/gltfloader-and-rgbeloader-adding-hdr-texture-to-enviroment/36086)用于加载高动态范围（HDR）环境贴图，它通常用于创建更逼真的光照和反射效果。HDR环境贴图以Radiance（.hdr）格式存储，能够表示更广泛的亮度范围，从而在渲染逼真场景时提供更准确的光源和反射效果。
texture在给material赋值的时候是微任务异步的，为了确保的修改属性在赋值前。
## 基础用法

:::demo

rgbe-loader/basic

:::



## API

### Attributes

| Name       | Description  | Type                    | Default           | Required |
| ---------- | ------------ | ----------------------- | ----------------- | -------- |
| `type`     | 纹理类型     | ^[RGBETextureType]      | `'map'`           | Yes      |
| `url`      | 构造函数参数 | ^[string]               | `[]`              | Yes      |
| `load`     | 构造函数参数 | ^[RGBELoaderOnLoad]     | `() => undefined` | No       |
| `progress` | 构造函数参数 | ^[RGBELoaderOnProgress] | `() => undefined` | No       |
| `error`    | 构造函数参数 | ^[RGBELoaderOnError]    | `() => undefined` | No       |
| `options`  | 实例属性     | ^[RgbeLoaderOptions]    | `{}`              | No       |


### Events

| Name              | Description        | Type                                                               |
| ----------------- | ------------------ | ------------------------------------------------------------------ |
| `load`            | 实例创建后触发方法 | ^[Function]`(e: RgbeLoaderLoadEvent) => void`                      |
| `managerLoad`     | LoadingManager方法 | ^[Function]`() => void`                                            |
| `managerStart`    | LoadingManager方法 | ^[Function]` (url: string, loaded: number, total: number) => void` |
| `managerProgress` | LoadingManager方法 | ^[Function]` (url: string, loaded: number, total: number) => void` |
| `managerError`    | LoadingManager方法 | ^[Function]` (url: string) => void`                                |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |
