---
title: MeshToonMaterial
lang: zh-CN
---

# MeshToonMaterial

[卡通着色的材质](https://threejs.org/docs/index.html#api/zh/materials/MeshToonMaterial)
一种实现卡通着色的材质。


## 基础用法
二次元卡通风格，俗称3渲2

Toon网格材质与ambert网格材质很相似（是MeshPhongMaterial卡通着色的扩展），但更偏向于卡通化。可以使得渐变层次更丰富

放大滤镜magFilter试图通过拉伸来修复这个非常小的渐变纹理贴图，这过程就使用到了mip映射(mipmapping)使其变得模糊。若想防止此种情况，我们可以设置纹理贴图的缩小滤镜minFilter属性和放大滤镜magFilter属性为THREE.NearestFilter

渐变纹理贴图是个非常小的渐变图片可能只有1x3像素
:::demo

mesh-toon-material/basic

:::

## API

### Attributes

| Name      | Description  | Type                          | Default     | Required |
| --------- | ------------ | ----------------------------- | ----------- | -------- |
| `params`  | 构造函数参数 | ^[MeshToonMaterialParameters] | `undefined` | No       |
| `options` | 实例属性     | ^[MeshToonMaterialOptions]    | `{}`        | No       |

### Events

| Name   | Description        | Type                                                |
| ------ | ------------------ | --------------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: MeshToonMaterialLoadEvent) => void` |

### Provide

| Key                 | Description          | Type                    |
| ------------------- | -------------------- | ----------------------- |
| `materialInjectKey` | MeshToonMaterial实例 | ^[MeshToonMaterial实例] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

