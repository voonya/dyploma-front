import { MainLayout } from '../common/layouts/main.layout';
import { StatsComponent } from './stats/stats.component';
import { LdaVisComponent } from './lda-vis/lda-vis.component';

export const DashboardPage = () => {
  return (
    <MainLayout>
      <div style={{ display: 'flex', gap: '16px' }}>
        <LdaVisComponent />
        <StatsComponent />
      </div>
    </MainLayout>
  );
};
