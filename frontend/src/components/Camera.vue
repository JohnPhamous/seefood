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

        <div v-if="grabbingLabels">
          <transition enter-active-class="fadeInLeft-1" name="fade3">
            <message v-if="grabbingLabels">Great, let's see what you're eating...</message>
          </transition>
          <message>Looks yummy! What do you call it?</message>

          <user-message>
            <b-form-input type="text" v-model="term" />
            <b-button @click="getStats" size="sm" variant="primary" class="btn-send">Send</b-button>
          </user-message>

          <div class="label-container">
            <b-badge
              pill
              variant="primary"
              class="drop-shadow label"
              v-for="(label, index) in labels"
              :key="label"
              v-on:click="addTerm(label, index)"
            >
              {{ label }}
            </b-badge>
          </div>

          <div v-if="showStats">
            <message>Awesome! Here are some stats for "{{ term }}":</message>
            <message>Total Fat: 10g</message>
            <message>Cholesterol: 18mg</message>
            <message>Sodium: 640mg</message>
            <message>Total Carbs: 36g</message>
            <message>Would you like to log this?</message>

            <div class="buttons">
              <b-button v-on:click="showGraphs" class="btn drop-shadow positive" size="sm">
                Yes
              </b-button>
              <b-button v-on:click="reset" class="btn drop-shadow negative" size="sm">
                No
              </b-button>
            </div>

          </div>
        </div>
        
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
      apiurl: 'http://localhost:3000/getLabels',
      labels: ['pizza', 'cheese', 'pasta', 'meat', 'slice', 'bread'],
      term: '',
      showStats: false
    };
  },
  methods: {
    getStats() {
      this.showStats = true;
    },
    capture() {
      this.canvas = this.$refs.canvas;
      var context = this.canvas
        .getContext('2d')
        .drawImage(this.video, 0, 0, 640, 480);
      this.photo = canvas.toDataURL('image/png');
      console.log(this.photo);
    },
    addTerm(term, index) {
      console.log(term);
      this.term += ` ${term}`;
      this.labels.splice(index, 1);
    },
    getLabels() {
      // console.log('get labels from google');
      this.grabbingLabels = true;
      // axios
      //   .post(`${this.apiurl}`, {
      //     headers: {
      //       'Access-Control-Allow-Origin': '*'
      //     },
      //     image: this.photo
      //   })
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
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
.label-container {
  text-align: right;
  margin-right: 20px;
}
.badge {
  margin-left: 10px;
  padding: 10px 20px;
  font-size: 1em;
  margin-bottom: 10px;
}
.label {
  background: $s-yellow;
}
#canvas {
  display: none;
}
video {
  width: 100%;
  height: 100%;
}
#camera {
  height: 100vh;
  width: 100vw;
}
#snap {
  border-radius: 20px;
  background: $s-primary;
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
.btn-send {
  margin-top: 10px;
  margin-left: auto;
  display: block;
}

@-webkit-keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@-webkit-keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  -webkit-animation-name: fadeIn;
  animation: fadeIn 0.5s 0.5s;
  animation-fill-mode: forwards;
  opacity: 0;
}

.fadeInLeft-1 {
  -webkit-animation-name: fadeInLeft;
  animation: fadeInLeft 0.5s;
  animation-fill-mode: forwards;
}

.fadeInLeft-2 {
  -webkit-animation-name: fadeInLeft;
  opacity: 0;
  animation: fadeInLeft 0.5s 1s;
  animation-fill-mode: forwards;
}

.fadeInRight {
  -webkit-animation-name: fadeInRight;
  opacity: 0;
  animation: fadeInRight 0.5s 1.5s;
  animation-fill-mode: forwards;
}
</style>
