# HTML 簡報驗收紀錄

驗收日期：2026-11-11  
入口：`index.html` → `presentation/index.html`

## 自動檢查

- JavaScript 語法：通過（`node --check presentation/app.js`）
- 投影片數量：22 張
- 來源註記：22／22 張皆有 Wiki／來源標示
- 圖片引用：6 個，實際使用 5 個本地圖片檔；全部可正常載入
- 路徑：HTML、CSS、JavaScript 與圖片皆使用相對路徑
- GitHub Pages：根目錄入口可自動導向簡報，並已加入 `.nojekyll`
- 桌面版面：1280 × 720 測試下，22／22 張皆無水平或垂直溢出

## 瀏覽器互動檢查

- 鍵盤左右鍵翻頁：通過
- 進度條、頁碼、網址 hash 與標題同步：通過
- 目錄開啟與跳頁：通過
- 測驗錯誤／正確回饋：通過
- 根目錄重新導向：通過
- 全螢幕按鈕與 `F` 快捷鍵：程式已實作；自動化用的內嵌瀏覽器不授權 Fullscreen API，因此需在 Chrome／Edge 的 GitHub Pages 頁面做人工最終確認

## 內容範圍檢查

- 簡報內容來自五篇 Cambridge in Colour 資料所建立的 Wiki。
- 手機與相機共通原理有說明；來源不足以支持的手機專屬操作沒有自行補寫。
- 每張投影片保留可追溯的 Wiki 頁面或來源編號。
