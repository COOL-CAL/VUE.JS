const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/todo': {
        target: 'http://localhost'
        //내 아이피 주소 적는 게 제일 좋음.
        //다른 사람이 내 아이피로 들어와서 사용하는 것이기 때문.
      }
    }
  }
});
