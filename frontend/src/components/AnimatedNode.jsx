/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

function AnimatedNode({ value}) {
    return(
        <motion.div
            layout
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{ scale:0}}
            transition={{ duration : 0.4}}
            className="node">

            {value}

        </motion.div>
    );
}

export default AnimatedNode;