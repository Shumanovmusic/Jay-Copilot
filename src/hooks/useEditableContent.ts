import { useState, useEffect } from 'react';
import { pageContent } from '../data/content';

type PageKey = keyof typeof pageContent;

interface EditableContent {
  summary: string;
  content: string;
}

export function useEditableContent(pageKey: PageKey) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<EditableContent>({
    summary: pageContent[pageKey].summary,
    content: pageContent[pageKey].content,
  });

  // Загружаем сохраненный контент из localStorage при инициализации
  useEffect(() => {
    const savedContent = localStorage.getItem(`edited_content_${pageKey}`);
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        setEditedContent(parsedContent);
      } catch (error) {
        console.error('Ошибка при загрузке сохраненного контента:', error);
      }
    }
  }, [pageKey]);

  // Функция для начала редактирования
  const startEditing = () => {
    setIsEditing(true);
  };

  // Функция для отмены редактирования
  const cancelEditing = () => {
    setIsEditing(false);
    // Восстанавливаем сохраненный контент или оригинальный
    const savedContent = localStorage.getItem(`edited_content_${pageKey}`);
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        setEditedContent(parsedContent);
      } catch (error) {
        setEditedContent({
          summary: pageContent[pageKey].summary,
          content: pageContent[pageKey].content,
        });
      }
    } else {
      setEditedContent({
        summary: pageContent[pageKey].summary,
        content: pageContent[pageKey].content,
      });
    }
  };

  // Функция для сохранения изменений
  const saveChanges = () => {
    try {
      localStorage.setItem(`edited_content_${pageKey}`, JSON.stringify(editedContent));
      setIsEditing(false);
      console.log('Контент сохранен в localStorage');
    } catch (error) {
      console.error('Ошибка при сохранении контента:', error);
    }
  };

  // Функция для обновления summary
  const updateSummary = (newSummary: string) => {
    setEditedContent(prev => ({ ...prev, summary: newSummary }));
  };

  // Функция для обновления content
  const updateContent = (newContent: string) => {
    setEditedContent(prev => ({ ...prev, content: newContent }));
  };

  // Функция для сброса к оригинальному контенту
  const resetToOriginal = () => {
    const originalContent = {
      summary: pageContent[pageKey].summary,
      content: pageContent[pageKey].content,
    };
    setEditedContent(originalContent);
    localStorage.removeItem(`edited_content_${pageKey}`);
    setIsEditing(false);
  };

  return {
    isEditing,
    editedContent,
    startEditing,
    cancelEditing,
    saveChanges,
    updateSummary,
    updateContent,
    resetToOriginal,
  };
} 