<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <title>Grüne Bete</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Contact">
    <meta name="author" content="Hanna Prinz, Nadine Pusch, Michael Hasenkrug">

    <!-- Le styles -->
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">
    <link href="css/bootstrap-responsive.css" rel="stylesheet">

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="js/html5shiv.js"></script>
    <![endif]-->

    <!-- Fav and touch icons -->
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="ico/apple-touch-icon-114-precomposed.png">
      <link rel="apple-touch-icon-precomposed" sizes="72x72" href="ico/apple-touch-icon-72-precomposed.png">
                    <link rel="apple-touch-icon-precomposed" href="ico/apple-touch-icon-57-precomposed.png">
                                   <link rel="shortcut icon" href="img/favicon.ico">
  </head>

  <body>
    <div class="container" id="ghost">  
    <img src="img/logo.png">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="container">
          <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="brand" href="#"></a>
          <div class="nav-collapse collapse">
            <ul class="nav">
              <li><a href="index.html">Home</a></li>
              <li><a href="calendar.html">Kalender</a></li>
              <li><a href="map.html">Karte</a></li>
              <li class="active"><a href="#">Kontakt</a></li>
            </ul>
          </div><!--/.nav-collapse -->
          </div><!--/.container -->
        </div><!--/.navbar-inner -->
      </div><!--/.navbar -->
        
<?php 
if ($_POST["email"]<>'') { 
    require("PHPMailer/class.phpmailer.php");

        $mail = new phpmailer();

        $mail->SMTPSecure       = "ssl";  
        $mail->Host             = 'smtp.gmail.com';  
        $mail->Port             = '465';   
        $mail->Username         = 'mail.gruenebete@gmail.com';
        $mail->Password         = 'Gemueste@mme2';  
        $mail->SMTPKeepAlive    = true;  
        $mail->Mailer           = "smtp"; 
        $mail->IsSMTP(); 
        $mail->SMTPAuth         = true;                  
        $mail->CharSet          = 'utf-8';  
        $mail->SMTPDebug        = 0;

        $mail->From             = "mail.gruenebete@gmail.com";
        $mail->FromName         = "Grüne Bete";
        
        $mail->AddAddress('mail.gruenebete@gmail.com','Grüne Bete');        

        $mail->WordWrap = 50;                                      
        $mail->IsHTML(true);                               
        
        $mail->Subject  =  "Nachricht von der Homepage";
        $mail->Body     =  "<b>Name:</b> "
                            .$_POST["name"]." 
                            <br>
                            <b>Absender:</b> "
                            .$_POST["email"]." 
                            <br>
                            <b>Nachricht:</b> "
                            .nl2br($_POST["comment"])."";                     
    
        if(!$mail->Send()) {
            echo "Die Nachricht konnte nicht versandt werden <p>";
            echo "Mailer Error: " . $mail->ErrorInfo;
            exit;
        }

        echo "Die Nachricht wurde erfolgreich versandt";
?> 
Your message was sent
<?php 
    } else { 
?> 
        <form action="contact.php" method="post">
            <table width="400" border="0" cellspacing="2" cellpadding="0">
                <tr>
                    <td width="29%" class="bodytext">Your name:</td>
                    <td width="71%"><input name="name" type="text" id="name" size="32"></td>
                </tr>
                <tr>
                    <td class="bodytext">Email address:</td>
                    <td><input name="email" type="text" id="email" size="32"></td>
                </tr>
                <tr>
                    <td class="bodytext">Comment:</td>
                    <td><textarea name="comment" cols="45" rows="6" id="comment" class="bodytext"></textarea></td>
                </tr>
                <tr>
                    <td class="bodytext"> </td>
                    <td align="left" valign="top"><input type="submit" name="Submit" value="Send"></td>
                </tr>
            </table>
        </form>  
<?php 
    }; 
?>
                
    <hr>
        
    <div>
      <footer>
        <p>© Grüne Bete 2013</p>
      </footer>
    </div>
    </div><!--/.container -->
      
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>    
    <script src="js/bootstrap.js"></script>
  </body>
</html>
