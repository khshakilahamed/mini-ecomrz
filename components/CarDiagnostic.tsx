import React from "react";
import CarDiagnosticImage from "../assets/car-diagnostic.png";
import Image from "next/image";

import { FaPoundSign } from "react-icons/fa";

const CarDiagnostic = () => {
  return (
    <div className="container-1200 py-16 sm:py-20 border-b">
      <div className="text-center space-y-2 sm:space-y-3">
        <h3 className="text-sm sm:text-xl lg:text-2xl capitalize text-primary-foreground">
          Car Diagnostic
        </h3>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white text-bold">Tools and Scanners</h2>
      </div>               

      <div className="flex flex-col sm:flex-row items-center gap-5 lg:gap-12 mt-10 sm:mt-16 lg:mt-20">
        <div className="sm:w-1/2">
          <Image src={CarDiagnosticImage} alt="car-diagnostic" />
        </div>
        <div className="sm:w-1/2 space-y-5">
          <h2 className="text-primary-foreground sm:text-xl lg:text-[27px] font-semibold text-wrap">
            <FaPoundSign className="text-secondary-foreground text-2xl lg:text-3xl inline" /> Save
            money and diagnose faults
          </h2>
          <p className="text-secondary-foreground text-base lg:text-lg">
            A car diagnostic scan from your local dealership could cost up to
            £100 + VAT. Why not buy a scanner and do it yourself? They are easy
            to use. The scanner will pay for itself. You can then present the
            findings to your local mechanic who won’t have to run a diagnostics
            scan, thus saving time and money.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarDiagnostic;
