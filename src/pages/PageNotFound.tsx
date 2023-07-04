import React from "react";
import { useNavigate } from "react-router-dom";
import logo404 from "assets/404.png";
import arrowBack from "assets/arrowBack.png";
import { Button } from "@/components/button";

export const PageNotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex items-center justify-center flex-col bg-black text-white">
      <div className="max-w-4xl mx-auto text-center">
        <img src={logo404} alt="notfound" className="max-w-xs mx-auto mb-8" />
        <h1 className="text-6xl font-bold mb-4">
          404 - Looks like you're lost.
        </h1>
        <p className="max-w-lg mx-auto mb-8">
          Maybe this page used to exist or you just spelled something wrong.
          Chances are you spelled something wrong, so can you double check the
          URL?
        </p>
        <div className="flex justify-center items-center">
          <img src={arrowBack} alt="notfound" className=" w-28 h-28" />
          <Button
            kind="primary"
            size="medium"
            handle={() => navigate("/")}
            className="px-8 py-4 text-white rounded-lg bg-teal2 hover:bg-teal0 shadow-inner font-medium bg-gradient-to-tr from-primary to-secondary"
          >
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
