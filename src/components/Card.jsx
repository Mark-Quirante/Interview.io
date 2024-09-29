function Card({ children, className }) {
  return (
    <div className={className + " bg-white p-6 lg:p-8 rounded text-black"}>
      {children}
    </div>
  );
}

export default Card;