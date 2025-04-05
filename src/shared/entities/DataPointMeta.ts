export type DataPointMeta<T> = {
  scrapedValue: T | null;
  retreivedWithLLMValue: T | null;
  dataPointSources: DataPointSource[];
};

export class DataPointSource {
  docFilePath: string;
  pageNumber: number | null;
  originalChunkExtract: string;
  citation?: string;
}
