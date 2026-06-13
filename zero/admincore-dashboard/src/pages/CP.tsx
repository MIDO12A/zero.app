import { useEffect, useState } from 'react';
import { CPModel } from '../types';
import { getCPs } from '../lib/db';
import DataTable from '../components/DataTable';

export default function CPPage() {
  const [cps, setCps] = useState<CPModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCPs().then(data => { setCps(data); setLoading(false); });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-lg font-semibold">Content Provider (CP) Management</h2>
        <p className="text-slate-500 text-xs mt-0.5">{cps.length} content providers</p>
      </div>
      <DataTable
        loading={loading}
        columns={[
          { key: 'name', label: 'Name', sortable: true },
          { key: 'contactName', label: 'Contact' },
          { key: 'contactEmail', label: 'Email' },
          { key: 'revenueShare', label: 'Revenue Share', sortable: true, render: c => <span>{c.revenueShare}%</span> },
          { key: 'contentCount', label: 'Content Count', sortable: true },
          { key: 'status', label: 'Status', sortable: true, render: c => <span className={c.status === 'active' ? 'text-emerald-400' : 'text-rose-400'}>{c.status}</span> },
        ]}
        data={cps}
        searchKeys={['name', 'contactName', 'contactEmail']}
      />
    </div>
  );
}
