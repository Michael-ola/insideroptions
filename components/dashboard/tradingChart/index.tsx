import React, { useEffect, useRef } from "react";
import { createChart, ISeriesApi, IRange, Time } from "lightweight-charts";
import { chartOptions, createSeries, onRealtimePrice } from "@/lib/chartSettings";
import { useDashboardContext } from "@/context/DashboardContext";

const timeToTimestamp = (time: Time): number => {
    if (typeof time === "number") return time * 1000; // UTCTimestamp in seconds -> ms
    if (
        typeof time === "object" &&
        time !== null &&
        "timestamp" in time &&
        typeof (time as { timestamp: unknown }).timestamp === "number"
    ) {
        return (time as { timestamp: number }).timestamp * 1000;
    }
    if (typeof time === "string") return new Date(time).getTime();
    return 0;
};

const TradingChart: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
    const seriesRef = useRef<ISeriesApi<any> | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const unsubscribeRef = useRef<(() => void) | null>(null);
    const currentData = useRef<readonly any[]>([]);
    const { chartStyle, assetId } = useDashboardContext();

    useEffect(() => {
        if (!containerRef.current) return;

        containerRef.current.style.position = containerRef.current.style.position || "relative";

        const chart = createChart(containerRef.current, chartOptions);
        chartRef.current = chart;

        // Create tooltip element (badge)
        const tooltip = document.createElement("div");
        tooltip.className = "lw-lastprice-tooltip";
        tooltip.style.position = "absolute";
        tooltip.style.left = "0px"; // we'll update dynamically
        tooltip.style.top = "8px";
        tooltip.style.padding = "6px 10px";
        tooltip.style.borderRadius = "8px";
        tooltip.style.background = "#77da7c";  // Updated color here
        tooltip.style.color = "#ffffff";
        tooltip.style.fontWeight = "600";
        tooltip.style.fontSize = "12px";
        tooltip.style.boxShadow = "0 4px 16px rgba(0,0,0,0.25)";
        tooltip.style.whiteSpace = "nowrap";
        tooltip.style.pointerEvents = "none";
        tooltip.style.zIndex = "100";
        tooltip.style.transition = "left 150ms ease-in-out, top 150ms ease-in-out"; // smooth horizontal and vertical motion
        tooltip.style.display = "none"; // hidden until we have value
        tooltipRef.current = tooltip;
        containerRef.current.appendChild(tooltip);

        // Inject arrow CSS once
        const STYLE_ID = "lw-tooltip-arrow-style";
        if (!document.getElementById(STYLE_ID)) {
            const styleTag = document.createElement("style");
            styleTag.id = STYLE_ID;
            styleTag.textContent = `
                .lw-lastprice-tooltip::after {
                    content: "";
                    position: absolute;
                    bottom: -6px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-width: 6px 6px 0 6px;
                    border-style: solid;
                    border-color: #06701dff transparent transparent transparent;
                }
            `;
            document.head.appendChild(styleTag);
        }

        // Resize observer to keep chart sizing correct
        const observer = new ResizeObserver(() => {
            chart.resize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
            updateTooltipToLatestVisible();
        });
        observer.observe(containerRef.current);

        const updateCurrentData = () => {
            if (seriesRef.current) {
                currentData.current = seriesRef.current.data?.() || [];
            }
        };

        const updateTooltipToLatestVisible = () => {
            if (!seriesRef.current || !tooltipRef.current || !containerRef.current || !chartRef.current) return;

            const visibleRange: IRange<Time> | null = chart.timeScale().getVisibleRange();
            if (!visibleRange) return;

            updateCurrentData();

            const fromTs = timeToTimestamp(visibleRange.from);
            const toTs = timeToTimestamp(visibleRange.to);

            // Filter points in visible range
            const visibleData = currentData.current.filter(point => {
                const pointTs = timeToTimestamp(point.time);
                return pointTs >= fromTs && pointTs <= toTs;
            });

            if (visibleData.length === 0) {
                tooltipRef.current.style.display = "none";
                return;
            }

            const latestPoint = visibleData[visibleData.length - 1];
            const price = latestPoint.value ?? latestPoint.close;
            if (typeof price !== "number") {
                tooltipRef.current.style.display = "none";
                return;
            }

            const x = chart.timeScale().timeToCoordinate(latestPoint.time);
            const y = seriesRef.current.priceToCoordinate(price);
            if (x == null || y == null) return;

            tooltipRef.current.textContent = `$${price.toFixed(6)}`;  // Added dollar sign here
            tooltipRef.current.style.display = "block";

            const badgeWidth = tooltipRef.current.offsetWidth;
            const badgeHeight = tooltipRef.current.offsetHeight;
            const containerWidth = containerRef.current.clientWidth;
            const containerHeight = containerRef.current.clientHeight;

            let left = x - badgeWidth / 2;
            let top = y - badgeHeight - 12;

            // Clamp inside container
            left = Math.max(4, Math.min(containerWidth - badgeWidth - 4, left));
            top = Math.max(4, Math.min(containerHeight - badgeHeight - 4, top));

            tooltipRef.current.style.left = `${left}px`;
            tooltipRef.current.style.top = `${top}px`;
            tooltipRef.current.style.right = "auto";
        };

        // Add series and subscribe to realtime prices
        createSeries(chart, chartStyle, assetId ?? 1).then((series) => {
            seriesRef.current = series;
            chart.timeScale().scrollToRealTime();

            if (unsubscribeRef.current) unsubscribeRef.current();
            unsubscribeRef.current = onRealtimePrice(assetId ?? 1, () => {
                updateTooltipToLatestVisible();
            });

            // Also initialize tooltip position
            updateTooltipToLatestVisible();
        });

        // Also update tooltip on visible range change (user scroll or zoom)
        chart.timeScale().subscribeVisibleTimeRangeChange(() => {
            updateTooltipToLatestVisible();
        });

        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
                unsubscribeRef.current = null;
            }
            if (seriesRef.current) {
                chart.removeSeries(seriesRef.current);
                seriesRef.current = null;
            }
            if (tooltipRef.current) {
                tooltipRef.current.remove();
                tooltipRef.current = null;
            }
            chart.remove();
            chartRef.current = null;
            observer.disconnect();
        };
    }, [chartStyle, assetId]);

    return (
        <div
            className="relative h-[100dvh] w-[calc(100vw-var(--side-nav-width))] ml-[var(--side-nav-width)] -mt-[var(--top-nav-height)] max-sm:ml-0 max-sm:w-full max-sm:h-[calc(100dvh-57px)] max-sm:z-5 flex items-center justify-center"
        >
            <div className="w-full h-full" ref={containerRef} />
        </div>
    );
};

export default TradingChart;
