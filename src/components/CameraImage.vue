<template>
  <div class="camera__image-container">
    <canvas class="camera__image"></canvas>
  </div>
</template>

<script>
export default {
  name: "CameraImage",
};
</script>

<style>
.camera__image-container {
  margin-bottom: 20px;
  box-sizing: border-box;
}
.picture .camera__image {
  display: block;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
