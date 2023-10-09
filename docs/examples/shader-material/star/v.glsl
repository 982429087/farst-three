varying float cameraDistance;
void main(){
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  vec4 worldPosition = modelMatrix * vec4(position,1.0);
  vec3 viewVector = cameraPosition - worldPosition.xyz;
  cameraDistance = length(viewVector);
  gl_PointSize = 200.0 / cameraDistance;
}
