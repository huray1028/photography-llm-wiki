# SRC-06 主張驗證結果

逐條對照使用者提供的原文，不以模型常識補證。12 條候選中，4 條需修改、8 條可保留；修訂後人工自查一次，未再發現同類問題。這是單篇、單輪模型審查，不代表長期錯誤率或外部真實性驗證。

| ID | 最終主張／處置 | 狀態 | 證據位置與檢查 |
|---|---|---|---|
| WB-01 | WB 修正不自然色偏，讓現場看起來白的物體在照片中呈現白。 | supported | Introduction；不推論所有創作都必須中和色偏 |
| WB-02 | 光源的（相關）色溫升高時，光色偏冷；同一偏冷照片提高相機 WB 的 Kelvin 設定則可讓呈現較暖。 | conditional；已修正 | Background + JPEG & TIFF；原文分別討論光源光譜與校正設定，不能合成「數字高就偏冷」的口訣 |
| WB-03 | 色溫以外，人工光源可能需綠—洋紅偏移調整。 | supported | JPEG & TIFF；色溫不是所有色偏的唯一變數 |
| WB-04 | 原文描述 AWB 通常約在 3000/4000–7000 K 工作，但本文未給出機型與年代，不能當現代所有相機或手機規格。 | legacy/context-dependent；已修正 | JPEG & TIFF；保留為來源歷史敘述，排除通用教學數值 |
| WB-05 | 文中光源色溫表是經驗估計，不是固定規格。 | conditional | Background；原文稱 rule-of-thumb guide；未將螢光燈 4000–5000 K 當成全體規格 |
| WB-06 | 支援 RAW 的器材可在拍攝後調整白平衡。 | conditional | RAW File Format；不延伸成 RAW 可修復所有色彩與曝光問題 |
| WB-07 | 相同照明條件下，可把一張含中性參考物照片取得的 WB 設定套用到同組其他照片。 | conditional；已修正 | RAW File Format；恢復原文 assuming the same lighting 條件 |
| WB-08 | 理想參考物須均衡反射各色，且在多種色溫下維持中性。 | conditional | Choosing a Neutral Reference；肉眼覺得灰不保證中性；不把 18% 反射率當作色彩中性的充分條件 |
| WB-09 | 原文列罐蓋為廉價參考例子，也指出專用參考物較可靠；不能保證任意品牌或材質的罐蓋色彩中性。 | conditional；已修正 | Choosing a Neutral Reference；從「準確工具」縮回「來源例子」 |
| WB-10 | 雜訊可能污染單像素取樣；支援時取區域平均，原文以 Photoshop 3×3／5×5 為例。 | conditional | Choosing a Neutral Reference；像素尺寸是軟體示例，非所有軟體通則 |
| WB-11 | 大量偏暖／偏冷主體可能使 AWB 誤判，程度依相機而異。 | conditional + visual-gap | Notes on AWB；文字支持風險，未驗證紅色主體／石頭圖片的實際效果 |
| WB-12 | 混合光源可能需優先照顧重要區域，甚至分區校正，或保留原有氣氛。 | conditional + visual-gap | In Mixed Lighting；未操作 Moon／Stone 互動，不聲稱實際比較其影像 |

## 不納入的主張

- 沒有原圖，不能把「看圖可證明」當成本次觀察結果。
- 原文稱某些 JPEG／TIFF 校正方式可能嚴重降低 bit depth。本輪不泛化成「每次 JPEG 白平衡修改都必然降低檔案位元深度」；未有足夠處理流程與版本條件，列為待釐清。
- 本文沒有 blue hour 的時間或太陽高度定義；不因出現 twilight 就填補原 Wiki 的缺口。
- AWB 演算法、相機選單與手機支援能力沒有獨立驗證，不新增操作教學。

