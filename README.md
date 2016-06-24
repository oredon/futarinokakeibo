# futarinokakeibo
思い出と共に出費も積み重ねよう。同棲、新婚、ルームシェア。楽しいお二人様暮らしの支出記録WEBアプリ。

## DEMO
http://oredon.kidukilab.com/kakeibo/
* ID: admin
* Password: admin

## これは？
二人暮らし用の家計簿WEBアプリケーションです。cakePHP1.3ベースで作成しています。
LAMP環境が必要になります。2010年くらいに作ったもので、個人的に使用してきましたがこの度公開してみることにしました。

また、2016年6月に勉強がてらにReact + Redux + material-uiでテンプレートを刷新してみました。
試行錯誤段階の産物のため賢くない実装もあるかもしれません。
「こうしたらもっと良いよ」などありましたらtwitter等で教えていただけるととても嬉しいです！

## 対応DBは？
cakePHPに準拠します。特にMySQLとSQLiteを推奨しています。
MySQLとSQLite用にテストデータをダンプしたファイルを同梱しています。

### test db dump file.
* mysql_kakeibo_clean.sql : MySQL用のクリーンdump
* mysql_kakeibo_testdata.sql : MySQL用のテストデータ込dump
* sqlite_kakeibo_clean.sql : SQLite用のクリーンdump
* sqlite_kakeibo_testdata.sql : SQLite用のテストデータ込dump

なお、ログインユーザとしてID: admin PW: admin ユーザを初期ユーザとしてdumpに含めています。

## Install
DocumentRoot直下にkakeiboディレクトリをアップし、cakePHPの設置同様tmpやcacheディレクトリにapache書き込み権限を与えます。あとはDBの作成をtest db dump file.を参考に作成してください。

## ユーザの追加、パスワード変更
http://oredon.kidukilab.com/kakeibo/users/add

http://oredon.kidukilab.com/kakeibo/users/edit/{id}

のように、usersコントローラのadd,editアクションを利用します。

## フロントエンド開発について
react + redux + material-uiのコンパイルにはwebpack + babel(es2015)を使っています。
takanabe様がgitHubに公開しているreact-redux-material_ui-boilerplateを使わせていただきました。

[GitHUB - takanabe/react-redux-material_ui-boilerplate](https://github.com/takanabe/react-redux-material_ui-boilerplate)

```
cd ./kakeibo/app/webroot/package
npm Install
webpack
```


## 使用ライブラリ special thanks.（アルファベット順）
* [cakePHP](http://cakephp.jp/)
* [highcharts](http://www.highcharts.com/)
* [material-ui](http://www.material-ui.com/)
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [url-search-params](https://github.com/WebReflection/url-search-params)

## npmパッケージ special thanks.（アルファベット順）
* [axios](https://github.com/mzabriskie/axios)
* [babel-core](https://github.com/babel)
* [babel-eslint](https://github.com/babel)
* [babel-loader](https://github.com/babel)
* [babel-plugin-transform-runtime](https://github.com/babel)
* [babel-preset-es2015](https://github.com/babel)
* [babel-preset-react](https://github.com/babel)
* [babel-preset-stage-1](https://github.com/babel)
* [babel-runtime](https://github.com/babel)
* [classnames](https://github.com/JedWatson/classnames)
* [css-loader](https://github.com/webpack/css-loader)
* [eslint](https://github.com/eslint/eslint)
* [eslint-loader](https://github.com/MoOx/eslint-loader)
* [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
* [fbjs](https://github.com/facebook/fbjs)
* [file-loader](https://github.com/webpack/file-loader)
* [highcharts](https://github.com/highcharts/highcharts-dist)
* [material-ui](https://github.com/callemall/material-ui)
* [react](https://github.com/facebook/react)
* [react-addons-create-fragment](https://github.com/facebook/react)
* [react-addons-pure-render-mixin](https://www.npmjs.com/package/react-addons-pure-render-mixin)
* [react-addons-transition-group](https://github.com/facebook/react)
* [react-addons-update](https://github.com/facebook/react)
* [react-dom](https://github.com/facebook/react)
* [react-highcharts](https://github.com/kirjs/react-highcharts)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)
* [react-redux](https://github.com/reactjs/react-redux)
* [react-router](https://github.com/reactjs/react-router)
* [react-router-redux](https://github.com/reactjs/react-router-redux)
* [react-tap-event-plugin](https://github.com/zilverline/react-tap-event-plugin)
* [redux](https://github.com/reactjs/redux)
* [redux-thunk](https://github.com/gaearon/redux-thunk)
* [style-loader](https://github.com/webpack/style-loader)
* [webpack](https://github.com/webpack)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware)


-----------------------------

### 制作
oredon(Taisuke)

#### WEBサイト
[http://oredon.kidukilab.com/](http://oredon.kidukilab.com/)

#### twitter
[https://twitter.com/oredon_taisuke](https://twitter.com/oredon_taisuke)

:::::::::::::::::

#### HTML5 で3Dゲーム作りました
[http://is.kidukilab.com/](http://is.kidukilab.com/)

:::::::::::::::::

#### HTML5 で2Dゲーム作りました
[http://oredon.kidukilab.com/](http://oredon.kidukilab.com/)

:::::::::::::::::
