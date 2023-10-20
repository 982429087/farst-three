uniform vec3 color;
uniform sampler2D pointTexture;

uniform vec3 fogColor;
uniform float fogNear,fogFar;
void main(){
  vec4 color = vec4(color, 1.0) * texture2D(pointTexture, gl_PointCoord);
  gl_FragColor = color;
  float depth = gl_FragCoord.z / gl_FragCoord.w;
  float fogFactor = smoothstep(fogNear,fogFar,depth);
  gl_FragColor.rgb = mix(gl_FragColor.rgb,fogColor,fogFactor);
}
