<template>
  <div class="home">
    <div class="messages" v-if="!scanningFood">
      <div class="speech-bubble drop-shadow">
        <h1 class="title">Hi! I'm Seefood,</h1>
        <h1 class="title">I can help you keep track of your nutrition using computer vision!</h1>
      </div>
      <div class="speech-bubble drop-shadow">
        <h1 class="title">First off, what's your name?</h1>
      </div>
      <div class="speech-bubble-user user drop-shadow">
        <b-form-input 
          v-model="name"
          type="text"
          v-on:keyup.enter="submitName"
        ></b-form-input>
        <b-button @click="submitName" size="sm" variant="primary" class="btn-send">Send</b-button>
      </div>

      <div v-if="nameSubmitted" class="speech-bubble drop-shadow">
        <h1 class="title">Hey {{ name }},</h1>
        <h1 class="title">what's <span class="meal">{{ timeToMeal }}</span> today?</h1>
      </div>
      <div v-if="nameSubmitted" class="btn-center-wrapper">
        <b-button size="lg" @click="scanningFood = true;" variant="primary" class="btn-scan drop-shadow">Scan Food</b-button>
      </div>

    </div>
    
    <camera v-if="scanningFood" />
  </div>
</template>

<script>
import Camera from './Camera';

export default {
  name: 'Home',
  data() {
    return {
      name: '',
      nameSubmitted: false,
      scanningFood: false
    };
  },
  methods: {
    submitName() {
      this.nameSubmitted = true;
      console.log('name submitted');
    }
  },
  computed: {
    timeToMeal: function() {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      if (currentHour > 0 && currentHour < 10) {
        return 'for breakfast';
      } else if (currentHour >= 10 && currentHour <= 15) {
        return 'for lunch';
      } else if (currentHour > 15 && currentHour <= 22) {
        return 'for dinner';
      } else {
        return 'snacks are you having';
      }
    }
  },
  components: {
    Camera
  }
};
</script>

<style scoped lang="scss">
@import '../assets/styles/seefood.scss';
.speech-bubble {
  position: relative;
  background: $s-primary;
  border-radius: 0.4em;
  padding: 10px;
  width: 80%;
  margin-left: 30px;
  margin-bottom: 30px;
}
.speech-bubble:after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border: 38px solid transparent;
  border-right-color: $s-primary;
  border-left: 0;
  border-bottom: 0;
  margin-top: -19px;
  margin-left: -38px;
}
.speech-bubble-user {
  position: relative;
  background: $s-red;
  border-radius: 0.4em;
  padding: 10px;
  width: 80%;
  margin-left: 30px;
  margin-bottom: 30px;
}
.speech-bubble-user:after {
  content: '';
  position: absolute;
  right: 4px;
  bottom: 0;
  width: 0;
  height: 0;
  border: 38px solid transparent;
  border-left-color: $s-red;
  border-right: 0;
  border-bottom: 0;
  margin-top: -19px;
  margin-right: -38px;
}
.title {
  // font-weight: 800;
  color: white;
  font-size: 1.5em;
}
.messages {
  padding-top: 5vh;
}
.btn-scan {
  background: $s-primary;
  font-weight: 800;
}
.btn-center-wrapper {
  padding-top: 5vh;
  text-align: center;
}
.meal {
  font-weight: 800;
}
.btn-send {
  margin-top: 10px;
  margin-left: auto;
  display: block;
}
</style>
