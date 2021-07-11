// GASアプリ
// トリガーに時間(日付)を設定

var postUrl = '{SLACKURL}'; //{SLACKURL}：SlackのwebhookURL
var username = '自己管理BOT';  // 通知時に表示されるユーザー名
var icon = ':hatching_chick:';  // 通知時に表示されるアイコン
var message;

function myNoteAlarm() {

  //日付の取得
  var dateList = getdate();
  var yearString = dateList[0];
  var monthString = dateList[1];
  var dateString = dateList[2];

  //メッセージの作成
  message = createMessage(yearString, monthString, dateString);

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

//日付を取得、文字列型に変換するメソッド
function getdate(){
  let year;
  let month;
  let date;
  let dateList;

  //実行した日付のオブジェクトをtoday変数に格納する
  let today = new Date();

  //Dateオブジェクトのtoday変数をログ出力する
  Logger.log(today);

  //formatDateメソッドで日付の表示形式を変換する
  year = Utilities.formatDate(today,"JST", "yyyy");
  month = Utilities.formatDate(today,"JST", "M");
  date = Utilities.formatDate(today,"JST", "d");

  //リストに格納
  dateList = [year,month,date];

  return dateList;
}

//Slackのメッセージ内容を作成するメソッド
//日付については事前入力する
function createMessage(yearString, monthString, dateString){
  //GOOGLEFORM：対象のフォームURL
  //FORMID：フォームのID(フォーム画面で検証、nameタグを確認する)
  let message = 
    monthString +"月" + dateString + "日の行動を記載してください。\n"
    + "<{GOOGLEFORM}/viewform?usp=sf_link&entry.{FORMID}_year=" + yearString
    + "&entry.{FORMID}_month=" + monthString 
    + "&entry.{FORMID}_day=" + dateString 
    + "|" + monthString +"月" + dateString + "日の行動" 
    + ">";

  return message;
}

