import inquirer from 'inquirer';
import sillyName from 'sillyname';
import {randomSuperhero} from 'superheroes';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      type: 'input',
      name: 'userName',
      message: 'What is your name?'
    }
  ])
  .then(answers => {
    const userName = answers.userName;
    const villainName = sillyName();
    const superheroName = randomSuperhero();

    console.log(`Hello ${userName}`);
    console.log(`your villain name will be ${villainName}`);
    console.log(`and your superhero name will be ${superheroName}`);

    const names = [
      { text: userName, file: 'name.png' },
      { text: villainName, file: 'sillyname.png' },
      { text: superheroName, file: 'superheroname.png' }
    ];

    names.forEach(item => {
      const qr_png = qr.image(item.text, { type: 'png' });
      qr_png.pipe(fs.createWriteStream(item.file));
    });

    const fileContent = `Name: ${userName}\nVillain Name: ${villainName}\nSuperhero Name: ${superheroName}\n`;

    fs.writeFile('myhero.txt', fileContent, err => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('\nQR codes are generated');
        console.log('Text file updated');
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error('Prompt couldn’t be rendered in the current environment.');
    } else {
      console.error('Error:', error);
    }
  });