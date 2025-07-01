# Rule

- 日本語で答えてください
- 作業の終了時に必ず `npm run prettier` を実行してコードを整形してください

# Dir 構成

apps/server, apps/web に分かれています。dir の切り方などは必ず既存構成に則ってください。

## server

nest.js + graphql です。DDD の原則に則っています。

## web

next.js page router で apollo client を使用します。container presentation パターンを用いています。
fragment colocation を採用しています。
