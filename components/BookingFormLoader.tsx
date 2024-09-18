import { motion } from "framer-motion";
import { AiOutlineLoading } from "react-icons/ai";

const BookingFormLoader = () => {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-10 bg-transparent backdrop-blur-md">
      <div className="flex items-center justify-center">
        <h1 className="text-2xl text-zinc-50">Checking Available TimeSlot</h1>
      </div>
      <div className="animate-spin text-6xl text-yellow-500">
        <AiOutlineLoading />
      </div>
    </div>
  );
};

export default BookingFormLoader;
