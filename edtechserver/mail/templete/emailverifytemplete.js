exports.emailverification = (otp)=>{
    return `<!DOCTYPE html>
    <html>

    <head>
    <meta charset="UTF-8">
    <title>course registration conformation </title>
    <style>

     body{
        bakground-color:#ffffff;
        font-size:16px;
        line-hight:1.4;
        color:#333333;
        margin:0;
        padding:0;    
    }
        .container{
        max-width:600px;
         margin:0 auto;
        padding:20px;
        text-align:center;
        }

        .logo{
         max-width:200px;
         margin-buttom:20px;
        }
        .message{
        font-size:18px;
        margin-buttom:20px
        }
        .support{
         font-size:18px;
        margin-top:20px
        }
        </style>
        </head>

    <body>
        <div class="container">
        <div class="message">message course registration</div>
        <div class="body">
        <p>DEAR ${otp}</p><span>"hello"</span>
        <p>you have successfully register for the course</p>
        </div>
        </div>
    </body>
    </html> `;
};