export default defineAppConfig({
  pages: [
    'pages/index/index',
    // 'pages/history/history',
    // 'pages/profile/profile',
    // 'pages/favorite/favorite',
    // 'pages/input/input',
    // 'pages/result/result',
  ],
  subPackages: [
    {
      root: 'subpackages',
      pages: [
        'history/history',
        'profile/profile',
        'favorite/favorite',
        'result/result',
        'input/input',
      ]
    }
  ],
  entryPagePath: 'pages/index/index',
  networkTimeout: {
		// 各类网络请求的超时时间，单位均为毫秒
		request: 120000, // Taro.request 的超时时间
		connectSocket: 120000, // Taro.connectSocket 的超时时间
		uploadFile: 120000, // Taro.uploadFile 的超时时间
		downloadFile: 120000, // Taro.downloadFile 的超时时间
	},

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '写作蛙',
    navigationBarTextStyle: 'black'
  }
})
