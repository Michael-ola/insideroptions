import { fetchPriceHistoryByAssetId, streamAssetPriceByAssetId } from "@/services/assetService";
import {
    AreaSeries,
    CandlestickSeries,
    ColorType,
    ISeriesApi,
    LineSeries
} from "lightweight-charts";
import { PricePoint, SeriesType } from "./models";

export const chartOptions = {
    layout: {
        background: { color: '#0d181c', type: ColorType.Solid },
        textColor: '#ffffff',
    },
    grid: {
        vertLines: { color: 'transparent' },
        horzLines: { color: 'transparent' },
    },
    rightPriceScale: {
        visible: true,
        borderVisible: false,
        entireTextOnly: true,
    },
    crosshair: {
        vertLine: {
            labelVisible: false,
        },
        horzLine: {
            labelVisible: false,
        },
    },
    timeScale: {
        timeVisible: true,
        secondsVisible: true,
        fixLeftEdge: true,
        visible: true,
        borderVisible: false,
        tickMarkFormatter: (time: number) => {
            const date = new Date(time * 1000);
            return date.toLocaleTimeString('en-NG', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'Africa/Lagos'
            }) + '.' + date.getMilliseconds().toString().padStart(3, '0');
        },
    },
    localization: {
        timeFormatter: (time: number) => {
            const date = new Date(time * 1000);
            return date.toLocaleTimeString('en-NG', {
                hour12: false,
                timeZone: 'Africa/Lagos'
            });
        },
        priceFormatter: (price: number) => {
            return price.toFixed(2);
        },
    },
    watermark: {
        visible: true,
        text: 'Insider Options',
        fontSize: 24,
        horzAlign: 'center',
        vertAlign: 'center',
        color: '#ffffff',
    },
};

export const sampleCandleData = [
    { time: '2023-10-01', open: 100, high: 110, low: 95, close: 105 },
    { time: '2023-10-02', open: 105, high: 115, low: 100, close: 110 },
    { time: '2023-10-03', open: 110, high: 112, low: 106, close: 107 },
];

const candlestickOptions = {
    upColor: '#94D983',
    downColor: '#ef5350',
    borderVisible: false,
    wickUpColor: '#94D983',
    wickDownColor: '#ef5350',
};

const lineChartOptions = {
    color: '#00d435ff',
    lineWidth: 1,
};

const areaChartOptions = {
    lineWidth: 1,
};

// Store cached history and stream states per asset
const priceCache: Record<number, { history: PricePoint[]; seriesUpdater?: (point: PricePoint) => void }> = {};
const streamStarted: Record<number, boolean> = {};

export const createSeries = async (
    chartInstance: any,
    type: SeriesType,
    assetId: number,
    onStream?: (point: PricePoint) => void
): Promise<ISeriesApi<any>> => {
    const series = createAndConfigureSeries(chartInstance, type);

    const history = await getOrFetchHistoricalData(assetId);
    series.setData(history);

    setupStreaming(assetId, onStream);

    return series;
};

const createAndConfigureSeries = (chartInstance: any, type: SeriesType): ISeriesApi<any> => {
    switch (type) {
        case SeriesType.Candles: {
            const series = chartInstance.addSeries(CandlestickSeries);
            series.applyOptions(candlestickOptions);
            series.setData(sampleCandleData);
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

const getOrFetchHistoricalData = async (assetId: number): Promise<PricePoint[]> => {
    if (priceCache[assetId]?.history) {
        return priceCache[assetId].history;
    }

    const response = await fetchPriceHistoryByAssetId(assetId);

    const parsed = response
        .filter(item => item.price && item.timestamp)
        .map(item => ({
            price: item.price,
            timestamp: item.timestamp,
            time: Math.floor(new Date(item.timestamp).getTime() / 1000),
            value: item.price,
        }))
        .sort((a, b) => a.time - b.time);

    const deduplicated = deduplicateTimestamps(parsed);

    priceCache[assetId] = { history: deduplicated };

    return deduplicated;
};

const deduplicateTimestamps = (points: PricePoint[]): PricePoint[] => {
    const deduplicated: PricePoint[] = [];
    let lastTime = -1;

    for (const item of points) {
        let adjustedTime = item.time;
        if (adjustedTime <= lastTime) {
            adjustedTime = lastTime + 1;
        }
        deduplicated.push({ ...item, time: adjustedTime });
        lastTime = adjustedTime;
    }

    return deduplicated;
};

const setupStreaming = (
    assetId: number,
    onStream?: (point: PricePoint) => void
): void => {
    priceCache[assetId].seriesUpdater = onStream;

    if (streamStarted[assetId]) return;
    streamStarted[assetId] = true;

    streamAssetPriceByAssetId(assetId, (data) => {
        if (!data?.time || isNaN(data.time)) return;

        const last = priceCache[assetId].history.at(-1);
        if (last && data.time <= last.time) return;

        const point: PricePoint = {
            time: data.time,
            value: data.price,
        };

        priceCache[assetId].seriesUpdater?.(point);
        priceCache[assetId].history.push(point);
    });
};


