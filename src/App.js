import ExpenseCard from "./components";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ExpenseCard
        title="Grocery Shopping"
        amount={1200}
        category="Food"
        date="22 Feb 2026"
      />
    </div>
  );
}

export default App;
