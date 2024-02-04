export interface Response {
  chunk: string;
  heading: string;
  threshold: number;
  suggestions: string[];
  adversity: {
    threshold: number;
    reason: string;
  };
  analyzed: {
    weight: number;
    reason: string;
  };
}
