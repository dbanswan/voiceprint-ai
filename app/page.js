"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { AudioLines, InfoIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import TranscriptReader from "@/components/transcriptReader";

export default function ModernForm() {
  const [file, setFile] = useState(null);
  const [temperature, setTemperature] = useState(0.5);
  //const [temperatureInc, setTemperatureInc] = useState("");
  const [responseFormat, setResponseFormat] = useState("text");
  //const [model, setModel] = useState("");
  const [transcript, setTranscript] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file.");
      return;
    }
    // get the full path of the file

    const formData = new FormData();
    formData.append("file", file);
    formData.append("temperature", temperature);
    formData.append("temperature_inc", "0.2");
    formData.append("response_format", responseFormat);

    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to fetch from external service");
      }

      let data = await res.json();
      //console.log("data : ", data);
      setTranscript(data.transcript);
    } catch (error) {
      console.error("Error:", error);
      alert("Error processing request");
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4 backdrop-blur-lg">
      <Card>
        <CardHeader>
          <CardTitle>Voiceprint</CardTitle>
          <CardDescription>Transcribe any audio file locally</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file">File</Label>
              <Input
                id="file"
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setTranscript("");
                }}
                className="dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-x-2">
                <Label htmlFor="temperature">
                  Temperature: {temperature.toFixed(2)}{" "}
                </Label>
                <HoverCard>
                  <HoverCardTrigger>
                    <InfoIcon className="h-4 w-4" />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    Temperature is a parameter in a large language model (LLM)
                    that controls the randomness of the output. It&apos;s often
                    set between 0 and 1. <br />
                    <br />
                    <span className="font-semibold">Low Temperature</span> : The
                    model is more likely to choose the most predictable words,
                    resulting in more deterministic and conservative outputs.{" "}
                    <br />
                    <br />
                    <span className="font-semibold">High temperature</span> :
                    The model is more likely to choose less likely words,
                    resulting in more varied and creative outputs.
                  </HoverCardContent>
                </HoverCard>
              </div>
              <Slider
                id="temperature"
                min={0}
                max={1}
                step={0.01}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
              />
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="temperatureInc">Temperature Increment</Label>
              <Input
                id="temperatureInc"
                type="number"
                placeholder="Enter temperature increment"
                value={temperatureInc}
                onChange={(e) => setTemperatureInc(e.target.value)}
              />
            </div> */}
            <div className="space-y-2">
              <Label htmlFor="responseFormat">Response Format</Label>
              <Select value={responseFormat} onValueChange={setResponseFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select response format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="verbose_json">Verbose JSON</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>

                  <SelectItem value="srt">SRT</SelectItem>
                  <SelectItem value="vtt">VTT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="model1">Model 1</SelectItem>
                  <SelectItem value="model2">Model 2</SelectItem>
                  <SelectItem value="model3">Model 3</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
            <Button type="submit" className="w-full">
              <AudioLines className="mr-2 h-4 w-4" /> Transcribe
            </Button>
          </form>
        </CardContent>
      </Card>

      {transcript && <TranscriptReader transcript={transcript} />}
    </div>
  );
}
