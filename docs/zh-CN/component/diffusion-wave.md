---
title: DiffusionWave
lang: zh-CN
---

# DiffusionWave




```glsl
varying vec2 vUv;
uniform float iTime;
uniform vec3 unColor;
uniform float unLaps;
uniform float opacity;
void main() {
  vec2 uv = vUv;
  vec2 p = 2.0 * uv.xy - vec2(1., 1.);
  float r = length(p) * unLaps;
  vec3 color = unColor;
  float a = pow(r, 2.0);
  float b = sin(r * 0.8 - 1.6);
  float c = sin(r - .10);
  float s = sin(a - iTime * 3.0 + b) * c;
  color *= abs(1.0 / (s * 30.)) - 0.1;
  gl_FragColor = vec4(color, opacity);
}
```
函数动态图
<img src="/docs/function.gif">
uv是归一化后的坐标所以，这段代码将0，0移动到屏幕中心所以uv范围是-1，1。
每一帧都会通过这个函数计算每一个像素点的颜色。
函数图形上峰值就是最接近传入颜色的地方，并且这个位置并不宽。
而其他较宽的位置的颜色责无限趋近与黑色 因为黑色的rgb是0，0，0。
并且在-1，1这个区间随时间的改变，峰值不止出现一个。
随着时间的变化，在-1到1这个区间中图像是循环出现的，sin函数 - 某个值就是在平移函数图像


## 基础用法

:::demo

diffusion-wave/basic

:::

## API

### Attributes

| Name          | Description  | Type                      | Default     | Required |
| ------------- | ------------ | ------------------------- | ----------- | -------- |
| `skyColor`    | 构造函数参数 | ^[ColorRepresentation]    | `undefined` | No       |
| `options`     | 实例属性     | ^[HemisphereLightOptions] | `{}`        | No       |

### Events

| Name   | Description        | Type                                               |
| ------ | ------------------ | -------------------------------------------------- |
| `load` | 实例创建后触发方法   | ^[Function]`(e: HemisphereLightLoadEvent) => void` |

### Provide

| Key                           | Description         | Type               |
| ----------------------------- | ------------------- | ------------------ |
| `hemisphereLightInjectionKey` | HemisphereLight实例 | ^[HemisphereLight] |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` | 默认插槽    |

