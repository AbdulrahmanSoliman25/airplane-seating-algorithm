<template>
  <b-container>
    <b-row>
      <p style="font-size: 20px">Please Enter A Valid Json String :</p>
    </b-row>
    <b-row>
      <textarea
        v-model="val"
        :style="
          isJson
            ? 'border:5px solid green; outline-color:green;'
            : 'border:5px solid red; outline-color:red;'
        "
        style="
          height: 375px;
          display: block;
          width: 100%;
          resize: both;
          font-size: 20px;
          line-height: 175%;
        "
        ref="textarea"
      ></textarea>
    </b-row>
    <b-row v-if="!isJson">
      <p style="color: red">Not Valid Json String</p>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Textarea",
  data() {
    return {
      isJson: true,
    };
  },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  computed: {
    val: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
        try {
          JSON.parse(val);
        } catch (e) {
          return (this.isJson = false);
        }
        return (this.isJson = true);
      },
    },
  },
};
</script>

<style scoped>
.lined-textarea {
  display: flex;
  font-size: 13px;
  line-height: 150%;
  font-family: Helvetica, monospace;
}
</style>
