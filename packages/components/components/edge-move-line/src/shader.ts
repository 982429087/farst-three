export const vertex = /*glsl*/ `
  varying vec2 vUv;
  attribute float percent;
  uniform float u_time;
  uniform float number;
  uniform float speed;
  uniform float length;
  varying float opacity;
  uniform float size;
  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    // 将一个值限制在指定的范围内
    float l = clamp(1.0 - length,0.0,1.0);
    // fract(x) 返回x的小数部分
    gl_PointSize = clamp(fract(percent * number + l - u_time * number * speed)-l ,0.0,1.) * size * (1./length);
    opacity = gl_PointSize / size;
    gl_Position = projectionMatrix * mvPosition;
  }
`
export const fragment = /*glsl*/ `
  #ifdef GL_ES
  precision mediump float;
  #endif
  varying float opacity;
  uniform vec3 color;
  void main(){
    // 如果透明度小于或等于 0.2，丢弃（不绘制）当前片元。
    if (opacity <= 0.2) {
      discard;
    }
    gl_FragColor = vec4(color,1.0);
  }
`
