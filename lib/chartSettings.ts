import {
    AreaSeries,
    CandlestickSeries,
    ColorType,
    ISeriesApi,
    LastPriceAnimationMode,
    LineSeries,
    LineStyle,
} from "lightweight-charts";
import { PricePoint, SeriesType } from "./models";
import { fetchPriceHistoryByAssetId, streamAssetPriceByAssetId } from "@/services/assetService";

type CachedSeriesData = {
    history: any[];
    seriesUpdater?: (point: any) => void;
};

type PriceCache = Record<
    number,
    Partial<Record<SeriesType, CachedSeriesData>>
>;

const priceCache: PriceCache = {};
const streamStarted: Record<number, boolean> = {};

// ========================= NEW: realtime listeners =========================
export type RealtimePayload = { time: number; price: number; type: SeriesType };
type RealtimeListener = (p: RealtimePayload) => void;

const realtimeListeners: Record<number, Set<RealtimeListener>> = {};

export function onRealtimePrice(assetId: number, cb: RealtimeListener): () => void {
    (realtimeListeners[assetId] ||= new Set()).add(cb);
    return () => realtimeListeners[assetId]?.delete(cb);
}

function notifyRealtime(assetId: number, type: SeriesType, point: any) {
    const price = type === SeriesType.Candles
        ? point.close
        : (point.value ?? point.close);
    if (typeof price === "number" && typeof point.time === "number") {
        realtimeListeners[assetId]?.forEach(cb => cb({ time: point.time, price, type }));
    }
}
// ==========================================================================

export const chartOptions = {
    layout: {
        background: { color: "#0d181c", type: ColorType.Solid },
        textColor: "#ffffff",
    },
    grid: {
        vertLines: { color: "transparent" },
        horzLines: { color: "transparent" },
    },
    rightPriceScale: {
        visible: false,
        borderVisible: false,
        entireTextOnly: true,
        autoScale: true,
    },
    leftPriceScale: {
        visible: false,
        borderVisible: false,
        entireTextOnly: false,
        autoScale: true,
    },
    crosshair: {
        vertLine: { labelVisible: false },
        horzLine: { labelVisible: false },
    },
    timeScale: {
        timeVisible: false,
        rightOffset: 6,
        secondsVisible: false,
        fixLeftEdge: false,
        visible: false,
        tickVisible: true,
        barSpacing: 2,
        borderVisible: false,
        shiftVisibleRangeOnNewBar: true,
        duration: 5000,
        easing: "EaseInOutQuad",
        tickMarkFormatter: (time: number) => {
            const date = new Date(time * 1000);
            return (
                date.toLocaleTimeString("en-NG", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: "Africa/Lagos",
                }) +
                "." +
                date.getMilliseconds().toString().padStart(3, "0")
            );
        },
    },
    localization: {
        timeFormatter: (time: number) => {
            const date = new Date(time * 1000);
            return date.toLocaleTimeString("en-NG", {
                hour12: false,
                timeZone: "Africa/Lagos",
            });
        },
        priceFormatter: (price: number) => {
            return price.toFixed(6);
        },
    },
    watermark: {
        visible: true,
        text: "Insider Options",
        fontSize: 24,
        horzAlign: "center",
        vertAlign: "center",
        color: "#ffffff",
    },
};

const candlestickOptions = {
    upColor: "#94D983",
    downColor: "#ef5350",
    borderVisible: false,
    wickUpColor: "#94D983",
    wickDownColor: "#ef5350",
};

const lineChartOptions = {
    color: "#00d435ff",
    lineWidth: 1,
    crossHairMarkerVisible: true,
    LineStyle: LineStyle.Dashed,
    LastPriceAnimationMode: LastPriceAnimationMode.Continuous,
    crossHairMarkerRadius: 4,
};

const areaChartOptions = {
    lineWidth: 1,
};

export const createSeries = async (
    chartInstance: any,
    type: SeriesType,
    assetId: number
): Promise<ISeriesApi<any>> => {
    const series = createAndConfigureSeries(chartInstance, type);
    const history = await getOrFetchHistoricalData(assetId, type);
    const prepared = prepareSortedData(type, history) as PricePoint[];
    series.setData(prepared);

    const updater = getSeriesUpdater(type, series);
    if (!priceCache[assetId]) priceCache[assetId] = {};
    priceCache[assetId][type] = {
        history,
        seriesUpdater: updater,
    };

    // NEW: notify initial last point so tooltip can appear immediately
    const last = prepared.at(-1);
    if (last) {
        const lastPoint = type === SeriesType.Candles
            ? last
            : { time: last.time, value: (last as any).value ?? (last as any).close };
        notifyRealtime(assetId, type, lastPoint);
    }

    setupStreaming(assetId);

    return series;
};

const createAndConfigureSeries = (
    chartInstance: any,
    type: SeriesType
): ISeriesApi<any> => {
    switch (type) {
        case SeriesType.Candles: {
            const series = chartInstance.addSeries(CandlestickSeries);
            series.applyOptions(candlestickOptions);
            return series;
        }
        case SeriesType.Area: {
            const series = chartInstance.addSeries(AreaSeries);
            series.applyOptions(areaChartOptions);
            return series;
        }
        case SeriesType.Lines:
        default: {
            const series = chartInstance.addSeries(LineSeries);
            series.applyOptions(lineChartOptions);
            return series;
        }
    }
};

