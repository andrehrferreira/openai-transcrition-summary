const fs = require('fs');
const readline = require('readline');
const { Configuration, OpenAIApi } = require('openai');
let chunks = [];
let chunk = [];

const filename = './transcricao/7 - Abstraindo a linguagem.txt';
const filenameOutput = './resumo/7 - Abstraindo a linguagem.txt';

const rl = readline.createInterface({
    input: fs.createReadStream(filename),
    output: process.stdout,
    terminal: false
});
const configuration = new Configuration({
  apiKey: '',
});
const openai = new OpenAIApi(configuration);

rl.on('line', (line) => {
    if (chunk.length < 100) {
        chunk.push(line);
    } else {
        chunks.push(chunk);
        chunk = [line];
    }
});

rl.on('close', () => {
    if (chunk.length > 0) {
        chunks.push(chunk);
    }
    chunks.forEach(async (chunk) => {
        const message = chunk.join('\n');
        const completion = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo-16k',

          messages: [
            {
                'role': 'system',
                'content': 'The user enters an audio text transcript and you must create an objective summary based on the Brazilian Portuguese transcript.'
            },
            {
                'role': 'user',
                'content': message
            }
        ],
        });

        fs.appendFileSync(filenameOutput, `${completion.data.choices[0].message.content}\r\n\r\n`);
    });
});
