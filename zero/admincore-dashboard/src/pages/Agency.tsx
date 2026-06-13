import { useEffect, useState } from 'react';
import { AgencyModel } from '../types';
import { getAgencies } from '../lib/db';
import DataTable from '../components/DataTable';

export default function AgencyPage() {
  const [agencies, setAgencies] = useState<AgencyModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAgencies().then(data => { setAgencies(data); setLoading(false); });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-lg font-semibold">Agency Management</h2>
        <p className="text-slate-500 text-xs mt-0.5">{agencies.length} agencies</p>
      </div>
      <DataTable
        loading={loading}
        columns={[
          { key: 'name', label: 'Name', sortable: true },
          { key: 'ownerName', label: 'Owner', sortable: true },
          { key: 'memberCount', label: 'Members', sortable: true },
          { key: 'totalRevenue', label: 'Revenue', sortable: true, render: a => <span className="text-emerald-400">${a.totalRevenue.toLocaleString()}</span> },
          { key: 'commissionRate', label: 'Commission', sortable: true, render: a => <span>{a.commissionRate}%</span> },
        ]}
        data={agencies}
        searchKeys={['name', 'ownerName']}
      />
    </div>
  );
}
