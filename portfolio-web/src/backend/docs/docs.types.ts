export type DocKind = 'cv';

export type DocType = {
  _id?: string;
  kind: DocKind;
  name: string;
  url: string;
  pathname: string;
  contentType: string;
  size: number;
  downloadCount?: number;
  lastDownloadedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type DocDownloadUpdate = {
  downloadCount: number;
  lastDownloadedAt: Date;
};
