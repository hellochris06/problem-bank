
import EditProblemForm from '@/components/admin/EditProblemForm';

export default function EditProblemPage({ params }: { params: { id: string } }) {
  return <div className="card"><EditProblemForm id={params.id} /></div>;
}
