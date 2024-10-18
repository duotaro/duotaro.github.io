This is a [Next.js](https://nextjs.org/) blog using [Notions Public API](https://developers.notion.com).
NotionをヘッドレスCMSとして利用したブログやWEBサイト構築





__デモ:__ [https://notion-blog-nextjs-coral.vercel.app](https://notion-blog-nextjs-coral.vercel.app)

__How-it-works/Documentation:__ [https://samuelkraft.com/blog/building-a-notion-blog-with-public-api](https://samuelkraft.com/blog/building-a-notion-blog-with-public-api)

## Getting Started


github sshでプッシュできるように
githubに登録
https://docs.github.com/ja/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account

```
ssh-keygen -t ed25519 -C "githubに登録したメールアドレス"
```
ファイル名（ここではgithub＿sshとします）を指定して作成。作成時にパスワード入力が求められます。
.ssh/configに以下の内容を追加
```
Host github github.com
  HostName github.com
  User git
  Port 22
  IdentityFile ~/.ssh/github＿ssh
  IdentitiesOnly yes
```

作成したキーをコピー
```
pbcopy < ~/.ssh/github＿ssh.pub
```

githubの設定画面に遷移
https://github.com/settings/keys

new SSH keyを押してコピーしたキーを追加（名前はなんでも）



次にNotion APIのシークレットキーを作成します
https://www.notion.so/profile/integrations
ここらか「新しいインテグレーション」を選択し、情報を入力してら保存してください。
内部インテグレーションシークレットと表示されている箇所があるので、表示してコピーします。

secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

このような形式であるはずです。

プロジェクト直下.env.localファイルを作成してください。
作成したら以下のように`NEXT_PUBLIC_NOTION_TOKEN`に先ほど取得したシークレットキーを設定します
As a reference here's the Notion table I am using: https://www.notion.so/5b53abc87b284beab0c169c9fb695b4d?v=e4ed5b1a8f2e4e12b6d1ef68fa66e518

```
NEXT_PUBLIC_NOTION_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_NOTION_DATABASE_ID=
```

Install dependencies

```bash
npm install
# or
yarn
```

Start the server with

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### tweet埋め込み
https://blog.35d.jp/2020-04-10-notion-blog-twitter-card
これを参考に


### deploy

```bash
yarn deploy
```

### analitics
以下の記事を参考に実装でできた
https://zenn.dev/rh820/articles/8af90011c573fe

https://analytics.google.com/
Search Consoleも登録
https://search.google.com/search-console

### sitemap

```bash
yarn build 
```
でsitemap作成される。これを実施後にdeployすればOK


### ads
https://www.google.com/adsense/


