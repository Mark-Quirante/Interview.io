function Button({ children, isDisabled = false, className }) {
  return (
    <button className={
      "px-5 py-2 flex justify-center items-center rounded " +
      (isDisabled ? "bg-gray text-dark-gray " : "bg-green text-white ") +
      className
    } 
      >
      {children}
    </button>
  );
}

export default Button;