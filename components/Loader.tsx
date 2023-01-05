import { FC } from "react";

const Loader: FC = () => {
  return (
    <div className="w-full min-h-[calc(100vh-144px)] flex justify-center items-center opacity-0 animate-[fade-in_0.3s_linear_0.5s_forwards]">
      <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100"></div>
      </div>
    </div>
  );
};

export default Loader;
