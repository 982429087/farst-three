#! /bin/bash
NAME=$1
FILE_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")/../docs" && pwd)
MD_FILE_PATH=$FILE_PATH/zh-CN/component
EXAMPLE_FILE_PATH=$FILE_PATH/examples

NORMALIZED_NAME=""
for i in $(echo $NAME | sed 's/[_|-]\([a-z]\)/\ \1/g;s/^\([a-z]\)/\ \1/g'); do
  C=$(echo "${i:0:1}" | tr "[:lower:]" "[:upper:]")
  NORMALIZED_NAME="$NORMALIZED_NAME${C}${i:1}"
done

mkdir -p "$EXAMPLE_FILE_PATH/$NAME"

cat >$MD_FILE_PATH/$NAME.md <<EOF
---
title: $NORMALIZED_NAME
lang: zh-CN
---

# $NORMALIZED_NAME

[]()



## 基础用法

:::demo

$NAME/basic

:::

## API

### Attributes

| Name          | Description  | Type                      | Default     | Required |
| ------------- | ------------ | ------------------------- | ----------- | -------- |
| \`skyColor\`    | 构造函数参数 | ^[ColorRepresentation]    | \`undefined\` | No       |
| \`options\`     | 实例属性     | ^[HemisphereLightOptions] | \`{}\`        | No       |

### Events

| Name   | Description        | Type                                               |
| ------ | ------------------ | -------------------------------------------------- |
| \`load\` | 实例创建后触发方法   | ^[Function]\`(e: HemisphereLightLoadEvent) => void\` |

### Provide

| Key                           | Description         | Type               |
| ----------------------------- | ------------------- | ------------------ |
| \`hemisphereLightInjectionKey\` | HemisphereLight实例 | ^[HemisphereLight] |

### Slots

| Name      | Description |
| --------- | ----------- |
| \`default\` | 默认插槽    |

EOF

cat >$EXAMPLE_FILE_PATH/$NAME/basic.vue <<EOF
<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="100"
        :options="{
          position: {
            set: [0.1, 4, 7],
          },
        }"
      />

      <FtWebglRenderer
        :params="{ antialias: true }"
        :animation-fn="animationFn"
        :options="{
          shadowMap: {
            enabled: true,
          },
        }"
      >
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useGui } from '@farst-three/hooks'
import {
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtWebglRenderer,
} from '@farst-three/components'
const domRef = ref<HTMLDivElement>()

const animationFn = () => {
  //
}

const { gui } = useGui(domRef)
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
EOF
