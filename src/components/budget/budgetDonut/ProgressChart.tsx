import React from "react";
import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import "./ProgressChart.module.css";

interface ProgressChartProps {
  progressList: { spent: number; limit: number, title: string }[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ progressList }) => {
  const renderData = progressList.reduce((acc: number[], progress) => {
    const { spent, limit } = progress;
    if (limit == 0) {
      acc.push(spent);
      acc.push(0);
    } else if (spent > limit) {
      acc.push(spent);
      acc.push(0);
    } else {
      acc.push(spent);
      acc.push(limit - spent);
    }
    return acc;
  }, []);


  const backgroundColors = progressList.reduce((acc: string[], progress) => {
    const randomColor = () => Math.floor(Math.random() * 100); // Limit RGB values to darker shades
    const color = `${randomColor()}, ${randomColor()}, ${randomColor()}`;
    acc.push(`rgba(${color}, 1)`);
    acc.push(`rgba(${color}, 0.3)`);
    return acc;
  }, []);

  const labels = progressList.reduce((acc: string[], progress) => {
    const { title } = progress;
    acc.push(`${title} - Spent`);
    acc.push(`${title} - Remaining`);
    return acc;
  }, []);

  const borderWidths = progressList.reduce((acc: number[], progress) => {
    acc.push(3);
    acc.push(3);
    return acc;
  }, []);

  const spent = progressList.reduce((total, item) => total + item.spent, 0);
  const limit = progressList.reduce((total, item) => total + item.limit, 0);

  const data = {
    labels: labels,
    datasets: [
      {
        data: renderData,
        backgroundColor: backgroundColors,
        borderWidth: borderWidths,
        borderColor: "#ffffff",
      },
    ],
  };

  const options = {
    plugins: {
      textCenter: { spent, limit },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const value = tooltipItem.raw;
            return `RM ${value}`;
          },
        },
      },
      legend: {
        display: false, // Disable the legend
      },
    },
  };

  const plugin = useMemo(() => ({
    id: "textCenter",
    beforeDraw: (chart: any) => {
      const { width, height, ctx, config } = chart;
      const { spent, limit } = config.options.plugins.textCenter;
      ctx.save();

      const fontSize = Math.min(height / 6, 20);
      ctx.font = `${fontSize}px Arial`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      const text = `${spent}/${limit}`;
      const textX = width / 2;
      const textY = height / 2;

      ctx.fillStyle = "#000000";
      ctx.fillText(text, textX, textY);

      ctx.restore();
    },
  }), [spent, limit]);


  return (
    <div className="progress-chart-container">
      <Doughnut data={data} options={options} plugins={[plugin]} />
    </div>
  );
};

export default ProgressChart;
