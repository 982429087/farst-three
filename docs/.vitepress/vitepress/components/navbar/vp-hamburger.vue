<script setup lang="ts">
import { useNavbarLocale } from '../../composables/navbar-locale'

defineProps<{
  active: boolean
}>()

const locale = useNavbarLocale()
</script>

<template>
  <!-- locale['mobile-nav'] -->
  <button
    :class="{ active }"
    :aria-label="'?????'"
    :aria-expanded="active"
    aria-controls="full-screen"
    class="reset-btn menu-hamburger"
  >
    <span class="hamburger-1" />
    <span class="hamburger-2" />
    <span class="hamburger-3" />
  </button>
</template>
