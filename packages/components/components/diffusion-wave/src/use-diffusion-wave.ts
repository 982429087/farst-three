import {
  AdditiveBlending,
  CircleGeometry,
  Clock,
  DoubleSide,
  Mesh,
  ShaderMaterial,
  TextureLoader,
} from 'three'
import type { Scene } from 'three'
export function useDiffusionWave(scene: Scene) {
  let uniforms: Record<string, any> = {}
  const clock = new Clock()

  const texture = new TextureLoader().load('/geo/floor-background.png')
  //扩散波效果
  const geometry2 = new CircleGeometry(100, 64)
  uniforms = {
    iTime: { value: 0.1 },
    colorTexture: { value: texture },
  }
  const material = new ShaderMaterial({
    uniforms,
    vertexShader: `
        varying vec2 vUv;
        varying vec3 fNormal;
        varying vec3 vPosition;
        void main()
        {
          vUv = uv;
          fNormal=normal;
          vPosition=position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
    fragmentShader: `varying vec2 vUv;
        uniform float iTime;
        uniform sampler2D colorTexture;
        vec3 hsb2rgb(const vec3 c) {
        vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0, 4.0, 2.0), 6.0)-3.0)-1.0, 0.0, 1.0);
        rgb = rgb*rgb*(3.0-2.0*rgb);
        return c.z * mix( vec3(1.0), rgb, c.y);
      }
      void main() {
        vec2 uv = vUv;
        vec2 p = 2.0*uv.xy - vec2(1., 1.) ; // center what being drawn
        float r = length(p) * 2.; //圈数量
        vec3 color = hsb2rgb(vec3(0.6, 1., 1.)); //0.24, 0.7, 0.5
        vec4 textureValue = texture2D( colorTexture, vUv );
        float a = pow(r, 2.0); //圈数量
        float b = sin(r * 0.8 - 1.6);
        float c = sin(r - .10);
        float s = sin(a - iTime * 3.0 + b) * c;
        color *= abs(1.0 / (s * 30.)) - 0.1; //初始圈大小
        gl_FragColor = vec4(color, 1.);
      }
    `,
    // depthTest: false,
    // depthWrite: false,
    side: DoubleSide,
    blending: AdditiveBlending,
    transparent: true,
    opacity: 1,
  })
  const plane2 = new Mesh(geometry2, material)
  plane2.rotateX(-Math.PI / 2)
  plane2.position.y = -0.015
  scene.add(plane2)

  function dispose() {
    scene.remove(plane2)
    plane2.geometry.dispose()
    plane2.material.dispose()
  }

  function render() {
    const timer = clock.getDelta()
    uniforms.iTime.value += Math.sin(timer) / 3
    if (uniforms.iTime.value > 1.0) {
      uniforms.iTime.value = 0.0
    }
  }

  return {
    render,
    dispose,
  }
}
