import React, { useEffect, useRef, useState } from "react";
import { createChart, ISeriesApi, LogicalRange } from "lightweight-charts";
import { chartOptions, createSeries } from "@/lib/chartSettings";
import { useDashboardContext } from "@/context/DashboardContext";

const TradingChart: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
    const seriesRef = useRef<ISeriesApi<any> | null>(null);
    const { chartStyle } = useDashboardContext();
    const assetId = 1;

    const [rightOffset, setRightOffset] = useState(0);

    // Initialize chart only once
    useEffect(() => {
        if (!containerRef.current) return;

        const chart = createChart(containerRef.current, chartOptions);
        chartRef.current = chart;

        const observer = new ResizeObserver(() => {
            chart.resize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
        });
        observer.observe(containerRef.current);

        // Add series only once
        createSeries(chart, chartStyle, assetId).then((series) => {
            seriesRef.current = series;
            chart.timeScale().scrollToRealTime();
        });

        return () => {
            if (seriesRef.current) {
                chart.removeSeries(seriesRef.current);
                seriesRef.current = null;
            }
            chart.remove();
            chartRef.current = null;
            observer.disconnect();
        };
    }, [chartStyle, assetId]);

    // Listen to scroll changes and update rightOffset
    useEffect(() => {
        if (!chartRef.current) return;

        const chart = chartRef.current;

        const onVisibleRangeChanged = (range: LogicalRange | null) => {
            if (!range || !seriesRef.current) return;

            const seriesData = seriesRef.current.data() ?? [];
            const lastBarIndex = seriesData.length > 0 ? seriesData[seriesData.length - 1].time : 0;
            const scrollPosition = chart.timeScale().scrollPosition() ?? lastBarIndex;
            setRightOffset(Math.abs(Math.round(scrollPosition)));
        };

        chart.timeScale().subscribeVisibleLogicalRangeChange(onVisibleRangeChanged);

        return () => {
            chart.timeScale().unsubscribeVisibleLogicalRangeChange(onVisibleRangeChanged);
        };
    }, []);

    // Dynamically apply rightOffset when user scrolls
    useEffect(() => {
        if (!chartRef.current) return;

        chartRef.current.timeScale().applyOptions({ rightOffset });
    }, [rightOffset]);

    return (
        <div className="h-[100dvh] w-[calc(100vw-var(--side-nav-width))] ml-[var(--side-nav-width)] -mt-[var(--top-nav-height)] max-sm:ml-0 max-sm:w-full max-sm:h-[calc(100dvh-57px)] max-sm:z-5 flex items-center justify-center">
            <div className="w-full h-full" ref={containerRef} />
        </div>
    );
};

export default TradingChart;
