// from https://github.com/spite/THREE.MeshLine/blob/master/src/THREE.MeshLine.js

import { Color, ShaderChunk, ShaderMaterial, UniformsLib, Vector2 } from 'three'
import type { ShaderMaterialParameters } from 'three'
;(ShaderChunk as any)['meshline_vert'] = [
  '',
  ShaderChunk.logdepthbuf_pars_vertex,
  ShaderChunk.fog_pars_vertex,
  '',
  'attribute vec3 previous;',
  'attribute vec3 next;',
  'attribute float side;',
  'attribute float width;',
  'attribute float counters;',
  '',
  'uniform vec2 resolution;',
  'uniform float lineWidth;',
  'uniform vec3 color;',
  'uniform float opacity;',
  'uniform float sizeAttenuation;',
  '',
  'varying vec2 vUV;',
  'varying vec4 vColor;',
  'varying float vCounters;',
  '',
  'vec2 fix( vec4 i, float aspect ) {',
  '',
  '    vec2 res = i.xy / i.w;',
  '    res.x *= aspect;',
  '	 vCounters = counters;',
  '    return res;',
  '',
  '}',
  '',
  'void main() {',
  '',
  '    float aspect = resolution.x / resolution.y;',
  '',
  '    vColor = vec4( color, opacity );',
  '    vUV = uv;',
  '',
  '    mat4 m = projectionMatrix * modelViewMatrix;',
  '    vec4 finalPosition = m * vec4( position, 1.0 );',
  '    vec4 prevPos = m * vec4( previous, 1.0 );',
  '    vec4 nextPos = m * vec4( next, 1.0 );',
  '',
  '    vec2 currentP = fix( finalPosition, aspect );',
  '    vec2 prevP = fix( prevPos, aspect );',
  '    vec2 nextP = fix( nextPos, aspect );',
  '',
  '    float w = lineWidth * width;',
  '',
  '    vec2 dir;',
  '    if( nextP == currentP ) dir = normalize( currentP - prevP );',
  '    else if( prevP == currentP ) dir = normalize( nextP - currentP );',
  '    else {',
  '        vec2 dir1 = normalize( currentP - prevP );',
  '        vec2 dir2 = normalize( nextP - currentP );',
  '        dir = normalize( dir1 + dir2 );',
  '',
  '        vec2 perp = vec2( -dir1.y, dir1.x );',
  '        vec2 miter = vec2( -dir.y, dir.x );',
  '        //w = clamp( w / dot( miter, perp ), 0., 4. * lineWidth * width );',
  '',
  '    }',
  '',
  '    //vec2 normal = ( cross( vec3( dir, 0. ), vec3( 0., 0., 1. ) ) ).xy;',
  '    vec4 normal = vec4( -dir.y, dir.x, 0., 1. );',
  '    normal.xy *= .5 * w;',
  '    normal *= projectionMatrix;',
  '    if( sizeAttenuation == 0. ) {',
  '        normal.xy *= finalPosition.w;',
  '        normal.xy /= ( vec4( resolution, 0., 1. ) * projectionMatrix ).xy;',
  '    }',
  '',
  '    finalPosition.xy += normal.xy * side;',
  '',
  '    gl_Position = finalPosition;',
  '',
  ShaderChunk.logdepthbuf_vertex,
  ShaderChunk.fog_vertex &&
    '    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
  ShaderChunk.fog_vertex,
  '}',
].join('\n')
;(ShaderChunk as any)['meshline_frag'] = [
  '',
  ShaderChunk.fog_pars_fragment,
  ShaderChunk.logdepthbuf_pars_fragment,
  '',
  'uniform sampler2D map;',
  'uniform sampler2D alphaMap;',
  'uniform float useMap;',
  'uniform float useAlphaMap;',
  'uniform float useDash;',
  'uniform float dashArray;',
  'uniform float dashOffset;',
  'uniform float dashRatio;',
  'uniform float visibility;',
  'uniform float alphaTest;',
  'uniform vec2 repeat;',
  '',
  'varying vec2 vUV;',
  'varying vec4 vColor;',
  'varying float vCounters;',
  '',
  'void main() {',
  '',
  ShaderChunk.logdepthbuf_fragment,
  '',
  '    vec4 c = vColor;',
  '    if( useMap == 1. ) c *= texture2D( map, vUV * repeat );',
  '    if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, vUV * repeat ).a;',
  '    if( c.a < alphaTest ) discard;',
  '    if( useDash == 1. ){',
  '        c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));',
  '    }',
  '    gl_FragColor = c;',
  '    gl_FragColor.a *= step(vCounters, visibility);',
  '',
  ShaderChunk.fog_fragment,
  '}',
].join('\n')

