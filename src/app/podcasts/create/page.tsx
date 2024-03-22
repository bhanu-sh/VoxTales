"use client";
import * as React from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import Link from "next/link";
import { SingleImageDropzone } from "@/lib/components/SingleImageDropzone";

export default function Page() {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();
  const { edgestore } = useEdgeStore();
  return (
    <div className="flex flex-col items-center m-6 gap-2">
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 1,
        }}
        onChange={(file) => {
          setFile(file);
        }}
      />
      <div className="h-[6px] w-44 border rounded overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-300 ease-in-out"
          style={{
            width: `${progress}%`
          }}
        />
      </div>
      <button
        className="bg-white text-black rounded px-4 hover:opacity-80"
        onClick={async () => {
          if (file) {
            const res = await edgestore.myPublicImages.upload({ 
              file,
              onProgressChange : (progress) => {
                setProgress(progress);
              }
            });
            // save data
            setUrls({
              url: res.url,
              thumbnailUrl: res.thumbnailUrl,
            });
          }
        }}
      >
        Upload
      </button>
      {urls?.url && (
        <Link href={urls.url} target="_blank">
          URL
        </Link>
      )}
      {urls?.thumbnailUrl && (
        <Link href={urls.thumbnailUrl} target="_blank">
          Thumbnail URL
        </Link>
      )}
    </div>
  );
}
