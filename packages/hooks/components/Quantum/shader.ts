export const fragShader = /*glsl*/ `
precision highp float;

varying vec3 vColor;
varying float vAlpha;

void main() {
  gl_FragColor = vec4(vColor, vAlpha);
}
`

export const vertShader = /*glsl*/ `
// 声明变量: attribute、uniform、varying
/*
 * gl_PointSize	点渲染模式，方形点区域渲染像素大小  float
 * gl_Position	顶点位置坐标                      vec4
 * gl_FragColor	片元颜色值                        vec4
 * gl_FragCoord	片元坐标，单位像素                 vec2
 * gl_PointCoord 点渲染模式对应点像素坐标          vec2

 * 所有计算都要用浮点数
 * 逐顶点: 多个顶点，每个顶点都要执行1遍顶点着色器主函数main中的程序
 * 逐片元: gl_FragColor: 片元像素的颜色, vec4(r,g,b,a),前三个参数表示片元像素颜色值RGB，第四个参数是片元像素透明度A，1.0表示不透明,0.0表示完全透明
 */

precision mediump float;

attribute float alpha; // 读取attributes中的alpha属性
attribute float size;  // 读取attributes中的size属性
varying vec3 vColor;   // 定义颜色变量
varying float vAlpha;  // 定义透明度变量
// varying float vSize;   // 定义大小变量

void main() {
  vColor = color; // 变量赋值为attributes中的color
  vAlpha = alpha; // 变量赋值为attributes中的alpha
  // vSize = size;   // 变量赋值为attributes中的size
  // gl_Position, gl_PointSize, gl_FragColor: webgl着色器内置变量
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = size * 10.0;
}
`
