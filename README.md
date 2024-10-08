# Voice Print AI

![Voice Print AI](/public/projectimages/voiceprint.png)

## Introduction

Voice Print AI is a project that uses Whisperfile to generate transcripts from audio files **completely locally on your system**.

![Voice Print AI](/public/projectimages/voiceprint-ai-1.png)

Read more about the Whisperfile at link [Mozilla/whisperfile](https://huggingface.co/Mozilla/whisperfile).

> Whisperfile is a high-performance implementation of OpenAI's Whisper created by Mozilla Ocho as part of the llamafile project, based on the whisper.cpp software written by Georgi Gerganov, et al.

## Why

This project can be used to generate transcripts where privacy is a concern. The audio files are processed locally on your system and no data is sent to any server. This can include sensitive information like medical records, legal data, etc.

## Docker Version

You can run the Docker version of this project by running the following commands. This way you don't have to worry about dealing with the code or the dependencies.

```bash
docker pull dbanswan/voice-print-ai
mkdir -p audio db
docker run -p 3000:3000 -p 8080:8080 -v $(pwd)/audio:/app/public/audio/uploads -v $(pwd)/db:/app/db dbanswan/voice-print-ai
```

Open your browser and go to `http://localhost:3000` to use the application.

The Whisperfile server will be available on `http://localhost:8080`.

You can also run just the Whisperfile server using the following command.

```bash
docker pull dbanswan/whisper-tiny-server
docker run -p 8080:8080 dbanswan/whisper-tiny-server
```

Both images are based on tiny model to keep the size small.

## Run the project locally

1. Clone the repository

```

git clone https://github.com/dbanswan/voiceprint-ai.git

```

2. Install the dependencies

```

npm install

```

3. Go to [Hugging Face](https://huggingface.co/Mozilla/whisperfile/tree/main) and download the model files.

   ![Download the model files](/public/projectimages/hugging-face-whisperfile.png)

   I would suggest downloading "whisper-tiny.llamafile" it is around 315 MB and works great for most part. But feel free to download the other models as well the larger the model the better the results. But they would need more resources to run.

4. Go the folder where you downloaded the model file.

```

# make it executable

chmod +x whisper-tiny.llamafile

```

5. And then run it with the following command

```

./whisper-tiny.llamafile

```

![Run the model](/public/projectimages/run-whisperfile.png)

As you can see the model will start a server on port 8080. And this what we are going to call from our app. **You can download any model and run it the same way**.

6. Run the app

```

npm run dev

```

No keys or API tokens are required to run this project.

## How it works

1. Select the audio
   ![Select the audio](/public/projectimages/voiceprint-select-file.png)
   <br>
2. Press the "Transcribe" button
   <br>
   ![Press the transcribe button](/public/projectimages/voiceprint-transcribe.png)
   <br>
3. You can go to "History" tab to see the all the transcripts that you have generated.
   <br>
   ![History](/public/projectimages/voiceprint-history.png)

4. It also comes with audio player so you can listen to the audio as well while reading the transcript.

![Audio player](/public/projectimages/voiceprint-audio-player.png)

5. The history is stored in a simple JSON file inside the db folder. Feel free to switch to let's say sqlite or any other database. This is done to keep things simple and not to add any extra dependencies.

6. The audio files are stored in the public/audio/uploads folder.

7. Also for advance users it also exports the transcript in JSON, Verbose json, VTT, SRT format. This can be used to integrate with other systems.

![Export JSON](/public/projectimages/voiceprint-exports.png)
