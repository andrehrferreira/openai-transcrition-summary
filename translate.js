const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "",
});

(async () => {
    const filePath = "audios/1.mp3";

    const openai = new OpenAIApi(configuration);

    try{
        const transcription = await openai.createTranscription(fs.createReadStream('./audios/1.m4a'), 'whisper-1', undefined, undefined, undefined, undefined, {
            maxBodyLength: 1024*1024*1024
        });

        fs.writeFileSync("1.json", transcription.data.text);
    }
    catch(e){
        console.log(e.message);
    }
})();

