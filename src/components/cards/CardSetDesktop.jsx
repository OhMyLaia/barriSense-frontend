const CardSetDesktop = ({ children }) => {
  return (
    <div
      className={`mx-2 lg:mx-10 relative w-auto md:w-[1500px] flex flex-col items-start font-inter justify-center gap-3 md:gap-5 z-1`}
    >
      {children}
    </div>
  );
};

export default CardSetDesktop;
