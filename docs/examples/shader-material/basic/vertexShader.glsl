uniform float size;
varying float vSize;
varying vec3 vColor;
void main(){
  vSize = size;
  vColor = color;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = size;
}
