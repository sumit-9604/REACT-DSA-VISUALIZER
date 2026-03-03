/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
function Arrow(){
    return(
        <motion.div
            initial={{width:0}}
            animate={{width:60}}
            transition={{duration:0.5}}>

            <div>

            </div>

        </motion.div>
    );
}
export default Arrow;