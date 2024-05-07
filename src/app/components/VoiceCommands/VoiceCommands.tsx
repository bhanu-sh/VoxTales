import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const VoiceCommands = () => {
  const router = useRouter();

  useEffect(() => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;

    recognition.onresult = (event: any) => {
      const command =
        event.results[event.results.length - 1][0].transcript.toLowerCase();
      console.log("Command:", command);
      if (command.includes("home")) {
        router.push("/");
        toast.success("Navigating to home");
      } else if (command.includes("podcast")) {
        router.push("/podcasts");
        recognition.stop();
        recognition.start();
      } else if (command.includes("genres")) {
        router.push("/podcasts/genres");
      } else if (command.includes("artist")) {
        router.push("/artists");
      } else if (command.includes("admin")) {
        router.push("/admin");
      } else if (command.includes("profile")) {
        router.push("/profile");
      } else {
        toast.error("Invalid command");
      }
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, []);

  return null;
};
export default VoiceCommands;
