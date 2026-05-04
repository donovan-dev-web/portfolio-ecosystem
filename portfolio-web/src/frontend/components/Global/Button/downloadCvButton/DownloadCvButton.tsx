import { Download } from 'lucide-react';

import styles from './downloadCvButton.module.scss';

type DownloadCvButtonProps = {
  content?: string;
};

export function DownloadCvButton({
  content = 'Télécharger mon CV',
}: DownloadCvButtonProps) {
  return (
    <a href="/api/docs" download className={styles.link}>
      <Download />
      <span>{content}</span>
    </a>
  );
}
