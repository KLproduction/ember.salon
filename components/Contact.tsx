import React from "react";
import Map from "./map";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";

const Contact = () => {
  return (
    <div className="flex min-h-[100vh] w-screen flex-col bg-zinc-800 bg-fixed bg-center bg-no-repeat object-cover text-zinc-50">
      <div className="flex w-full justify-center text-3xl sm:text-6xl">
        <h1 className="my-20 p-10 text-yellow-600">CONTACT US</h1>
      </div>
      <div className="flex h-[100vh] min-h-screen w-full flex-col items-center justify-center md:ml-10 md:flex-row">
        <div className="flex items-start justify-between gap-10 sm:flex-col">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-xl font-black text-yellow-600">Address:</h1>
            <div className="flex flex-col items-start justify-between">
              <p>Westminster</p>
              <p>London</p>
              <p>SW1A 2PW</p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-xl font-black text-yellow-600">Contact:</h1>
            <div className="flex flex-col items-start justify-between gap-3">
              <div className="flex flex-col items-start justify-between">
                <div>Telephone:</div>
                <div> 01234-567-890</div>
              </div>
              <div className="flex flex-col items-start justify-between">
                <div>Whatsapp:</div>
                <div> 01234-567-890</div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-5 flex h-full w-full items-center justify-center">
          <div className="h-[70%] min-h-[50vh] w-[70%]">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
