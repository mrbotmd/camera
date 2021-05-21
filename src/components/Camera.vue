<template>
  <div class="camera">
    <button class="snap" @click="$emit(`takePicture`)">Сфотографировать</button>
    <video autoplay class="feed">dead</video>
  </div>
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

        console.log(navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
          const videoPlayer = document.querySelector(".feed");
          videoPlayer.srcObject = stream;
          videoPlayer.play();
          let stream_settings = stream.getVideoTracks()[0].getSettings();
          let track = stream.getVideoTracks()[0];
          console.log(track.getCapabilities());
          let cap = track.getCapabilities();
          let supported = navigator.mediaDevices.getSupportedConstraints();
          console.log(
            "🚀 ~ file: Camera.vue ~ line 50 ~ navigator.mediaDevices.getUserMedia ~ supported",
            supported
          );
          console.log(
            "🚀 ~ file: Camera.vue ~ line 49 ~ navigator.mediaDevices.getUserMedia ~ cap",
            cap
          );
          track.resizeMode = "crop-and-scale";
          track.applyConstraints({
            width: {
              ideal:
                cap.width.max / 2 > window.innerWidth
                  ? cap.width.max
                  : cap.width.max / 2,
            },
            height: {
              ideal:
                cap.height.max / 2 > window.innerHeight
                  ? cap.height.max
                  : cap.height.max / 2,
            },
            aspectRatio: 0.5625,
          });

          // actual width & height of the camera video
          let stream_width = stream_settings.width;
          let stream_height = stream_settings.height;

          console.log("Width: " + stream_width + "px");
          console.log("Height: " + stream_height + "px");
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
  /* width: 100vw; */
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
  border: 1px solid blue;
}
</style>
