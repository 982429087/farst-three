<template>
  <div ref="domRef" class="farst-three">
    <FtScene
      :options="{
        background: () => new Color(0xffffff),
      }"
    >
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="100"
        :options="{
          position: {
            set: [0.1, 4, 20],
          },
        }"
      />
      <FtWebglRenderer
        :params="{ antialias: true, logarithmicDepthBuffer: true }"
        :animation-fn="animationFn"
        :options="{
          shadowMap: {
            enabled: true,
          },
        }"
      >
        <FtGLTFLoader :url="url" :load="glbLoad" @load="gltfLoader" />
        <FtAmbientLight />
        <FtPointLight
          :options="{
            position: {
              set: [0, 10, 0],
            },
          }"
        />
        <FtOrbitControls :options="{ enableZoom: false }" />
        <FtAxesHelper />
        <FtGridHelper :size="100" :divisions="100" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import {
  AnimationMixer,
  Clock,
  Color,
  MeshPhysicalMaterial,
  SRGBColorSpace,
  TextureLoader,
} from 'three'
import {
  FtAmbientLight,
  FtAxesHelper,
  FtGLTFLoader,
  FtGridHelper,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPointLight,
  FtScene,
  FtWebglRenderer,
} from 'farst-three'
import type { GLTFLoaderLoadEvent } from 'farst-three'
import type { Material, Mesh, MeshBasicMaterial, Scene } from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
const domRef = ref<HTMLDivElement>()
const baseUrl = import.meta.env.VITE_BASE_URL

const url = `${baseUrl}models/shark_animation/scene.gltf`

const gscene = shallowRef<Scene>()
let modelLoaded = false
function gltfLoader({ scene }: GLTFLoaderLoadEvent) {
  gscene.value = scene
}
let mixer: AnimationMixer
function glbLoad(gltf: GLTF) {
  mixer = new AnimationMixer(gltf.scene)
  const swimingAction = mixer.clipAction(gltf.animations[0])
  const circleingAction = mixer.clipAction(gltf.animations[1])
  const biteAction = mixer.clipAction(gltf.animations[2])
  swimingAction.play()
  modelLoaded = true
  gltf.scene.traverse((e) => {
    const obj = e as Mesh
    if (obj.isMesh && obj.material) {
      const { gltfExtensions } = (obj.material as Material).userData // 获取gltf扩展数据

      if (gltfExtensions) {
        const pbr = gltfExtensions.KHR_materials_pbrSpecularGlossiness // 如果有不支持的材质

        if (pbr) {
          // 根据 KHR_materials_pbrSpecularGlossiness 扩展中的数据加载对应的纹理图片
          const map = new TextureLoader().load(
            `${baseUrl}models/shark_animation/textures/material_0_diffuse.png`
          )
          const specularGlossinessTexture = new TextureLoader().load(
            `${baseUrl}models/shark_animation/textures/material_0_specularGlossiness.png`
          )

          map.colorSpace = SRGBColorSpace
          map.flipY = false // 这里需要设为false

          // 手动创建PBR材质, 可以是 MeshStandardMaterial 或 MeshPhysicalMaterial, 根据实际情况进行选择
          const material = new MeshPhysicalMaterial({
            map,
            // 这里是读取 KHR_materials_pbrSpecularGlossiness 扩展中的颜色信息
            color: new Color(
              pbr.diffuseFactor[0],
              pbr.diffuseFactor[1],
              pbr.diffuseFactor[2]
            ),
            // 这里是读取 KHR_materials_pbrSpecularGlossiness 扩展中的光泽度信息
            sheen: pbr.glossinessFactor,
            // 这里是读取 KHR_materials_pbrSpecularGlossiness 扩展中的高光信息
            specularIntensityMap: specularGlossinessTexture,
            // 这里是读取 KHR_materials_pbrSpecularGlossiness 扩展中的高光颜色信息
            specularColor: new Color(
              pbr.specularFactor[0],
              pbr.specularFactor[1],
              pbr.specularFactor[2]
            ),
            // 这里是自定义的光滑度
            roughness: 0.2,
          })

          obj.material = material // 这里是将不支持的材质替换为自定义的PBR材质
        }
      }
    }
  })
}
const clock = new Clock()
const animationFn = () => {
  if (mixer) {
    const deltaTime = clock.getDelta()
    mixer.update(deltaTime)
  }
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
