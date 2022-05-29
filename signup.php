<?php
    session_start();
    if(isset($_SESSION["username"])||isset($_COOKIE["username"]))
    {
        header("Location: home.php");
        exit;
    }

    if(isset($_POST["username"])&&isset($_POST["password"])&&isset($_POST["mail"])&&isset($_POST["c_password"])){
        $error = array();
        $conn = mysqli_connect("localhost", "root", "", "blog") or die(mysqli_error($conn));
        
        if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $_POST['username'])) {
            $error[] = "Username non valido";
        } else {
            $username = mysqli_real_escape_string($conn, $_POST['username']);
            $query = "SELECT Username FROM User WHERE Username = '$username'";
            $res = mysqli_query($conn, $query);
            if (mysqli_num_rows($res) > 0) {
                $error[] = "Username già utilizzato";
            }
        }
        
        if (strlen($_POST["password"]) < 8) {
            $error[] = "Caratteri password insufficienti";
        }

        if (strcmp($_POST["password"], $_POST["c_password"]) != 0) {
            $error[] = "Le password non coincidono";
        }

        if (!filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL)) {
            $error[] = "Email non valida";
        } else {
            $mail = mysqli_real_escape_string($conn, strtolower($_POST['mail']));
            $res = mysqli_query($conn, "SELECT mail FROM User WHERE mail = '$mail'");
            if (mysqli_num_rows($res) > 0) {
                $error[] = "Mail già utilizzata";
            }
        }
        
        if (count($error) == 0) {
            $name = mysqli_real_escape_string($conn, $_POST['name']);
            $password = mysqli_real_escape_string($conn, $_POST['password']);
            $password = password_hash($password, PASSWORD_BCRYPT);

            $query = "INSERT INTO User(username, mail, password) VALUES('$username', '$mail','$password')";
            if (mysqli_query($conn, $query)) {
                $_SESSION["username"] = $_POST["username"];
                mysqli_close($conn);
                header("Location: home.php");
                exit;
            } else {
                $error[] = "Errore di connessione al Database";
            }
        }
        mysqli_close($conn);
    }
    else if (isset($_POST["username"])) {
        $error = array("Riempi tutti i campi");
    }
?>

<html>
    <head>
        <title>Registrati</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="http://fonts.cdnfonts.com/css/gotham" rel="stylesheet">
        <link rel="stylesheet" href="style/login&signup.css" />
        <link rel="icon" type="image/png" href="images/favicon.png">
        <script src="scripts/signup.js" defer="true"></script>
    </head>
    <body>
        <section>
            <img src="./images/blog.png">
            <h2>Registrati</h2>
            <form name="form_blog" method="post">
                <p class="username">
                    <label><input type="text" name="username" placeholder="Username" <?php if(isset($_POST["username"])){echo "value=".$_POST["username"];} ?> required></label>
                    <span class="errore hidden">Username non disponibile!</span>
                </p>
                <p class="mail">
                    <label><input type="text" name="mail" placeholder="Mail" <?php if(isset($_POST["mail"])){echo "value=".$_POST["mail"];} ?>></label>
                    <span class="errore hidden">Indirizzo email non valido!</span>
                </p>
                <p class="password">
                    <label><input type="password" name="password" placeholder="Password" <?php if(isset($_POST["password"])){echo "value=".$_POST["password"];} ?>></label>
                    <span class="errore hidden">Inserisci almeno 8 caratteri</span>
                </p>
                <p class="c_password">
                    <label><input type="password" name="c_password" placeholder="Conferma Password" <?php if(isset($_POST["c_password"])){echo "value=".$_POST["c_password"];} ?> ></label>
                    <br>
                    <span class="errore hidden">Le password non coincidono</span>
                </p>
                <p>
                    <label id="submit"><input type="submit"><label>
                </p>
            </form>
        </section>
        <section>
            <p>
                Hai già un account? <a href="login.php">Accedi</a>
            </p>
        </section>
    </body>
</html>