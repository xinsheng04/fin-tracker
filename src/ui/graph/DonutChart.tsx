import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React from "react";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  labelData: { label: string; value: number }[];
  className?: string;
  borderWidth?: number;
  cutout?: string;
  centerText?: string;
  centerTextStyle?: {
    font?: string;
    color?: string;
  };
  plugins?: any[];
  options?: any;
}

const DonutChart: React.FC<DonutChartProps> = ({
  labelData,
  className,
  borderWidth = 1,
  cutout = "50%",
  centerText = "",
  centerTextStyle = {},
  plugins = [],
  options = {},
}) => {
  // Extract labels and data from labelData
  const labels = labelData.map((item) => item.label);
  const data = labelData.map((item) => item.value);

  // Generate random background colors for each label with limited brightness
  const backgroundColors = labelData.map(() => {
    const randomColor = () => Math.floor(Math.random() * 156) + 50; // Limit RGB values to avoid extremes
    return `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
  });

  // Default data structure
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: backgroundColors,
        borderWidth,
      },
    ],
  };

  // Default options with custom center text plugin
  const chartOptions = {
    cutout,
    plugins: {
      legend: { display: true, position: "bottom" }, // Set legend position to the right
      centerText: {},
      ...options.plugins,
    },
    ...options,
  };

  // Custom plugin to draw text in the center
  const centerTextPlugin = {
    id: "centerText",
    afterDraw: (chart: any) => {
      if (centerText) {
        const { ctx, width, height } = chart;
        ctx.save();
        ctx.font = centerTextStyle.font || "bold 1.5rem Arial";
        ctx.fillStyle = centerTextStyle.color || "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(centerText, width / 2, height / 2);
        ctx.restore();
      }
    },
  };

  return (
    <Doughnut
      className={className}
      data={chartData}
      options={chartOptions}
      plugins={[centerTextPlugin, ...plugins]}
    />
  );
};

export default DonutChart;