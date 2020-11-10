<style lang="less">
  @import "./theme.less";
  a {
    text-decoration: none;
    color: black;
    display: none;
    padding: 10px;
    &.inapp {
      @media (max-width: 400px) {
        display: block;
      }
    }
    .app-button {
      background-image: url(./map-button.jpg);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      height: 200px;
      position: relative;
      .overlay {
        position: absolute;
        border-radius: 16px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Source Sans Pro;
        font-weight: 700;
        font-size: 40px;
        text-align: center;
        color: white;
      }
    }
  }
</style>

<a
  class:inapp={typeof window !== "undefined" && window.hasOwnProperty('ReactNativeWebView')}
  href="https://www.nzherald.co.nz/world/us-election-donald-trump-v-joe-biden-live-results/IAXUG6CB4ACSFDBRJN5E5O5VXA/"
  target="_blank">
  <div class="app-button">
    <div class="overlay">
      <div>APP USERS CLICK HERE FOR MAP</div>
    </div>
  </div>
</a>
