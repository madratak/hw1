<?php
    session_start();
    if(isset($_SESSION["username"])||isset($_COOKIE["username"]))
    {
        header("Location: home.php");
        exit;
    }
    if(isset($_POST["username"]) && isset($_POST["password"])){
        $conn = mysqli_connect("localhost", "root", "", "blog") or die(mysqli_error($conn));
        $username = mysqli_real_escape_string($conn, $_POST["username"]);
        $password = mysqli_real_escape_string($conn, $_POST["password"]);
        if(isset($_POST["check"]))
            $check=mysqli_real_escape_string($conn, $_POST["check"]);
        $query = "SELECT * FROM User WHERE Username = '".$username."'";
        $res = mysqli_query($conn, $query);
        
        if(mysqli_num_rows($res) > 0)
        {
            $entry = mysqli_fetch_assoc($res);
            if (password_verify($_POST['password'], $entry['Password'])) {
                if(isset($_POST["check"])&&$check=="on")
                {
                    setcookie("username", $_POST["username"]);
                }
                $_SESSION["username"] = $entry["Username"];
                header("Location: home.php");
                mysqli_free_result($res);
                mysqli_close($conn);
                exit;
            }
        }
        else
        {
            $errore = true;
        }
    }
?>

<html>
    <head>
        <title>Accedi</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="style/login&signup.css" />
        <link rel="icon" type="image/png" href="images/favicon.png">
    </head>
    <body>
        <?php
            if(isset($errore))
            {
                echo "<section>";
                echo "<p class='errore'>";
                echo "<strong>L'username o la password inserite non sono corrette. ";
                echo "Riprova!</strong>";
                echo "</p>";
                echo "</section>";
            }
        ?>
        <section>
            <img src="./images/blog.png">
            <h2>Accedi</h2>
            <form name="form_blog" method='post'>
                <p>
                    <label><input type="text" name="username" placeholder="Username" <?php if(isset($_POST["username"])){echo "value=".$_POST["username"];} ?> required></label>
                </p>
                <p>
                    <label><input type="password" name="password" placeholder="Password" <?php if(isset($_POST["password"])){echo "value=".$_POST["password"];} ?> required></label>
                </p>
                <p id="connected">
                    <input type='checkbox' name='check' value="1" <?php if(isset($_POST["remember"])){echo $_POST["remember"] ? "checked" : "";} ?>>
                    <span>Ricorda l'accesso</span>
                </p>
                <p>
                    <label id="submit"><input type="submit"><label>
                </p>
            </form>
        </section>
        <section>
            <p>
                Non hai un account? <a href="signup.php">Iscriviti</a>
            </p>
        </section>
    </body>
</html>