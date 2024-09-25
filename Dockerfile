FROM node:18

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

RUN apt-get update && apt-get install -y wget && wget https://huggingface.co/Mozilla/whisperfile/resolve/main/whisper-tiny.llamafile?download=true -O /app/whisper-tiny.llamafile && chmod +x /app/whisper-tiny.llamafile

EXPOSE 3000
EXPOSE 8080

CMD ["sh","-c","/app/whisper-tiny.llamafile & npm run dev"]

