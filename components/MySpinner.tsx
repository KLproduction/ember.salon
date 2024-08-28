import { motion } from "framer-motion";
import { AiOutlineLoading } from "react-icons/ai";

const MySpinner = () => {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="animate-spin text-6xl text-green-500">
        <AiOutlineLoading />
      </div>
    </div>
  );
};

export default MySpinner;
