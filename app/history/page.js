"use client";
import React, { useState, useEffect } from "react";

import TranscriptReader from "@/components/transcriptReader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp } from "lucide-react";

const fetchTranscriptData = async () => {
  try {
    const response = await fetch("/api/getalltranscripts");
    const transcripts = await response.json();
    return transcripts; // Add more transcript entries as needed
  } catch (error) {
    return [];
  }
};

const TranscriptItem = ({ transcript }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && !transcript.transcript) {
      // Fetch the transcript text when the collapsible is opened
      setTranscriptText(transcript.transcript);
    }
  }, [isOpen, transcript.file, transcript.transcript]);

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{transcript.file}</CardTitle>
          <div className="flex items-center space-x-2">
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Transcribed on: {new Date(transcript.date).toDateString()}
        </p>
      </CardHeader>
      <CollapsibleContent>
        <CardContent>
          <audio
            controls
            src={`/audio/uploads/${transcript.file}`}
            className="w-full mb-4"
          />

          <TranscriptReader
            transcript={transcript.transcript}
            responseFormat={transcript.responseFormat}
          />
        </CardContent>
      </CollapsibleContent>
    </Card>
  );
};

export default function TranscriptsPage() {
  const [transcripts, setTranscripts] = useState([]);

  useEffect(() => {
    fetchTranscriptData().then((data) => setTranscripts(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Transcripts</h1>
      <div className="space-y-4">
        {transcripts.map((transcript, index) => (
          <Collapsible key={index}>
            <TranscriptItem transcript={transcript} />
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
