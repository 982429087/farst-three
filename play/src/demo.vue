<template>
  <div class="farst-three">
    <FtScene>
      <FtPerspectiveCamera>
        <FtMesh>
          <FtBoxGeometry />
          <FtMeshBasicMaterial />
        </FtMesh>
        <FtWebglRenderer />
      </FtPerspectiveCamera>
    </FtScene>
  </div>
</template>

<script setup lang="ts">



</script>

<style lang="scss" scoped>
.farst-three {
  height: 100vh;
  width: 100vw;
}


</style>
<style>
*{
  margin: 0;
  padding: 0;
}
</style>
