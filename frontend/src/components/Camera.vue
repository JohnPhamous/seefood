<template>
    <div id="camera">
      <div v-if="!photo.length" class="take-photo">
        <div><video ref="video" id="video" class="drop-shadow" autoplay></video></div>
        <div class="text-center">
          <b-button id="snap" v-on:click="capture()" class="drop-shadow" size="lg" variant="primary">Snap Photo</b-button>
        </div>
      </div>

      <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>

      <b-container v-if="photo.length">
        <user-message v-if="photo.length">
          <img class="photo-taken" v-bind:src="photo" width="100%" />
        </user-message>
        <message>Should I use this photo?</message>

        <div class="buttons">
          <b-button v-on:click="getLabels" class="btn drop-shadow positive" size="sm">
            Looks good!
          </b-button>
          <b-button v-on:click="reset" class="btn drop-shadow negative" size="sm">
            Let's retake it
          </b-button>
        </div>

        <message v-if="grabbingLabels">Great, let's see what you're eating...</message>
      </b-container>
    </div>
</template>

<script>
import Message from './MessageBubble';
import UserMessage from './UserMessageBubble';
import ActionButton from './ActionButton';
import axios from 'axios';

export default {
  data() {
    return {
      video: {},
      canvas: {},
      photo: '',
      grabbingLabels: false,
      apiurl: ''
    };
  },
  methods: {
    capture() {
      this.canvas = this.$refs.canvas;
      var context = this.canvas
        .getContext('2d')
        .drawImage(this.video, 0, 0, 640, 480);
      this.photo = canvas.toDataURL('image/png');
    },
    getLabels() {
      // console.log('get labels from google');
      this.grabbingLabels = true;
      axios
        .post(`${apiurl}`, {
          image: this.photo
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    reset() {
      this.photo = '';
      console.log('reset');
    }
  },
  mounted() {
    this.video = this.$refs.video;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.src = window.URL.createObjectURL(stream);
        this.video.play();
      });
    }
  },
  components: {
    Message,
    ActionButton,
    UserMessage
  }
};
</script>

<style lang="scss">
@import '../assets/styles/seefood.scss';

#canvas {
  display: none;
}
video {
  width: 100%;
  height: 100%;
}
#camera {
  background: linear-gradient(to bottom, white, #ccc);
  height: 100vh;
  width: 100vw;
}
#snap {
  border-radius: 20px;
  background: $s-primary;
}
.photo-taken {
  // margin-bottom: 50px;
}
.positive {
  background: $s-purple;
  border-radius: 50px;
  padding: 10px 15px;
  border: none;
  margin-left: 20px;
}
.negative {
  background: $s-red;
  border-radius: 50px;
  padding: 10px 15px;
  border: none;
  margin-left: 20px;
}
.buttons {
  text-align: right;
  margin-bottom: 50px;
}
</style>