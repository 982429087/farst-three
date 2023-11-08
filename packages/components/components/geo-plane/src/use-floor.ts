import {
  AdditiveBlending,
  CircleGeometry,
  Clock,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PlaneGeometry,
  ShaderMaterial,
  TextureLoader,
} from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import type { Scene } from 'three'

export function useFloor(scene: Scene) {
  const clock = new Clock()
  let uniforms: Record<string, any> = {}
  const textureLoader = new TextureLoader()
  let rotatingApertureMesh: Mesh | undefined
  let rotatingPointMesh: Mesh | undefined
  function initFloor() {
    const geometry = new PlaneGeometry(800, 800)
    const mirror = new Reflector(geometry, {
      clipBias: 0.13,
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
      color: '#8f9299', //8f9299
    })
    mirror.rotateX(-Math.PI / 2)
    scene.add(mirror)

    //底部颜色
    const texture = textureLoader.load('/geo/地板背景.png')
    const materialx = new MeshPhongMaterial({
      color: 0xffffff,
      map: texture,
      // emissive:0xffffff,
      emissiveMap: texture,
      transparent: true,
      opacity: 1,
      // depthTest: true,
      // roughness:1,
      // metalness:0,
      // depthWrite: false,
      // side: DoubleSide
    })
    const plane = new Mesh(geometry, materialx)
    plane.rotateX(-Math.PI / 2)
    plane.position.y = 0.05
    scene.add(plane)

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

    const rotatingApertureTexture = textureLoader.load(
      '/geo/rotatingAperture.png'
    )
    const rotatingApertureerial = new MeshBasicMaterial({
      map: rotatingApertureTexture,
      transparent: true,
      opacity: 1,
      depthTest: true,
      depthWrite: false,
    })
    const rotatingApertureGeometry = new PlaneGeometry(100, 100)
    rotatingApertureMesh = new Mesh(
      rotatingApertureGeometry,
      rotatingApertureerial
    )
    rotatingApertureMesh.rotateX(-Math.PI / 2)
    rotatingApertureMesh.position.y = 0.02
    rotatingApertureMesh.scale.set(1.2, 1.2, 1.2)
    scene.add(rotatingApertureMesh)

    const rotatingPointTexture = textureLoader.load('/geo/rotating-point2.png')
    const material2 = new MeshBasicMaterial({
      map: rotatingPointTexture,
      transparent: true,
      opacity: 1,
      depthTest: true,
      depthWrite: false,
    })

    rotatingPointMesh = new Mesh(rotatingApertureGeometry, material2)
    rotatingPointMesh.rotateX(-Math.PI / 2)
    rotatingPointMesh.position.y = 0.04
    rotatingPointMesh.scale.set(1, 1, 1)
    scene.add(rotatingPointMesh)

    const circlePoint = textureLoader.load('/geo/circle-point.png')
    const material3 = new MeshPhongMaterial({
      color: 0x00ffff,
      map: circlePoint,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      // depthTest: false,
    })
    const plane3 = new PlaneGeometry(120, 120)
    const mesh3 = new Mesh(plane3, material3)
    mesh3.rotateX(-Math.PI / 2)
    mesh3.position.y = 0.06
    scene.add(mesh3)
  }

  function render() {
    if (rotatingApertureMesh) {
      rotatingApertureMesh.rotation.z += 0.0005
    }
    if (rotatingPointMesh) {
      rotatingPointMesh.rotation.z -= 0.0005
    }

    const timer = clock.getDelta()
    uniforms.iTime.value += Math.sin(timer) / 3
    if (uniforms.iTime.value > 1.0) {
      uniforms.iTime.value = 0.0
    }
  }

  initFloor()
  return {
    render,
  }
}
