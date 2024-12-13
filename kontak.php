<?php include 'header.php'; ?>
<main>
    <h2>Kontak Kami</h2>
    <form action="send_message.php" method="post">
        <label for="name">Nama:</label>
        <input type="text" id="name" name="name" required>
        <br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <br>
        <label for="message">Pesan:</label>
        <textarea id="message" name="message" required></textarea>
        <br>
        <button type="submit">Kirim</button>
    </form>
</main>
<?php include 'footer.php'; ?>
