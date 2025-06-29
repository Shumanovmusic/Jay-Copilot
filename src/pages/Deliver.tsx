import Accordion from '../components/Accordion';
import ScoringTable from '../components/ScoringTable';
import { useEditableContent } from '../hooks/useEditableContent';

export default function Deliver() {
  const {
    isEditing,
    editedContent,
    startEditing,
    cancelEditing,
    saveChanges,
    updateSummary,
    updateContent,
    resetToOriginal,
  } = useEditableContent('deliver');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Accordion 
        title="Deliver - Приоритизация и планирование"
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
      
      {/* Интерактивная таблица скоринга */}
      <div className="mt-8">
        <ScoringTable />
      </div>
    </div>
  );
} 