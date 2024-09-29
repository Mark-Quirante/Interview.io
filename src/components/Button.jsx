function Button({ children, isDisabled = false, onClick, icon, className }) {
  return (
    <button disabled={isDisabled} onClick={onClick} className={
      "px-5 py-2 flex justify-center items-center rounded " +
      (isDisabled ? "bg-gray text-dark-gray " : "bg-green text-white ") +
      className
    } 
      >
      {icon && <img className="w-[15px] h-[15px] mr-2" src={icon} alt=""/>}{children}
    </button>
  );
}

export default Button;