import React from "react";

const NewGallery = () => {
  return (
    <div className="flex min-h-[100vh] items-center justify-center bg-zinc-900 duration-500">
      <div className="gallery-container grid h-[500px] w-[70%] grid-cols-5 transition-all duration-300">
        <div
          className="box one w-[80%] cursor-pointer bg-center bg-no-repeat object-cover text-transparent brightness-75 hover:brightness-100"
          style={{ backgroundImage: 'url("/g1.png")' }}
          data-text="Golden Layers with Highlights"
        ></div>
        <div
          className="box two w-[80%] cursor-pointer bg-center bg-no-repeat object-cover brightness-75 hover:brightness-100"
          style={{ backgroundImage: 'url("/g2.png")' }}
          data-text="Dark Roots with Blonde Waves"
        ></div>
        <div
          className="box three w-[80%] cursor-pointer bg-center bg-no-repeat object-cover brightness-75 hover:brightness-100"
          style={{ backgroundImage: 'url("/g3.png")' }}
          data-text="Edgy Undercut with Tattoo Detail"
        ></div>
        <div
          className="box four w-[80%] cursor-pointer bg-center bg-no-repeat object-cover brightness-75 hover:brightness-100"
          style={{ backgroundImage: 'url("/g4.png")' }}
          data-text="Romantic Soft Curls"
        ></div>
        <div
          className="box five w-[80%] cursor-pointer bg-center bg-no-repeat object-cover brightness-75 hover:brightness-100"
          style={{ backgroundImage: 'url("/g5.png")' }}
          data-text="Silver and Blonde Balayage Curls"
        ></div>
      </div>
    </div>
  );
};

export default NewGallery;
