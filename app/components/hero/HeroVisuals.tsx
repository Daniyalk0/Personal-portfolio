// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";

// export default function HeroVisual() {
//   return (
//     <div
//       aria-hidden="true"
//       className="
//         pointer-events-none absolute
//         z-10

//         bottom-20

//         left-0
//         w-full

//         sm:bottom-0
//         sm:left-1/2
//         sm:w-[min(70vw,600px)]
//         sm:-translate-x-1/2

//         lg:left-1/2
//         lg:w-[min(38vw,560px)]
//         lg:-translate-x-1/2
//       "
//     >
//       <motion.div
//         initial={{
//           opacity: 0,
//           y: 80,
//           scale: 0.97,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//           scale: 1,
//         }}
//         transition={{
//           duration: 0.9,
//           ease: [0.22, 1, 0.36, 1],
//           delay: 2.8,
//         }}
//         className="
//           relative
//           aspect-[3/4]
//           w-full
//           overflow-hidden

//           sm:aspect-[3/4]
//         "
//       >
//         <Image
//           src="/daniyal-portrait.png"
//           alt=""
//           fill
//           sizes="
//             (max-width: 639px) 58vw,
//             (max-width: 1023px) 45vw,
//             34vw
//           "
//           className="
//             object-cover 
//           "
//           priority
//         />
//       </motion.div>
//     </div>
//   );
// }

import React from 'react'

const HeroVisuals = () => {
  return (
    <div>HeroVisuals</div>
  )
}

export default HeroVisuals