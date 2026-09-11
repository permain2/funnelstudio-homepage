import { useRef, useState } from "react";

// The film under the hero, the way BabyLoveGrowth and Wistia frame theirs:
// a poster in a rounded frame with one play control, then the real player
// with sound. Nothing autoplays — this one has a voice, so the visitor asks.
const root = `${import.meta.env.BASE_URL}video/`;

export default function FilmHero() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const play = () => {
    setOn(true);
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.play().catch(() => {});
  };
  return (
    <section className="fh" aria-label="FunnelStudio in 38 seconds">
      <figure className={`fh-frame${on ? " is-on" : ""}`}>
        <video
          ref={ref}
          className="fh-video"
          controls={on}
          playsInline
          preload="metadata"
          poster={`${root}promo-poster.webp`}
          width="1920"
          height="1080"
          onEnded={() => setOn(false)}
        >
          <source src={`${root}promo.mp4`} type="video/mp4" />
        </video>
        {!on && (
          <button type="button" className="fh-play" onClick={play}>
            <span className="fh-play-ring" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
            <span className="fh-play-text">
              <b>Watch the film</b>
              <small>0:38 · with sound</small>
            </span>
          </button>
        )}
      </figure>
    </section>
  );
}
