// GASアプリ
// GoogleFormのスクリプトエディタから編集する
// トリガーにフォーム送信時を設定

var postUrl = '{SLACKURL}'; // {SLACKURL}：SlackのwebhookURL
var username = '自己管理BOT';  // 通知時に表示されるユーザー名
var icon = ':hatching_chick:';  // 通知時に表示されるアイコン
var message;

function submitForm(e){

  //回答編集用URLを取得
  var editURL = e.response.getEditResponseUrl(); 
  //メッセージの作成
  message = 
    "回答を受け付けました。回答編集は以下から\n"
    + "<" + editURL + "|回答を編集>";

  //JSONの作成
  var jsonData =
  {
     "username" : username,
     "icon_emoji": icon,
     "text" : message
  };
  var payload = JSON.stringify(jsonData);

  //オプション設定
  var options =
  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };

  UrlFetchApp.fetch(postUrl, options);

}