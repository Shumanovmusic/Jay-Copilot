import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface AccordionProps {
  title: string;
  summary: string;
  content: string;
  isEditing?: boolean;
  onSummaryChange?: (newSummary: string) => void;
  onContentChange?: (newContent: string) => void;
  onStartEdit?: () => void;
  onSaveEdit?: () => void;
  onCancelEdit?: () => void;
  onReset?: () => void;
}

export default function Accordion({ 
  title, 
  summary, 
  content, 
  isEditing = false,
  onSummaryChange,
  onContentChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onReset
}: AccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Настройки для ReactMarkdown с поддержкой таблиц и других элементов
  const markdownComponents = {
    table: ({ ...props }: any) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-gray-300" {...props} />
      </div>
    ),
    thead: ({ ...props }: any) => (
      <thead className="bg-gray-50" {...props} />
    ),
    th: ({ ...props }: any) => (
      <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900" {...props} />
    ),
    td: ({ ...props }: any) => (
      <td className="border border-gray-300 px-4 py-2" {...props} />
    ),
    tr: ({ ...props }: any) => (
      <tr className="even:bg-gray-50" {...props} />
    ),
    // Улучшенные стили для других элементов
    h1: ({ ...props }: any) => (
      <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8" {...props} />
    ),
    h2: ({ ...props }: any) => (
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-6" {...props} />
    ),
    h3: ({ ...props }: any) => (
      <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-5" {...props} />
    ),
    h4: ({ ...props }: any) => (
      <h4 className="text-lg font-semibold text-gray-900 mb-2 mt-4" {...props} />
    ),
    p: ({ ...props }: any) => (
      <p className="mb-4 text-gray-700 leading-relaxed" {...props} />
    ),
    ul: ({ ...props }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-1" {...props} />
    ),
    ol: ({ ...props }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-1" {...props} />
    ),
    li: ({ ...props }: any) => (
      <li className="text-gray-700" {...props} />
    ),
    blockquote: ({ ...props }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-600" {...props} />
    ),
    code: ({ className, children, ...props }: any) => {
      const isInline = !className;
      return isInline ? (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800" {...props}>
          {children}
        </code>
      ) : (
        <code className="block bg-gray-100 p-4 rounded text-sm font-mono overflow-x-auto" {...props}>
          {children}
        </code>
      );
    },
    pre: ({ ...props }: any) => (
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto mb-4" {...props} />
    ),
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          
          {/* Кнопки управления редактированием */}
          <div className="flex gap-2 ml-4">
            {!isEditing ? (
              <>
                <button
                  onClick={onStartEdit}
                  className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Редактировать
                </button>
                {onReset && (
                  <button
                    onClick={onReset}
                    className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Сбросить
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={onSaveEdit}
                  className="inline-flex items-center px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Сохранить
                </button>
                <button
                  onClick={onCancelEdit}
                  className="inline-flex items-center px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Отменить
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Краткое содержание */}
        <div className="mb-6">
          {isEditing ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Краткое содержание:
              </label>
              <textarea
                value={summary}
                onChange={(e) => onSummaryChange?.(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-vertical focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Введите краткое содержание..."
              />
            </div>
          ) : (
            <div className="prose prose-gray max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {summary}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Кнопка раскрытия */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          <span>{isExpanded ? 'Скрыть подробности' : 'Читать подробнее'}</span>
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>

        {/* Раскрывающийся контент */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-gray-200">
                {isEditing ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Подробное содержание:
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => onContentChange?.(e.target.value)}
                      className="w-full h-96 p-3 border border-gray-300 rounded-lg resize-vertical focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
                      placeholder="Введите подробное содержание в формате Markdown..."
                    />
                  </div>
                ) : (
                  <div className="prose prose-gray max-w-none">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={markdownComponents}
                    >
                      {content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 