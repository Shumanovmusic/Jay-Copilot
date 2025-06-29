import Accordion from '../components/Accordion';
import { useEditableContent } from '../hooks/useEditableContent';

export default function Segmentation() {
  const {
    isEditing,
    editedContent,
    startEditing,
    cancelEditing,
    saveChanges,
    updateSummary,
    updateContent,
    resetToOriginal,
  } = useEditableContent('segmentation');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Accordion 
        title="Segmentation - Сегментация пользователей"
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