<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>家計簿管理システム</title>
    <link rel="stylesheet" type="text/css" href="/kakeibo/package/static/main.css">
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <!-- <script>
    window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
        alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
        + ' Column: ' + column + ' StackTrace: ' +  errorObj);
    } -->
    </script>
    <script src="/kakeibo/js/url-search-params.js"></script>
    <script>
      var sinceYear = <?php echo $sinceYear; ?>;
      var startYear = "<?php echo $nowYear; ?>";
      var startMonth = "<?php echo $nowMonth; ?>";
      var startDate = "<?php echo $nowDate; ?>";
      var product = [
        'ABCスーパー',
        '暮らしの薬局',
        'コーヒーサバンナ',
        'バーガーショップ',
        '病院'
      ];
      var categoryOptions = [
        <?php foreach($catArr as $k => $v){ ?>
          {"<?php echo $k; ?>" : "<?php echo $v; ?>"},
        <?php } ?>
        
      ]
    </script>
  </head>
  <body>
    <div id="root"></div>
    <!-- This script adds the Roboto font to our project. For more detail go to this site:  http://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500 -->
    <script>
      var WebFontConfig = {
        google: { families: [ 'Roboto:400,300,500:latin' ] }
      };
      (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
          '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
      })();
    </script>
    <script src="/kakeibo/package/static/bundle.js"></script>
  </body>
</html>
