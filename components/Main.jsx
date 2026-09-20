import { useState, useEffect } from "react";

export default function Main() {
  const [meme, setMeme] = useState({
    topText: "one doees not simply",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });
  function handleChange(event) {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

  const [allMemes, setAllMemes] = useState([]);
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function handleGetMemeImage() {
    const randomIdx = Math.floor(Math.random() * allMemes.length);
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        imageUrl: allMemes[randomIdx].url,
      };
    });
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            placeholder={meme.topText}
            type="text"
            name="topText"
            onChange={handleChange}
          ></input>
        </label>

        <label>
          Bottom Text
          <input
            placeholder={meme.bottomText}
            type="text"
            name="bottomText"
            onChange={handleChange}
          ></input>
        </label>
        <button onClick={handleGetMemeImage}>Get a new meme image 🖼</button>
      </div>

      <div className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
