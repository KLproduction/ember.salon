import React from "react";

const PaddingWarpper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">{children}</div>
  );
};

export default PaddingWarpper;
