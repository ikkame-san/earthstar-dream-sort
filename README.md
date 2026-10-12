# アース・スター ドリーム楽曲ソート

非公式ファンサイト。42曲、初期表示31曲。個人ソロ版9曲・ユニット2曲は個別のチェックボックスで切替（初期オフ）。公式映像・音源リンク23曲。曲選択、検索、年代、上位件数、戻る、自動保存、ジャケット付きPNG、テキスト・結果リンク共有に対応。

## 起動

Node.js 20.9以上で `npm start`。http://127.0.0.1:4190/

## 曲目と確認元

[公式CD一覧](https://www.earthstar.co.jp/service/product/records/)、[Apple Music](https://music.apple.com/jp/artist/966090983)、[公式YouTube](https://www.youtube.com/@earthstarofficial)と関連Topicを照合。確認日 2026-10-12。各songs.jsに出典URLを保持。

初期CD「ブラッドタイプ☆ハートビート」「ハッピー∞エフェクト」は配信APIに各3曲しか返らず、公式CD曲目（11曲・13曲）を使ってソロ版を補完。TVサイズは同じ歌唱者のフル版へ統合。初期2曲はグループのプレデビュー曲として通常表示し、ソロ版だけ切替対象にしています。

「うさかめ高校テニス部」の2曲は通常表示。ユニット曲のチェックボックスは「ひかのん」2曲が対象。青春サーフDaysは4人版と全メンバー参加のfeat.版を同曲に統合。SE・インスト・カラオケ・既存曲メドレーは除外。アニメの原曲歌手の音源をESD版と混同しません。

ESDがライブで披露したカバー曲も収録。ユーザー指定の[ESDのコールまとめ](https://xn--nzwp98desh.com/post/2018/02/06/70/)の曲名見出し31件を全件照合し、表記ゆれを統合して未収録10曲を追加。音源の発売確認だけを収録条件にしません。記事本文に出るコールの名前は曲目に追加しません。

発売曲には配信・CDの最も早い確認済み発売日を使用（初披露日とは異なります）。追加ライブ曲のESD披露年は未確認のため公開年未確認とし、記事の公開日・他歌手での発売日・YouTube再投稿年を流用しません。ESDの音源が確認できない曲へ原曲歌手の動画やジャケットを割り当てません。

Topic一覧には別作品の「叭喇撃突ケ響」が混在していたため、説明欄の歌唱者（西 絹代／CV:瀬戸麻沙美）を確認して除外。Topic名だけでは採用せず、歌唱者も照合しています。

公式レーベルの全592投稿と関連Topic 49音源の一覧を確認し、関連73本のメタデータ・説明欄を照合。動画全編の通し視聴ではありません。採否とAPIの欠落補完はcatalog-audit.json、楽曲確認台帳.md、動画確認一覧.mdに保存。

## 検証・再生成

`npm run check`、`npm test`。

ルートで `node scripts/collect-esd.mjs` → `node scripts/collect-esd-repertoire.mjs` → 次の公開一覧の収集 → `node scripts/audit-esd-videos.mjs` → `node scripts/build-esd.mjs` → `node scripts/package-new-covers.mjs "アース・スター ドリーム楽曲ソート"`。画像変換にはsharpをインストール済みのpackage.jsonをSORT_IMAGE_PACKAGEで指定できます。

```powershell
node scripts/collect-official-videos.mjs esd UCBoHPnjDHd2W6mY7lHCTzXA
node scripts/collect-official-videos.mjs esdtopic UCAOiIqfQKOsBROQG6K02FHg
node scripts/collect-official-videos.mjs esdhappytopic UCB9oEEU5V77JfrfWSEZjRzg
node scripts/collect-official-videos.mjs esdhikanontopic UCBcA0Y7seQ-vGCm94z7JjEA
node scripts/collect-official-videos.mjs esdusakametopic UCL0hUfknU0GngBXCsXKbY0A
```

再調査では該当する.researchのHTML・browseキャッシュを更新してください。認証情報、調査キャッシュ、node_modulesは公開しません。
