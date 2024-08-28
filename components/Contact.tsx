import React from "react";
import Map from "./map";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";

const Contact = () => {
  return (
    <div className="flex min-h-[100vh] w-full flex-col bg-zinc-800 bg-fixed bg-center bg-no-repeat object-cover text-zinc-50">
      <div className="flex w-full justify-center text-3xl sm:text-6xl">
        <h1 className="my-20 p-10 text-yellow-600">CONTACT US</h1>
      </div>
      <div className="sm:w-/ flex h-[100vh] min-h-screen w-full flex-col items-center justify-center md:ml-10 md:flex-row">
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
        {/* <div className="m-5 flex h-[80%] w-[80%] flex-col items-center justify-center gap-5">
          <Card className="p-5backdrop-blur-md m-5 w-full">
            <CardHeader className="ml-10">
              Contact:
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-start font-bold">
              <div className="flex w-full items-center justify-between">
                <div>Telephone:</div>
                <div> 01234-567-890</div>
              </div>
              <div className="flex w-full items-center justify-between">
                <span>Whatsapp:</span>
                <span> 01234-567-890</span>
              </div>
            </CardContent>
          </Card>
          <Card className="m-5 w-full p-5">
            <CardHeader className="ml-10">
              <CardDescription>Address</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-start">
              <span>311 King"s Road</span>
              <span>Chelsea</span>
              <span>London</span>
              <span>SW3 5EP</span>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader className="ml-10">
              <CardDescription>
                <span>Opening Hours:</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <span>Monday - Sunday, 10am - 7pm</span>
            </CardContent>
          </Card>
        </div> */}
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
