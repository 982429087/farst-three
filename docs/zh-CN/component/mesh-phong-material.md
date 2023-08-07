---
title: MeshPhongMaterial
lang: zh-CN
---

# MeshPhongMaterial

[Phong网格材质](https://threejs.org/docs/index.html#api/zh/materials/MeshPhongMaterial)
一种用于具有镜面高光的光泽表面的材质。

该材质使用非物理的Blinn-Phong模型来计算反射率。 与MeshLambertMaterial中使用的Lambertian模型不同，该材质可以模拟具有镜面高光的光泽表面（例如涂漆木材）。MeshPhongMaterial uses per-fragment shading。

在MeshStandardMaterial或MeshPhysicalMaterial上使用此材质时，性能通常会更高 ，但会牺牲一些图形精度。


## 基础用法
可以模以具有镜面高光的光泽表面（例如涂漆木材），即使没有高光贴图也行；
该材质使用非物理的Blinn-Phong模型来计算反射率。可以对光照产生镜面反射；

独特属性（继承自该材质也会有这些属性）：
1. emissive材质的放射（光）颜色，基本上是不受其他光照影响的固有颜色。默认为黑色；
2. emissiveMap设置放射（发光）贴图；
3. emissivelntensity放射光强度。调节发光颜色。默认为l；
4. specular指定该材质的光亮程度及其高光部分的颜色。如果设置成跟color属性相同的颜色，将会得到更加类似金属的材质。如果设置为灰色，材质将变得更像塑料；
5. shininess指定高光培部分的亮度。默认是30

:::demo

mesh-phong-material/basic

:::

## API

### Attributes

| Name      | Description  | Type                           | Default     | Required |
| --------- | ------------ | ------------------------------ | ----------- | -------- |
| `params`  | 构造函数参数 | ^[MeshPhongMaterialParameters] | `undefined` | No       |
| `options` | 实例属性     | ^[MeshPhongMaterialOptions]    | `{}`        | No       |

### Events

| Name   | Description        | Type                                                 |
| ------ | ------------------ | ---------------------------------------------------- |
| `load` | 实例创建后触发方法 | ^[Function]`(e: MeshPhongMaterialLoadEvent) => void` |

### Provide

| Key                 | Description | Type                 |
| ------------------- | ----------- | -------------------- |
| `materialInjectKey` | 实例        | ^[MeshPhongMaterial] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

