/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

function Node({ value, highlight }) {
  return (
    <motion.div
      className="node"
      initial={{ scale: 0 }}
      animate={{ scale: 1, backgroundColor: highlight ? "#ff6b6b" : "#4ecdc4" }}
      transition={{ duration: 0.3 }}
    >
      {value}
    </motion.div>
  );
}

export default Node;
