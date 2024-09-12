import fs from "fs";
import path from "path";

export const POST = async (req) => {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const fileName = file.name;

    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }

    const filePath = await uploadFile(file);
    if (!filePath) {
      return new Response("Failed to upload file", { status: 500 });
    }

    const transcription = await transcribeFile(formData, filePath);
    if (!transcription) {
      return new Response("Failed to transcribe file", { status: 500 });
    }

    const saved = await saveTranscript(transcription, formData, fileName);

    return new Response(JSON.stringify({ transcript: transcription }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("File upload failed", { status: 500 });
  }
};

async function uploadFile(file) {
  try {
    const uploadDir = path.join(process.cwd(), "public", "audio", "uploads");
    fs.mkdirSync(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    const fileBuffer = await file.arrayBuffer();
    const fileData = Buffer.from(fileBuffer);
    fs.writeFileSync(filePath, fileData);
    return filePath;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function transcribeFile(formData, filePath) {
  try {
    // modify the form data to include the file path
    formData.set("file", filePath);
    const res = await fetch("http://127.0.0.1:8080/inference", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to fetch from external service");
    }

    const responseFormat = formData.get("response_format");
    if (responseFormat === "json" || responseFormat === "verbose_json") {
      return await res.json();
    } else {
      return await res.text();
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function saveTranscript(transcriptText, formData, fileName) {
  try {
    // Create the transcript object
    const transcript = {
      file: fileName,
      transcript: transcriptText,
      temperature: formData.get("temperature"),
      responseFormat: formData.get("response_format"),
      temperature_inc: formData.get("temperature_inc"),
      date: new Date().toISOString(),
    };

    const transcriptDir = path.join(process.cwd(), "db", "transcripts.json");

    let transcripts = [];
    if (fs.existsSync(transcriptDir)) {
      const data = fs.readFileSync(transcriptDir);
      transcripts = JSON.parse(data);
    }
    // Add the new transcript to the list
    transcripts.push(transcript);
    fs.writeFileSync(transcriptDir, JSON.stringify(transcripts, null, 2));
  } catch (error) {
    console.error(error);
  }
  return true;
}
