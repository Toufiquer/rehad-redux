import React from "react";

const NotFound = () => {
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="px-3 md:lg:xl:px-40  py-20 bg-opacity-10">
            <div className="font-thin mt-12">
              <div className="text-7xl ">Ops! Nothing was found.</div>
              <div className="text-4xl mt-8 md:ml-[600px]">
                Please Try again
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
