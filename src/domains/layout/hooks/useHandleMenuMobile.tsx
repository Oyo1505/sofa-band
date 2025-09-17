import { useCallback, useState } from "react";

const useHandleMenuMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenuMobile = useCallback(() => setIsOpen(true), []);
  const closeMenuMobile = useCallback(() => setIsOpen(false), []);
  const toggleMenuMobile =  useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    openMenuMobile,
    closeMenuMobile,
    toggleMenuMobile,
    isOpen,
    setIsOpen
  }
}


export default useHandleMenuMobile