import fs from "fs";
import path from "path";

export const GET = async (req) => {
  try {
    const transcripts = await getAllTranscripts();
    return new Response(JSON.stringify(transcripts), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch transcripts", { status: 500 });
  }
};

async function getAllTranscripts() {
  const dbFilePath = path.join(process.cwd(), "db", "transcripts.json");
  console.log("Reading transcripts from " + dbFilePath);
  if (fs.existsSync(dbFilePath)) {
    const data = fs.readFileSync(dbFilePath);
    return JSON.parse(data);
  } else {
    console.log("No transcripts found at " + dbFilePath);
  }
  return [];
}
