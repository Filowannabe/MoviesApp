// Generated by https://quicktype.io

export interface WatchProviders {
  id:      number;
  results: Results;
}

export interface Results {
  CO: Au;
}

export interface Au {
  link:      string;
  flatrate?: Buy[];
}

export interface Buy {
  logo_path:        string;
  provider_id:      number;
  provider_name:    string;
  display_priority: number;
  link: string
}
