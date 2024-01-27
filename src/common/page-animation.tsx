import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { PropsWithChildren } from "react";

type AnimationWrapperProps = PropsWithChildren & {
          initial?: HTMLMotionProps<'div'>['initial'],
          animate?: HTMLMotionProps<'div'>['animate'],
          transition?: HTMLMotionProps<'div'>['transition'],
          keyValue?: string,
          className?: string
}

export default function AnimationWrapper({
          children,
          keyValue,
          className,
          initial = { opacity: 0 },
          animate = { opacity: 1 },
          transition = { duration: 1 }
}: AnimationWrapperProps) {
          return (
                    <AnimatePresence>
                              <motion.div
                                        key={keyValue}
                                        initial={initial}
                                        animate={animate}
                                        transition={transition}
                                        className={className}
                              >
                                        {children}
                              </motion.div>
                    </AnimatePresence>
          )
}