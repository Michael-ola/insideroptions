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
        // This disables the "time label" shown near the last value
        visible: true,
        borderVisible: false,
        entireTextOnly: true,
    },
    crosshair: {
        vertLine: {
            labelVisible: false, // Hides the time label near the price axis
        },
        horzLine: {
            labelVisible: false, // Hides the price label on the right axis
        },
    },
    timeScale: {
        timeVisible: true,
        secondsVisible: true,
        fixLeftEdge: true,
        rightOffset: 60, // Adjusts the right offset to show more data
        barSpacing: 10, // Adjusts the spacing between bars to make it more readable
        visible: true,
    },
    localization: {
        timeFormatter: (time: number) => {
            const date = new Date(time * 1000); // Convert seconds to milliseconds
            return date.toLocaleTimeString('en-NG', {
                hour12: false,
                timeZone: 'Africa/Lagos'
            });
        },
    },
};

export const sampleAreaData = [
    { time: '2023-10-01', value: 100 },
    { time: '2023-10-02', value: 105 },
    { time: '2023-10-03', value: 102 },
    { time: '2023-10-04', value: 110 },
];

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
    let series: ISeriesApi<any>;

    switch (type) {
        case SeriesType.Candles:
            series = chartInstance.addSeries(CandlestickSeries);
            series.applyOptions(candlestickOptions);
            series.setData([
                { time: '2023-10-01', open: 100, high: 110, low: 95, close: 105 },
                { time: '2023-10-02', open: 105, high: 115, low: 100, close: 110 },
                { time: '2023-10-03', open: 110, high: 112, low: 106, close: 107 },
            ]);
            return series;

        case SeriesType.Area:
            series = chartInstance.addSeries(AreaSeries);
            series.applyOptions(areaChartOptions);
            break;

        case SeriesType.Lines:
        default:
            series = chartInstance.addSeries(LineSeries);
            series.applyOptions(lineChartOptions);
            break;
    }

    // Fetch history only once per asset
    if (!priceCache[assetId]?.history) {
        const response = await fetchPriceHistoryByAssetId(assetId);
        const history = response
            .filter(item => item.price && item.timestamp)
            .map(item => ({
                price: item.price,
                timestamp: item.timestamp,
                time: Math.floor(new Date(item.timestamp).getTime() / 1000),
                value: item.price,
            }))
            .sort((a, b) => a.time - b.time)
            .filter((item, idx, arr) => idx === 0 || item.time > arr[idx - 1].time);

        priceCache[assetId] = { history };
    }

    series.setData(priceCache[assetId].history);

    // Attach SSE stream once per asset
    if (!streamStarted[assetId]) {
        streamStarted[assetId] = true;

        streamAssetPriceByAssetId(assetId, (data) => {
            if (!data.time || isNaN(data.time)) return;
            // const unixTime = Math.floor(new Date(data.time).getTime() / 1000);
            const point = {
                time: data.time,
                value: data.price,
            };

            // Update live series
            priceCache[assetId].seriesUpdater?.(point);
            // Keep history growing
            priceCache[assetId].history.push(point);
        });
    }

    // Let the stream know which series to update
    priceCache[assetId].seriesUpdater = onStream;

    return series;
};
