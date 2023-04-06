<template>
  <div class="loading">
    <div class="spinner">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 48 48"
      >
        <g fill="none">
          <path
            id="track"
            fill="var(--loading-spinner-main-color)"
            d="M24,48 C10.745166,48 0,37.254834 0,24 C0,10.745166 10.745166,0 24,0 C37.254834,0 48,10.745166 48,24 C48,37.254834 37.254834,48 24,48 Z M24,44 C35.045695,44 44,35.045695 44,24 C44,12.954305 35.045695,4 24,4 C12.954305,4 4,12.954305 4,24 C4,35.045695 12.954305,44 24,44 Z"
          />
          <path
            id="section"
            fill="#3F4850"
            d="M24,0 C37.254834,0 48,10.745166 48,24 L44,24 C44,12.954305 35.045695,4 24,4 L24,0"
          />
        </g>
      </svg>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loading {
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  .spinner {
    height: 30px;
    position: relative;
    animation: loading-spinner 1s linear infinite;
  }
  @keyframes loading-spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
