import { ReactNode } from 'react';

import { Background } from '@/frontend/components/Global/Background/background';
import { BottomBar } from '@/frontend/components/Global/BottomBar/BottomBar';
import { TechSideBar } from '@/frontend/components/Global/TechSideBar/TechSideBar';

import styles from './mainLayout.module.scss';

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Background />

      <div className={styles.mainContent}>
        <TechSideBar />
        <BottomBar />

        <main className={styles.mainLayout}>{children}</main>
      </div>
    </>
  );
}
