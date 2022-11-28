<template>
  <div id="app" class="m-5">
    <b-container fluid>
      <b-row align-h="center">
        <b-col><h1>Airplane Seats Allocation App</h1></b-col>
      </b-row>
      <b-row class="m-5" align-h="center">
        <router-view />
      </b-row>
    </b-container>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
