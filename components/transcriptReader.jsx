"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sun, Moon, Cloud, CopyIcon, CopyCheckIcon } from "lucide-react";
const readingThemes = {
  light: "bg-amber-50 text-gray-900",
  sepia: "bg-yellow-100 text-gray-900",
  dark: "bg-gray-900 text-gray-100",
};

export default function TranscriptReader({ transcript, responseFormat }) {
  const [readingTheme, setReadingTheme] = useState("light");
  const [copied, setCopied] = useState(false);
  function copyToClipboard() {
    navigator.clipboard.writeText(transcript).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (
    (responseFormat && responseFormat === "json") ||
    responseFormat === "verbose_json"
  ) {
    transcript = JSON.stringify(transcript, null, 2);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transcript</CardTitle>
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setReadingTheme("light")}
              className={readingTheme === "light" ? "bg-amber-200" : ""}
            >
              <Sun className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setReadingTheme("sepia")}
              className={readingTheme === "sepia" ? "bg-yellow-200" : ""}
            >
              <Cloud className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setReadingTheme("dark")}
              className={readingTheme === "dark" ? "bg-gray-600" : ""}
            >
              <Moon className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="icon" onClick={copyToClipboard}>
            {!copied && <CopyIcon className="h-4 w-4" />}
            {copied && <CopyCheckIcon className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`p-6 rounded-lg ${readingThemes[readingTheme]}`}>
          <p className="font-serif text-lg  leading-relaxed overflow-hidden break-words w-full  p-4">
            {transcript}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
