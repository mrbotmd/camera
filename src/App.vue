<template>
  <el-row type="flex" justify="center" align="center">
    <el-col
      :xs="24"
      :sm="18"
      :md="14"
      :lg="8"
      style=" height: 100vh; box-sizing: border-box; display: flex; justify-content: center; align-items: center"
    >
      <Camera v-show="!picTaken" @takePicture="takePicture" />
      <div v-show="picTaken" style="display: flex">
        <CameraImage />
        <div style="display: flex; flex-direction: column">
          <button>save</button>
          <button>cancel</button>
        </div>
      </div>
    </el-col>
  </el-row>
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
      picture.width = window.innerWidth < 1280 ? window.innerWidth - 100 : 337;
      // picture.width = window.innerWidth;
      // picture.width = 720;
      picture.height =
        window.innerWidth < 1280 ? window.innerHeight - 100 : 600;
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
