import { getTodos } from '@/app/actions';
import EditTodoClient from './EditTodoClient';

export default async function EditPage({ params }: { params: Promise<{ todoId: string }> }) {
  const resolvedParams = await params;
  const todos = await getTodos();
  const todo = todos.find((t: any) => t.id === parseInt(resolvedParams.todoId));
  if (!todo) return <div className="text-center mt-20 font-bold">찾을 수 없습니다.</div>;
  return <EditTodoClient todo={todo} />;
}