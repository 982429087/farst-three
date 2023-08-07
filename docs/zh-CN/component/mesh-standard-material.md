---
title: MeshStandardMaterial
lang: zh-CN
---

# MeshStandardMaterial

[标准材质](https://threejs.org/docs/index.html#api/zh/materials/MeshStandardMaterial)
一种基于物理的标准材质，使用Metallic-Roughness工作流程。

基于物理的渲染（PBR）最近已成为许多3D应用程序的标准，例如Unity， Unreal和 3D Studio Max。

这种方法与旧方法的不同之处在于，不使用近似值来表示光与表面的相互作用，而是使用物理上正确的模型。 我们的想法是，不是在特定照明下调整材质以使其看起来很好，而是可以创建一种材质，能够“正确”地应对所有光照场景。

在实践中，该材质提供了比MeshLambertMaterial 或MeshPhongMaterial 更精确和逼真的结果，代价是计算成本更高。MeshStandardMaterial uses per-fragment shading。

请注意，为获得最佳效果，您在使用此材质时应始终指定environment map。

有关PBR概念的非技术性介绍以及如何设置PBR材质，请查看marmoset成员的这些文章：

- [Basic Theory of Physically Based Rendering](https://www.marmoset.co/posts/basic-theory-of-physically-based-rendering/)
- [Physically Based Rendering and You Can Too](https://www.marmoset.co/posts/physically-based-rendering-and-you-can-too/)

在 three.js（以及其他大多数PBR系统）中使用方法的技术细节， 可以在Brent Burley撰写的paper from Disney (pdf) 中查看。


## 基础用法
基于物理(PBR)的标准材质
该材质提供了比MeshLambertMaterial或MeshPhongMaterial更精确和逼真的结果，代价是计算成本更高。
计算着色的方式与MeshPhongMaterial相同，都使用Phong着色模型。
为获得最佳效果，在使用此材质时应始终指定environmentMap,envMap全景纹理，可以模拟对四周环境的镜面反射。
:::demo

mesh-standard-material/basic

:::

## API

### Attributes

| Name      | Description  | Type                              | Default     | Required |
| --------- | ------------ | --------------------------------- | ----------- | -------- |
| `params`  | 构造函数参数 | ^[MeshStandardMaterialParameters] | `undefined` | No       |
| `options` | 实例属性     | ^[MeshStandardMaterialOptions]    | `{}`        | No       |

### Events

| Name   | Description        | Type                                                    |
| ------ | ------------------ | ------------------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: MeshStandardMaterialLoadEvent) => void` |

### Provide

| Key                 | Description          | Type                    |
| ------------------- | -------------------- | ----------------------- |
| `materialInjectKey` | MeshStandardMaterial | ^[MeshStandardMaterial] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

