<template>
  <div class="home" style="width: 100%">
    <TextArea v-model="requestData" />
    <div>
      <button class="btn btn-success mt-3" @click="allocate">Allocate</button>
    </div>
    <div class="pt-5">
      <p style="font-size: 20px">
        Passengers Remaining In The Queue : {{ remaining }}
      </p>
    </div>
    <div class="plane" :style="blocks(allBlocks.length)">
      <div
        class="block"
        :style="col(block[0])"
        v-for="(block, b) in allBlocks"
        :key="b"
      >
        <div v-for="(col, c) in block[0]" :key="c">
          <div v-for="(row, r) in block[1]" :key="r">
            <div
              class="seat"
              :style="
                hashMap.get(`${b}-${col}-${row}`)[0] == 'aisle'
                  ? 'border:2px dashed blue'
                  : hashMap.get(`${b}-${col}-${row}`)[0] == 'window'
                  ? 'border:2px dashed green'
                  : 'border:2px dashed red'
              "
            >
              {{
                hashMap.get(`${b}-${col}-${row}`)[1] == undefined
                  ? "not-booked"
                  : hashMap.get(`${b}-${col}-${row}`)[1]
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextArea from "@/components/TextArea.vue";
export default {
  name: "Home",

  components: {
    TextArea,
  },
  computed: {
    hashMap() {
      return this.$store.getters.getMap;
    },
    remaining() {
      return this.$store.getters.getRemaining;
    },
    allBlocks() {
      return this.$store.getters.getBlocks;
    },
  },
  methods: {
    blocks(num) {
      return `grid-template-columns: repeat(${num}, 1fr)`;
    },
    col(num) {
      return `grid-template-columns: repeat(${num}, 1fr)`;
    },
    allocate() {
      let data = JSON.parse(this.requestData);
      this.$store.dispatch("allocationRequest", data);
    },
  },
  data() {
    return {
      requestData: `{
    "blocks": [
        {
            "0": 3,
            "1": 2
        },
        {
            "0": 4,
            "1": 3
        },
        {
            "0": 2,
            "1": 3
        },
        {
            "0": 3,
            "1": 4
        }
    ],
    "passengers": 30
}`,
    };
  },
};
</script>
<style>
body {
  background: #a1ffce;
  background: -webkit-linear-gradient(to right, #faffd1, #a1ffce);
  background: linear-gradient(to right, #faffd1, #a1ffce);
  display: flex;
  flex-direction: column;
}

.plane {
  max-width: 100%;
  margin: 10px;
  border: 3px solid green;
  background: rgb(90, 142, 164);
  display: grid;
}

.block {
  border: 2px dashed rgb(255, 255, 0);
  background: rgb(231, 205, 167);
  margin: 10px;
  max-height: 100%;
  display: grid;
}

.seat {
  margin: 10px;
  text-align: center;
}
</style>
