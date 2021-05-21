<template>
  <el-row class="camera">
    <video autoplay class="feed">dead</video>
    <el-button
      type="primary"
      circle
      icon="el-icon-camera"
      class="snap"
      @click="$emit(`takePicture`)"
    />
  </el-row>
</template>

<script>
export default {
  name: "Camera",
  data() {
    return {
      errorMessage: "",
      message: "",
    };
  },
  methods: {
    cameraStart() {
      if (
        "mediaDevices" in navigator &&
        "getUserMedia" in navigator.mediaDevices
      ) {
        let constraints = {
          audio: false,
          video: {
            width: {
              min: 360,
              ideal: 720,
              max: 1080,
            },
            height: {
              min: 640,
              ideal: 1280,
              max: 1920,
            },
          },
          facingMode: "user",
        };

        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
          const videoPlayer = document.querySelector(".feed");
          videoPlayer.srcObject = stream;
          videoPlayer.play();

          let track = stream.getVideoTracks()[0];

          let cap = track.getCapabilities();

          track.resizeMode = "crop-and-scale";
          track.applyConstraints({
            width: {
              ideal: cap.width.max,
            },
            height: {
              ideal: cap.height.max,
            },
            aspectRatio: 0.5625,
          });
        });
      } else {
        this.errorMessage = "Нет устройств";
      }
    },
  },
  beforeMount() {
    this.cameraStart();
  },
};
</script>

<style scoped>
.camera {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 70%;
  box-sizing: border-box;
}
.feed {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.snap {
  font-size: 2rem;
  padding: 20px;
}
</style>
