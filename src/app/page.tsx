import GenreCards from "./components/GenreCards/GenreCards"; 

export default function Home() {
  return (
    <div>
      <h1 className="logo1">
        Vox<span className="logo2">Tales</span>
      </h1>
      <h3 className="tagline">
        Elevating Storytelling with Fully Voice-Operated Podcasts
      </h3>
      <GenreCards />
    </div>
  );
}
