import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
import React from "react";
// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

// Custom plugin to draw text in the center
const centerTextPlugin = {
  id: "centerText",
  afterDraw: (chart: any) => {
    const { ctx, width, height } = chart;
    ctx.save();
    ctx.font = "bold 1.5rem Arial";
    ctx.fillStyle = "#22223b";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // Get the remaining amount from the chart data
    const remaining = chart.data.datasets[0].data[1];
    ctx.fillText(`$${remaining.toLocaleString()}`, width / 2, height / 2);
    ctx.restore();
  },
};

export default function BudgetDonut() {
  const budgetAmount = useSelector((state: any) => state.budgeting.mainAmount);
  const transaction = useSelector((state: any) => state.transaction.recentTransaction);
  const spent = transaction
    ? transaction
        .filter((t: any) => t.typeOfTransfer === "expense")
        .reduce((sum: number, t: any) => sum + t.amount, 0)
    : 0;
  const remaining = Math.max(budgetAmount - spent, 0);

  const data = {
    labels: ["Spent", "Remaining"],
    datasets: [
      {
        data: [spent, remaining],
        backgroundColor: ["#d81d2dff", "#65ba69"],
        borderRadius: 33,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "80%",
    plugins: {
      legend: { display: true },
      centerText: {}, // Enable the custom plugin
    },
  };

  return <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />;
}