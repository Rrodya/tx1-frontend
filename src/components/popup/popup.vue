<template>
  <div v-if="closed" class="popup" @click.self="close">
    <div class="popup__wrapper">
      <button
        class="popup__inner-closer"
        @click.stop.self="close"
      ></button>
      <div class="popup__inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Popup",
  props: {
    closed: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: ["close"],
  methods: {
    close(event: MouseEvent) {
      if (this.closed) {
        this.$emit("close", event);
      }
    },
  },
});
</script>

<style>
.popup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  padding: 15px;
}
.popup__wrapper {
  margin: 50px auto;
  position: relative;
  max-height: 100%;
  overflow:hidden;
}
.popup__inner {
  background-color: #fff;
  width: 700px;
  max-height: 564px;
  min-width: 576px;
  padding: 32px;
  border-radius: 20px;
  position: relative;
  overflow: auto;
}
.popup__inner-closer {
  left: calc(100% + 10px);
  bottom: calc(100% + 10px);
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: none;
  padding: 0;
  background-image: url("../../assets/icons/close-white.svg");
}

.popup__inner::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

/* Designing for scroll-bar */
.popup__inner::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.popup__inner::-webkit-scrollbar-track {
  background: gainsboro;
  border-radius: 5px;
}

/* Handle */
.popup__inner::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 5px;
}

/* Handle on hover */
.popup__inner::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media screen and (max-width: 768px) {
  .popup {
    padding: 0;
  }

  .popup__wrapper {
    height: 100%;
    width: 100%;
  }

  .popup__inner {
    width: 100%;
    max-height: 100%;
    min-width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .popup__inner-closer {
    left: auto;
    bottom: auto;
    right: 20px;
    top: 20px;
    filter: invert(100%);
  }
}
</style>
