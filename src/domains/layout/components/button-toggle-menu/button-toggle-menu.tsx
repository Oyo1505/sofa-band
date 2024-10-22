import * as React from "react";
import { motion, SVGMotionProps } from "framer-motion";

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props} 
  />
);

export const MenuToggle = ({ toggle } : { toggle :() => void}) => (
  <button onClick={toggle} className="rounded-xl h-14 w-14 top-3.5 left-7 z-20 cursor-pointer absolute">
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          initial: { d: "M 2 2.5 L 20 2.5"  },  
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          initial: { d: "M 2 16.346 L 20 16.346"  },
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </button>
);
