const ButtonGroup = ({ children }) => {
  return (
    <div className="fixed top-7 right-50 md:top-25 z-[9998] flex items-center justify-start gap-3">
      {children}
    </div>
  );
};

export default ButtonGroup;
