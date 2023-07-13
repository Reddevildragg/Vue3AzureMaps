<template>
  <div class="page-404" id="404Page">
    <div class="container">
      <div
        class="h-100 flex-grow-1 w-75 text-center m-auto min-vh-100 d-flex justify-content-center align-items-center flex-column">
        <h1 class="page-404-title pb-3">404</h1>
        <h4 class="pb-4">
          Oops! The page you are looking for cannot be found. Press the button
          below to return to the homepage.
        </h4>

        <router-link to="/">
          <button id="myButton">Back to Home</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
  .page-404-title {
    font-style: normal;
    font-weight: 400;
    font-size: 150px;
    line-height: 100%;
  }

  #myButton {
    color: var(--shades-50);
    background-color: var(--brand-primary-50);
    border-radius: 50px;
    padding: 8px 24px;
    border: none;
  }
</style>
