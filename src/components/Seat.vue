<template>
  <b-card :title="value" style="max-width: 70px; max-hieght: 70px" class="m-2">
  </b-card>
</template>

<script>
export default {
  name: "seat",
  props: {
    value: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  // computed: {
  //   val: {
  //     get() {
  //       return this.value;
  //     },
  //     set(val) {
  //       this.$emit("input", val);
  //     },
  //   },
  // },
};
</script>

<style>
/* .card {
  width: 50px;
  height: 50px;
  align-self: center;
  background: whitesmoke;
  padding: 5px;
  border-radius: 3px;
  margin: 10px 10px;
  transition: all 0.15s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
  .value {
    text-align: center;
  }
} */
</style>
