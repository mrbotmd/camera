<template>
  <div>
    <Camera v-show="!picTaken" @takePicture="takePicture" />
    <CameraImage v-show="picTaken" />
  </div>
</template>

<script>
import Camera from "./components/Camera.vue";
import CameraImage from "./components/CameraImage.vue";
export default {
  name: "App",
  components: {
    Camera,
    CameraImage,
  },
  data() {
    return {
      imageData: "",
      picTaken: false,
    };
  },
  methods: {
    takePicture() {
      // let ratio = 9 / 16;
      const picture = document.querySelector(".camera__image");
      // const picContainer = document.querySelector(".picture");
      const feed = document.querySelector(".feed");
      // picture.width = (window.innerWidth - 200) * ratio;
      picture.width = window.innerWidth;
      // picture.width = 720;
      picture.height = window.innerHeight;
      // picture.height = 1280;
      console.log(picture.width);
      const ctx = picture.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(feed, 0, 0, picture.width, picture.height);
      this.picTaken = true;

      this.imageData = picture.toDataURL("image/png");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
