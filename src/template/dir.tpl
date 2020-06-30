<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <meta name="viewport"
    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"/> 
    <title>{{title}}</title>
    <style>
        body{
            margin:30px;
        }
        a{
            display:block;
            font-size:20px;
        }
    </style>
</head>
  
  
  <body>
        {{#each readdirs}}
            <a href="{{../dir}}/{{file}}">【{{icon}}】{{file}}</a>
        {{/each}}
  </body>
</html>