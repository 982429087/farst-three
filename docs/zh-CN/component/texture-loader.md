---
title: TextureLoader
lang: zh-CN
---

# TextureLoader

[纹理加载器](https://threejs.org/docs/index.html?q=TextureLoader#api/zh/loaders/TextureLoader)加载texture的一个类。 内部使用ImageLoader来加载文件。
texture在给material赋值的时候是微任务异步的，为了确保的修改属性在赋值前。
## 基础用法

:::demo

texture-loader/basic

:::

## 纹理显示算法

:::demo

texture-loader/filter

:::

## 属性控制

:::demo

texture-loader/options

:::



## API

### Attributes

| Name       | Description  | Type                       | Default           | Required |
| ---------- | ------------ | -------------------------- | ----------------- | -------- |
| `type`     | 纹理类型     | ^[TextureType]             | `'map'`           | Yes      |
| `url`      | 构造函数参数 | ^[string]                  | `''`              | Yes      |
| `load`     | 构造函数参数 | ^[TextureLoaderOnLoad]     | `() => undefined` | No       |
| `progress` | 构造函数参数 | ^[TextureLoaderOnProgress] | `() => undefined` | No       |
| `error`    | 构造函数参数 | ^[TextureLoaderOnError]    | `() => undefined` | No       |
| `options`  | 实例属性     | ^[TextureLoaderOptions]    | `{}`              | No       |


### Events

| Name              | Description        | Type                                                               |
| ----------------- | ------------------ | ------------------------------------------------------------------ |
| `load`            | 实例创建后触发方法 | ^[Function]`(e: TextureLoadEvent) => void`                         |
| `managerLoad`     | LoadingManager方法 | ^[Function]`() => void`                                            |
| `managerStart`    | LoadingManager方法 | ^[Function]` (url: string, loaded: number, total: number) => void` |
| `managerProgress` | LoadingManager方法 | ^[Function]` (url: string, loaded: number, total: number) => void` |
| `managerError`    | LoadingManager方法 | ^[Function]` (url: string) => void`                                |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |
