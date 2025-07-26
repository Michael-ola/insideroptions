import { SeriesType } from "@/types/dashboard";
import {
    AreaSeries,
    CandlestickSeries,
    ColorType,
    ISeriesApi,
    LineSeries
} from "lightweight-charts";

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
        secondsVisible: false,
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

export const createSeries = (chartInstance: any, type: SeriesType): ISeriesApi<any> => {
    let series: ISeriesApi<any>;

    switch (type) {
        case 'area':
            series = chartInstance.addSeries(AreaSeries);
            series.applyOptions(areaChartOptions);
            series.setData(sampleAreaData);
            break;
        case 'candles':
            series = chartInstance.addSeries(CandlestickSeries);
            series.applyOptions(candlestickOptions);
            series.setData(sampleCandleData);
            break;
        default:
            series = chartInstance.addSeries(LineSeries);
            series.applyOptions(lineChartOptions);
            series.setData(sampleAreaData);
            break;
    }

    return series;
};