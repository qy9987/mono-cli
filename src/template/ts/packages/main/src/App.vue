<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
      <router-link to="/sub-app">sub-app Home</router-link> |
      <router-link to="/sub-app/about">sub-app About</router-link>
    </div>
    <router-view />
    <div id="sub-container" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  text-align: center;
  -moz-osx-font-smoothing: grayscale;
}
#nav {
  padding: 30px;
}

#nav a {
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
