---
title: MeshPhysicalMaterial
lang: zh-CN
---

# MeshPhysicalMaterial

[物理网格材质](https://threejs.org/docs/index.html#api/zh/materials/MeshPhysicalMaterial)

MeshStandardMaterial的扩展，提供了更高级的基于物理的渲染属性：

- **Clearcoat**: 有些类似于车漆，碳纤，被水打湿的表面的材质需要在面上再增加一个透明的，具有一定反光特性的面。而且这个面说不定有一定的起伏与粗糙度。Clearcoat可以在不需要重新创建一个透明的面的情况下做到类似的效果。
- **基于物理的透明度**:.opacity属性有一些限制:在透明度比较高的时候，反射也随之减少。使用基于物理的透光性.transmission属性可以让一些很薄的透明表面，例如玻璃，变得更真实一些。
- **高级光线反射**: 为非金属材质提供了更多更灵活的光线反射。
- **光泽**: 可以用来表示布料和织物材料。

物理网格材质使用了更复杂的着色器功能，所以在每个像素的渲染都要比three.js中的其他材质更费性能，大部分的特性是默认关闭的，需要手动开启，每开启一项功能在开启的时候才会更耗性能。请注意，为获得最佳效果，您在使用此材质时应始终指定**environment map**。

## 基础用法
基于物理(PBR)的标准材质

高级光线反射：为非金属材质提供了更多更灵活的光线反射

对MeshStandardMaterial的扩展，提供了更高级的基于物理(PBR)的渲染属性，能够更好地控制反射率。

Clearcoat类似于车漆，碳纤，具有反光特性的面

基于物理(PBR)的透光性.transmission属性可以让某些很薄的透明表面，例如玻璃，变得更真实。范围从0.0到1.0。默认值是0.0

.ior非金属材质所设置的折射率，范围由1.0到2.333。默认为1.5

thickness曲面下体积的厚度。如果值为0，则材质为薄壁。默认值为0。
:::demo

mesh-physical-material/basic

:::

## API

### Attributes

| Name      | Description  | Type                              | Default     | Required |
| --------- | ------------ | --------------------------------- | ----------- | -------- |
| `params`  | 构造函数参数 | ^[MeshPhysicalMaterialParameters] | `undefined` | No       |
| `options` | 实例属性     | ^[MeshPhysicalMaterialOptions]    | `{}`        | No       |

### Events

| Name   | Description        | Type                                                    |
| ------ | ------------------ | ------------------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: MeshPhysicalMaterialLoadEvent) => void` |

### Provide

| Key                 | Description              | Type                    |
| ------------------- | ------------------------ | ----------------------- |
| `materialInjectKey` | MeshPhysicalMaterial实例 | ^[MeshPhysicalMaterial] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

