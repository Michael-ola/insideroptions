import React, { useEffect, useRef, useState } from "react";
import { createChart, ISeriesApi, LogicalRange } from "lightweight-charts";
import { chartOptions, createSeries } from "@/lib/chartSettings";
import { useDashboardContext } from "@/context/DashboardContext";

const TradingChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartInstance, setChartInstance] = useState<ReturnType<
    typeof createChart
  > | null>(null);
  const { chartStyle } = useDashboardContext();
  const seriesRef = useRef<ISeriesApi<any> | null>(null);
  const assetId = 1;

  const [rightOffset, setRightOffset] = useState(0);

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

  // Listen for visible logical range changes (user scrolls/drags)
  useEffect(() => {
    if (!chartInstance) return;

    const onVisibleRangeChanged = (range: LogicalRange | null) => {
      if (!range) return;
      // Get latest bar index from series data length:
      const seriesData = seriesRef.current?.data() ?? [];
      const lastBarIndex: number =
        seriesData.length > 0 ? seriesData[seriesData.length - 1].time : 0;
      const scrollPosition =
        chartInstance.timeScale().scrollPosition() ?? lastBarIndex;
      setRightOffset(Math.abs(Math.round(scrollPosition)));
    };
    chartInstance
      .timeScale()
      .subscribeVisibleLogicalRangeChange(onVisibleRangeChanged);

    return () => {
      chartInstance
        .timeScale()
        .unsubscribeVisibleLogicalRangeChange(onVisibleRangeChanged);
    };
  }, [chartInstance]);

  // When rightOffset changes, update the chart timeScale options dynamically
  useEffect(() => {
    if (!chartInstance) return;

    chartInstance.timeScale().applyOptions({
      rightOffset,
    });
  }, [chartInstance, rightOffset]);

  useEffect(() => {
    if (!chartInstance) return;

    if (seriesRef.current) {
      chartInstance.removeSeries(seriesRef.current);
    }

    createSeries(chartInstance, chartStyle, assetId, (point) => {
      seriesRef.current?.update(point);
      // Optional: auto scroll only if rightOffset == 0
      if (rightOffset === 0) {
        chartInstance.timeScale().scrollToRealTime();
      }
    }).then((series) => {
      seriesRef.current = series;
    });
  }, [chartInstance, chartStyle, assetId, rightOffset]);

  return (
    <div className="h-[100vh] w-[calc(100vw-var(--side-nav-width))] ml-[var(--side-nav-width)] -mt-[var(--top-nav-height)] max-sm:ml-0 max-sm:w-full max-sm:h-[calc(100vh-57px)] max-sm:z-5 flex items-center justify-center">
      <div
        className="w-full h-full"
        ref={containerRef}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default TradingChart;