export type MeshLineMaterialParameters = ShaderMaterialParameters & {
  useMap: number
  color: string | number | Color
  resolution: Vector2
  sizeAttenuation: number
  lineWidth: number
}

export class MeshLineMaterial extends ShaderMaterial {
  isMeshLineMaterial: boolean
  constructor(parameters: MeshLineMaterialParameters) {
    super({
      uniforms: Object.assign({}, UniformsLib.fog, {
        lineWidth: { value: 1 },
        map: { value: null },
        useMap: { value: 0 },
        alphaMap: { value: null },
        useAlphaMap: { value: 0 },
        color: { value: new Color(0xffffff) },
        opacity: { value: 1 },
        resolution: { value: new Vector2(1, 1) },
        sizeAttenuation: { value: 1 },
        dashArray: { value: 0 },
        dashOffset: { value: 0 },
        dashRatio: { value: 0.5 },
        useDash: { value: 0 },
        visibility: { value: 1 },
        alphaTest: { value: 0 },
        repeat: { value: new Vector2(1, 1) },
      }),

      vertexShader: (ShaderChunk as any).meshline_vert,

      fragmentShader: (ShaderChunk as any).meshline_frag,
    })
    this.isMeshLineMaterial = true
    this.type = 'MeshLineMaterial'

    this.setValues(parameters)
  }
  set lineWidth(value) {
    this.uniforms.lineWidth.value = value
  }

  get lineWidth() {
    return this.uniforms.lineWidth.value
  }

  get map() {
    return this.uniforms.map.value
  }
  set map(value) {
    this.uniforms.map.value = value
  }

  get useMap() {
    return this.uniforms.useMap.value
  }
  set useMap(value) {
    this.uniforms.useMap.value = value
  }
  get alphaMap() {
    return this.uniforms.alphaMap.value
  }
  set alphaMap(value) {
    this.uniforms.alphaMap.value = value
  }
  get useAlphaMap() {
    return this.uniforms.useAlphaMap.value
  }
  set useAlphaMap(value) {
    this.uniforms.useAlphaMap.value = value
  }
  get color() {
    return this.uniforms.color.value
  }
  set color(value) {
    this.uniforms.color.value = value
  }
  // get opacity() {
  //   return this.uniforms.opacity.value
  // }
  // set opacity(value) {
  //   this.uniforms.opacity.value = value
  // }
  get resolution() {
    return this.uniforms.resolution.value
  }
  set resolution(value) {
    this.uniforms.resolution.value.copy(value)
  }
  get sizeAttenuation() {
    return this.uniforms.sizeAttenuation.value
  }
  set sizeAttenuation(value) {
    this.uniforms.sizeAttenuation.value = value
  }
  get dashArray() {
    return this.uniforms.dashArray.value
  }
  set dashArray(value) {
    this.uniforms.dashArray.value = value
    this.useDash = value !== 0 ? 1 : 0
  }
  get dashOffset() {
    return this.uniforms.dashOffset.value
  }
  set dashOffset(value) {
    this.uniforms.dashOffset.value = value
  }
  get dashRatio() {
    return this.uniforms.dashRatio.value
  }
  set dashRatio(value) {
    this.uniforms.dashRatio.value = value
  }
  get useDash() {
    return this.uniforms.useDash.value
  }
  set useDash(value) {
    this.uniforms.useDash.value = value
  }
  get visibility() {
    return this.uniforms.visibility.value
  }
  set visibility(value) {
    this.uniforms.visibility.value = value
  }
  // get alphaTest() {
  //   return this.uniforms.alphaTest.value
  // }
  // set alphaTest(value) {
  //   this.uniforms.alphaTest.value = value
  // }
  get repeat() {
    return this.uniforms.repeat.value
  }
  set repeat(value) {
    this.uniforms.repeat.value.copy(value)
  }

  copy(source: any) {
    ShaderMaterial.prototype.copy.call(this, source)

    this.lineWidth = source.lineWidth
    this.map = source.map
    this.useMap = source.useMap
    this.alphaMap = source.alphaMap
    this.useAlphaMap = source.useAlphaMap
    this.color.copy(source.color)
    this.opacity = source.opacity
    this.resolution.copy(source.resolution)
    this.sizeAttenuation = source.sizeAttenuation
    this.dashArray.copy(source.dashArray)
    this.dashOffset.copy(source.dashOffset)
    this.dashRatio.copy(source.dashRatio)
    this.useDash = source.useDash
    this.visibility = source.visibility
    this.alphaTest = source.alphaTest
    this.repeat.copy(source.repeat)

    return this
  }
}
