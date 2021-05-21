<template>
  <div>
    <canvas class="camera__image"></canvas>
  </div>
</template>

<script>
export default {
  name: "CameraImage",
};
</script>

<style>
.picture {
  display: block;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}
.picture .camera__image {
  display: block;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
