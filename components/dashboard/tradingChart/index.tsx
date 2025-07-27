import React, { useEffect, useRef, useState } from 'react';
import {
    createChart,
    ISeriesApi,
} from 'lightweight-charts';
import {
    chartOptions,
    createSeries,
} from '@/lib/chartSettings';
import { useDashboardContext } from '@/context/DashboardContext';

const TradingChart = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [chartInstance, setChartInstance] = useState<ReturnType<typeof createChart> | null>(null);
    const { chartStyle } = useDashboardContext();

    const seriesRef = useRef<ISeriesApi<any> | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const chart = createChart(containerRef.current, chartOptions);
        setChartInstance(chart);

        const observer = new ResizeObserver(() => {
            chart.resize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
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
        <div className="w-full h-[90vh] max-sm:h-[55vh] max-sm:z-0 flex items-center justify-center">
            <div
                className="w-full h-full"
                ref={containerRef}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            />
        </div>
    );
}

export default TradingChart;
