import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import GenreCards from "@/app/components/GenreCards/GenreCards";

export default function PodcastsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Genres</h1>
      <GenreCards />
    </div>
  );
}
