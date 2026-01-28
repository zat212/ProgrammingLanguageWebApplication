import React, { useEffect } from "react";

const TenorGifHappy = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); 
    };
  }, []);

  return (
    <div
      className="tenor-gif-embed"
      data-postid="10626911"
      data-share-method="host"
      data-aspect-ratio="0.801205"
      data-width="100%"
    >
      <a href="https://tenor.com/view/multiversus-tom-and-jerry-frying-pan-hit-smack-gif-12977816539901892459">
        Multiversus Tom And Jerry Sticker
      </a>{" "}
      from{" "}
      <a href="https://tenor.com/search/multiversus-stickers">
        Multiversus Stickers
      </a>
    </div>
  );
};

export default TenorGifHappy;
