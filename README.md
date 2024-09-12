# Voice Print AI

## Introduction

Voice Print AI is a project that uses Whisperfile to generate transcripts from audio files **completely locally on your system**.

![Voice Print AI](/public/projectimages/voiceprint-ai-1.png)

Read more about the Whisperfile at link [Mozilla/whisperfile](https://huggingface.co/Mozilla/whisperfile).

> Whisperfile is a high-performance implementation of OpenAI's Whisper created by Mozilla Ocho as part of the llamafile project, based on the whisper.cpp software written by Georgi Gerganov, et al.

## Why

This project can be used to generate transcripts where privacy is a concern. The audio files are processed locally on your system and no data is sent to any server. This can include sensitive information like medical records, legal data, etc.

## How to use

1. Clone the repository

```
git clone ""
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

2. Press the "Transcribe" button
   ![Press the transcribe button](/public/projectimages/voiceprint-transcribe.png)
3. You can to "History" to see the all the transcripts that you have generated.

   ![History](/public/projectimages/voiceprint-history.png)

4. It also comes with audio player so you can listen to the audio as well.

   ![Audio player](/public/projectimages/voiceprint-audio-player.png)

5. The history is stored in a simple JSON file inside the db folder. Feel free to switch to let's say sqlite or any other database. This is done to keep things simple and not to add any extra dependencies.

6. The audio files are stored in the public/audio/uploads folder.

## WIP & Future features

1. **Make it a desktop app**. This is the most important feature that I would like to add. This will make it easier for the user to use the app. And they don't have to worry about running the whisperfile server separately. Helps less technical users to use the app or those who do not like the complexity of running the server separately.
2. Only save to history if the user chooses to save it. Currently, it saves all the transcripts to the history.
3. Option to delete the transcripts from the history.
