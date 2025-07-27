import React, { useEffect, useRef, useState } from "react";
import { createChart, ISeriesApi } from "lightweight-charts";
import { chartOptions, createSeries } from "@/lib/chartSettings";
import { useDashboardContext } from "@/context/DashboardContext";

const TradingChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartInstance, setChartInstance] = useState<ReturnType<
    typeof createChart
  > | null>(null);
  const { chartStyle } = useDashboardContext();

  const seriesRef = useRef<ISeriesApi<any> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, chartOptions);
    setChartInstance(chart);

    const observer = new ResizeObserver(() => {
      chart.resize(
        containerRef.current!.clientWidth,
        containerRef.current!.clientHeight
      );
    });
    observer.observe(containerRef.current);

    return () => {
      chart.remove();
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!chartInstance) return;

    if (seriesRef.current) {
      chartInstance.removeSeries(seriesRef.current);
    }
    const newSeries = createSeries(chartInstance, chartStyle);
    chartInstance.timeScale().fitContent();
    seriesRef.current = newSeries;
  }, [chartInstance, chartStyle]);

  return (
    <div className="dashboard-chart-offset h-[100dvh] w-screen z-0 max-sm:h-[calc(100dvh-57px)] flex items-center justify-center">
      <div className="w-full h-full" ref={containerRef} />
    </div>
  );
};

export default TradingChart;
