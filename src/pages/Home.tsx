import Accordion from '../components/Accordion';
import { useEditableContent } from '../hooks/useEditableContent';

export default function Home() {
  const {
    isEditing,
    editedContent,
    startEditing,
    cancelEditing,
    saveChanges,
    updateSummary,
    updateContent,
    resetToOriginal,
  } = useEditableContent('home');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Accordion 
        title="Анализ вовлеченности пользователей Jay Copilot"
        summary={editedContent.summary}
        content={editedContent.content}
        isEditing={isEditing}
        onSummaryChange={updateSummary}
        onContentChange={updateContent}
        onStartEdit={startEditing}
        onSaveEdit={saveChanges}
        onCancelEdit={cancelEditing}
        onReset={resetToOriginal}
      />
    </div>
  );
} 