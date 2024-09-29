import Card from "./Card";

function SummaryCard({
  questionNumber,
  question,
  answer,
  className, 
}) {
  return (
    <Card className={"mb-3 lg:mr-3 " + className}>
      <div className="border-b border-gray pb-3 mb-3">
        <h1 className="text-green text-xl">Question {questionNumber}</h1>
        <p className="">{question}</p>
      </div>
      <p className="text-dark-green font-bold text-xl">You answered</p>
      <p className="text-green">{answer}</p>
    </Card>
  );
}

export default SummaryCard;