const getOrFetchHistoricalData = async (
    assetId: number,
    type: SeriesType
): Promise<any[]> => {
    if (priceCache[assetId]?.[type]?.history) {
        return priceCache[assetId][type]!.history;
    }

    const response = await fetchPriceHistoryByAssetId(assetId);

    const parsedData =
        type === SeriesType.Candles
            ? response.map((item: any) => ({
                time: new Date(item.timestamp).getTime() / 1000,
                open: item.open ?? item.price,
                high: item.high ?? item.price,
                low: item.low ?? item.price,
                close: item.close ?? item.price,
            }))
            : response.map((item: any) => ({
                time: new Date(item.timestamp).getTime() / 1000,
                value: item.price,
            }));
    const deduped = deduplicateByTime<PricePoint>(parsedData);

    if (!priceCache[assetId]) priceCache[assetId] = {};
    priceCache[assetId][type] = { history: deduped };

    return deduped;
};

const getSeriesUpdater = (
    type: SeriesType,
    series: ISeriesApi<any>
): ((point: any) => void) => {
    if (type === SeriesType.Candles) {
        return (point) => {
            const { time, open, high, low, close } = point;
            if (
                typeof time === "number" &&
                typeof open === "number" &&
                typeof high === "number" &&
                typeof low === "number" &&
                typeof close === "number"
            ) {
                series.update({ time, open, high, low, close });
            } else {
                console.warn("Invalid candle data", point);
            }
        };
    } else {
        return (point) => {
            const { time, value = point.close } = point;
            if (typeof time === "number" && typeof value === "number") {
                series.update({ time, value });
            } else {
                console.warn("Invalid line/area data", point);
            }
        };
    }
};

const setupStreaming = (assetId: number): void => {
    if (streamStarted[assetId]) return;
    streamStarted[assetId] = true;

    streamAssetPriceByAssetId(assetId, (data: any) => {
        if (!data?.time || isNaN(data.time)) return;

        Object.entries(priceCache[assetId] || {}).forEach(([type, cache]) => {
            const seriesTypeKey = type as SeriesType;
            const last = cache.history.at(-1);

            let newPoint: any;

            if (seriesTypeKey === SeriesType.Candles) {
                if (!last || data.time > (last as any).time) {
                    newPoint = {
                        time: data.time,
                        open: data.price,
                        high: data.price,
                        low: data.price,
                        close: data.price,
                    };
                    cache.history.push(newPoint);
                    cache.seriesUpdater?.(newPoint);
                    notifyRealtime(assetId, seriesTypeKey, newPoint); // NEW
                } else if (data.time === (last as any).time) {
                    (last as any).close = data.price;
                    (last as any).high = Math.max((last as any).high, data.price);
                    (last as any).low = Math.min((last as any).low, data.price);
                    cache.seriesUpdater?.(last);
                    notifyRealtime(assetId, seriesTypeKey, last); // NEW
                }
            } else {
                if (!last || data.time > (last as any).time) {
                    newPoint = {
                        time: data.time,
                        value: data.price,
                    };
                    cache.history.push(newPoint);
                    cache.seriesUpdater?.(newPoint);
                    notifyRealtime(assetId, seriesTypeKey, newPoint); // NEW
                } else if (data.time === (last as any).time) {
                    (last as any).value = data.price;
                    cache.seriesUpdater?.(last);
                    notifyRealtime(assetId, seriesTypeKey, last); // NEW
                }
            }
        });
    });
};

export function prepareSortedCandleData(data: any[]): PricePoint[] {
    const uniqueByTime = new Map<number, PricePoint>();

    for (const d of data) {
        const time = d.time;
        if (!uniqueByTime.has(time)) {
            uniqueByTime.set(time, {
                time,
                open: d.open,
                high: d.high,
                low: d.low,
                close: d.close,
            });
        }
    }

    return Array.from(uniqueByTime.values()).sort((a, b) => a.time - b.time);
}

export const prepareSortedLineData = (data: any[]): PricePoint[] => {
    const uniqueByTime = new Map<number, PricePoint>();

    for (const d of data) {
        const time = d.time;
        if (!uniqueByTime.has(time)) {
            uniqueByTime.set(time, { time, value: d.value ?? d.close });
        }
    }

    return Array.from(uniqueByTime.values()).sort((a, b) => a.time - b.time);
};

export function prepareSortedData(type: SeriesType, data: any[]): PricePoint[] {
    if (type === SeriesType.Candles) {
        return prepareSortedCandleData(data);
    }
    return prepareSortedLineData(data);
}

export function deduplicateByTime<T extends { time: number }>(data: T[]): T[] {
    const map = new Map<number, T>();
    for (const point of data) {
        map.set(point.time, point);
    }
    return Array.from(map.values()).sort((a, b) => a.time - b.time);
}
