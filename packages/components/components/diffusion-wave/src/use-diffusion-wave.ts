import {
  AdditiveBlending,
  CircleGeometry,
  Clock,
  Color,
  DoubleSide,
  Mesh,
  ShaderMaterial,
} from 'three'
import { merge } from 'lodash'
import type {
  ColorRepresentation,
  Scene,
  ShaderMaterialParameters,
} from 'three'

export type DiffusionWaveOptions = {
  color?: ColorRepresentation
  damping?: number
  laps?: number
  geometryOptions?: ConstructorParameters<typeof CircleGeometry>
  materialOptions?: ShaderMaterialParameters
  opacity?: number
}

export function useDiffusionWave(scene: Scene, opts: DiffusionWaveOptions) {
  const defaultOptions: DiffusionWaveOptions = {
    color: '#0066ff',
    damping: 0.3,
    laps: 2.0,
    geometryOptions: [100, 64],
    materialOptions: {},
    opacity: 1,
  }
  const options = merge(defaultOptions, opts)
  const uniforms: Record<string, any> = {
    iTime: { value: 0.1 },
    unColor: {
      value: new Color(options.color),
    },
    unLaps: {
      value: options.laps,
    },
    opacity: {
      value: options.opacity,
    },
  }
  const clock = new Clock()

  const geometry = new CircleGeometry(...(options.geometryOptions as any))
  const material = new ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
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
    `,
    // depthTest: false,
    // depthWrite: false,
    side: DoubleSide,
    blending: AdditiveBlending,
    transparent: true,
    opacity: 1,
    ...options.materialOptions,
  })

  const mesh = new Mesh(geometry, material)
  mesh.rotateX(-Math.PI / 2)
  mesh.position.y = -0.015
  scene.add(mesh)

  function dispose() {
    scene.remove(mesh)
    mesh.geometry.dispose()
    mesh.material.dispose()
  }

  function render() {
    const timer = clock.getDelta()
    uniforms.iTime.value += Math.sin(timer * options.damping!)
  }

  return {
    mesh,
    geometry,
    material,
    render,
    dispose,
  }
}
