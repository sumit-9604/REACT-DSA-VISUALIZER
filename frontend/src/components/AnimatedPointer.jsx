/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

function AnimatedPointer(){
    return(
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            className="pointer">

            →
        </motion.div>
    );
}

export default AnimatedPointer;