import { useEffect, useState } from "react";

const Toast = ({ toast, setToast }) => {
  const [isShow, setShow] = useState(false);
  
  const toastStyle = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500"
}
  
  useEffect(() => {
    if (toast) {
      setShow(true);

      const timer = setTimeout(() => {
        setShow(false);
        setToast(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div
      className={`fixed top-4 z-50 transition-all duration-300 p-2.5 rounded 
        ${ isShow ? "right-4" : "-right-20" } 
        ${toastStyle[toast?.type]}
      `}
    >
      {toast?.message}
    </div>
  );
};

export default Toast;