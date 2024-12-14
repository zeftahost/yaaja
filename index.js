const { Client } = require('ssh2');
const FardanDev = require('some-messaging-library'); // Ganti dengan library yang Anda gunakan untuk mengirim pesan.

async function installServer(m, text, example, getRandom) {
  if (!isCreator) return Reply(mess.owner);
  if (!text) return m.reply(example("ipvps|pwvps|panel.com|node.com|ramserver *(contoh 100000)*"));

  let vii = text.split("|");
  if (vii.length < 5) return m.reply(example("ipvps|pwvps|panel.com|node.com|ramserver *(contoh 100000)*"));

  const connSettings = {
    host: vii[0],
    port: '22',
    username: 'root',
    password: vii[1]
  };

  const passwordPanel = "admin" + getRandom("");
  const domainPanel = vii[2];
  const domainNode = vii[3];
  const ramServer = vii[4];
  const commandPanel = `bash <(curl -s https://pterodactyl-installer.se)`;

  const ress = new Client();

  const installWings = async () => {
    ress.exec(commandPanel, (err, stream) => {
      if (err) throw err;
      stream.on('close', async () => {
        ress.exec('bash <(curl -s https://raw.githubusercontent.com/SkyzoOffc/Pterodactyl-Theme-Autoinstaller/main/createnode.sh)', (err, stream) => {
          if (err) throw err;
          stream.on('close', async () => {
            const teks = `
*Berikut Detail Akun Panel :*

* *Username :* admin
* *Password :* ${passwordPanel}
* *Domain :* ${domainPanel}

*Note :* Silahkan Buat Allocation & Ambil Token Wings Di Node Yang Sudah Dibuat Oleh Bot Untuk Menjalankan Wings

*Cara Menjalankan Wings :*
ketik *.startwings* ipvps|pwvps|tokenwings
`;
            await FardanDev.sendMessage(m.chat, { text: teks }, { quoted: m });
          }).on('data', (data) => {
            const log = data.toString();
            console.log(log);

            if (log.includes("Masukkan nama lokasi: ")) stream.write('Singapore\n');
            if (log.includes("Masukkan deskripsi lokasi: ")) stream.write('Node By Skyzo\n');
            if (log.includes("Masukkan domain: ")) stream.write(`${domainNode}\n`);
            if (log.includes("Masukkan nama node: ")) stream.write('Node By Skyzo\n');
            if (log.includes("Masukkan RAM (dalam MB): ")) stream.write(`${ramServer}\n`);
            if (log.includes("Masukkan jumlah maksimum disk space (dalam MB): ")) stream.write(`${ramServer}\n`);
            if (log.includes("Masukkan Locid: ")) stream.write('1\n');
          }).stderr.on('data', (data) => console.error('Stderr: ' + data));
        });
      });
    });
  };

  const installPanel = async () => {
    ress.exec(commandPanel, (err, stream) => {
      if (err) throw err;
      stream.on('close', async () => await installWings())
        .on('data', (data) => {
          const log = data.toString();
          console.log(log);

          if (log.includes('Input 0-6')) stream.write('0\n');
          if (log.includes('(y/N)')) stream.write('y\n');
          if (log.includes('Database name (panel)')) stream.write('\n');
          if (log.includes('Database username (pterodactyl)')) stream.write('admin\n');
          if (log.includes('Password (press enter to use randomly generated password)')) stream.write('admin\n');
          if (log.includes('Select timezone [Europe/Stockholm]')) stream.write('Asia/Jakarta\n');
          if (log.includes('Provide the email address that will be used to configure Let\'s Encrypt and Pterodactyl')) stream.write('admin@gmail.com\n');
          if (log.includes('Email address for the initial admin account')) stream.write('admin@gmail.com\n');
          if (log.includes('Username for the initial admin account')) stream.write('admin\n');
          if (log.includes('First name for the initial admin account')) stream.write('admin\n');
          if (log.includes('Last name for the initial admin account')) stream.write('admin\n');
          if (log.includes('Password for the initial admin account')) stream.write(`${passwordPanel}\n`);
          if (log.includes('Set the FQDN of this panel (panel.example.com)')) stream.write(`${domainPanel}\n`);
          if (log.includes('Do you want to automatically configure UFW (firewall)')) stream.write('y\n');
          if (log.includes('Do you want to automatically configure HTTPS using Let\'s Encrypt? (y/N)')) stream.write('y\n');
        }).stderr.on('data', (data) => console.error('Stderr: ' + data));
    });
  };

  ress.on('ready', async () => {
    await m.reply("Memproses *install* server panel \nTunggu 1-10 menit hingga proses selesai");
    ress.exec('', async (err, stream) => {
      if (err) throw err;
      stream.on('close', async () => await installPanel());
    });
  }).connect(connSettings);
}
