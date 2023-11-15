export const vertex = /*glsl*/ `
varying vec2 vUv;
varying vec3 vPosition;
void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`

export const fragment = /*glsl*/ `
varying vec2 vUv;
uniform sampler2D colorTexture;
uniform vec2 repeat;
uniform vec3 color;
void main( void ) {
  vec2 position = vUv;
  vec4 colorb = vec4(color,1.0);
  vec4 colora = texture2D(colorTexture, vec2((vUv * repeat).x, fract((vUv * repeat).y)));
  gl_FragColor = colora+colorb;
}
`
