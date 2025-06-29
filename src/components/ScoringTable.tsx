import { useState, useEffect } from 'react';

interface ScoringItem {
  id: string;
  name: string;
  impact: number;
  confidence: number;
  effort: number;
  score: number;
  priority: number;
  comment: string;
}

const initialData: ScoringItem[] = [
  {
    id: '1',
    name: 'H2: Библиотека шаблонов',
    impact: 5,
    confidence: 4,
    effort: 2,
    score: 10.00,
    priority: 1,
    comment: 'Адресует "холодный старт", показывает ценность, снижает когнитивную нагрузку. Высокий потенциал для активации и удержания. Относительно не самые сложные первые шаги'
  },
  {
    id: '2', 
    name: 'H1: Персонализированный онбординг',
    impact: 5,
    confidence: 4,
    effort: 3,
    score: 6.67,
    priority: 2,
    comment: 'Ключевая для D0/D1 активации. Помогает пользователю сразу найти релевантное. Чуть сложнее H2 из-за необходимости проработки логики персонализации.'
  },
  {
    id: '3',
    name: 'H3: Интерактивность Ассистента',
    impact: 4,
    confidence: 4,
    effort: 3,
    score: 5.33,
    priority: 3,
    comment: 'Улучшает качество взаимодействия, помогает пользователю дойти до нужного результата, формирует привычку. Требует изменений в логике Ассистента.'
  },
  {
    id: '4',
    name: 'F1: Помощник редактора',
    impact: 2,
    confidence: 3,
    effort: 2,
    score: 3.00,
    priority: 4,
    comment: 'Полезно, но узкоспециализированно. Есть много внешних инструментов. Может быть хорошим дополнением, но не решает корневую проблему оттока. Средняя уверенность в большом влиянии на общий Retention.'
  },
  {
    id: '5',
    name: 'F2: Нотификации об изменениях',
    impact: 1,
    confidence: 2,
    effort: 1,
    score: 2.00,
    priority: 6,
    comment: 'Важно для информирования лояльных пользователей, но не решает проблему, почему пользователи не становятся лояльными. Низкий Impact на текущую проблему оттока на D2. Легко сделать, но не в приоритете сейчас.'
  },
  {
    id: '6',
    name: 'F3: Генератор презентаций',
    impact: 3,
    confidence: 2,
    effort: 5,
    score: 1.20,
    priority: 5,
    comment: 'Потенциально "вау-фича" для определенного сегмента, но очень сложная в реализации. Низкая уверенность в качестве MVP и широком охвате для решения текущей проблемы массового оттока. Может быть хорошим "Приложением" в будущем.'
  }
];

export default function ScoringTable() {
  const [data, setData] = useState<ScoringItem[]>(initialData);
  const [editingCell, setEditingCell] = useState<{id: string, field: string} | null>(null);

  // Пересчет Score и Priority при изменении данных
  useEffect(() => {
    const updatedData = data.map(item => ({
      ...item,
      score: item.effort === 0 ? 0 : Number(((item.impact * item.confidence) / item.effort).toFixed(2))
    }));

    // Сортировка по Score и назначение приоритетов
    const sortedData = [...updatedData].sort((a, b) => b.score - a.score);
    sortedData.forEach((item, index) => {
      item.priority = index + 1;
    });

    // Обновляем состояние, если данные изменились
    if (JSON.stringify(data) !== JSON.stringify(sortedData)) {
      setData(sortedData);
    }
  }, [data]);

  const handleCellEdit = (id: string, field: keyof ScoringItem, value: string | number) => {
    setData(prevData => 
      prevData.map(item => 
        item.id === id 
          ? { ...item, [field]: typeof value === 'string' ? value : Number(value) }
          : item
      )
    );
    setEditingCell(null);
  };

  const handleCellClick = (id: string, field: string) => {
    setEditingCell({ id, field });
  };

  const renderEditableCell = (item: ScoringItem, field: keyof ScoringItem, type: 'number' | 'text' = 'text') => {
    const isEditing = editingCell?.id === item.id && editingCell?.field === field;
    const value = item[field];

    if (isEditing) {
      return (
        <input
          type={type}
          className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={value}
          min={type === 'number' ? 0 : undefined}
          max={type === 'number' ? 10 : undefined}
          onBlur={(e) => handleCellEdit(item.id, field, type === 'number' ? Number((e.target as HTMLInputElement).value) : (e.target as HTMLInputElement).value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCellEdit(item.id, field, type === 'number' ? Number((e.target as HTMLInputElement).value) : (e.target as HTMLInputElement).value);
            }
            if (e.key === 'Escape') {
              setEditingCell(null);
            }
          }}
          autoFocus
        />
      );
    }

    return (
      <div
        className="cursor-pointer hover:bg-gray-50 px-2 py-1 rounded break-words"
        onClick={() => handleCellClick(item.id, field)}
      >
        {value}
      </div>
    );
  };

  return (
    <div className="my-8">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse border border-gray-300 bg-white">
          <colgroup>
            <col style={{ width: '165px' }} />
            <col style={{ width: '50px' }} />
            <col style={{ width: '50px' }} />
            <col style={{ width: '50px' }} />
            <col style={{ width: '80px' }} />
            <col style={{ width: '90px' }} />
            <col />
          </colgroup>
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">
                Фича/Гипотеза
              </th>
              <th className="border border-gray-300 px-2 py-3 text-center font-medium text-gray-900">
                I
              </th>
              <th className="border border-gray-300 px-2 py-3 text-center font-medium text-gray-900">
                C
              </th>
              <th className="border border-gray-300 px-2 py-3 text-center font-medium text-gray-900">
                E
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">
                Score
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">
                Priority
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">
                Комментарий
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              .sort((a, b) => a.priority - b.priority)
              .map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 break-words">
                  {renderEditableCell(item, 'name')}
                </td>
                <td className="border border-gray-300 px-2 py-3 text-center">
                  {renderEditableCell(item, 'impact', 'number')}
                </td>
                <td className="border border-gray-300 px-2 py-3 text-center">
                  {renderEditableCell(item, 'confidence', 'number')}
                </td>
                <td className="border border-gray-300 px-2 py-3 text-center">
                  {renderEditableCell(item, 'effort', 'number')}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center font-medium text-blue-600">
                  {item.score.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium ${
                    item.priority === 1 ? 'bg-green-100 text-green-800' :
                    item.priority === 2 ? 'bg-blue-100 text-blue-800' :
                    item.priority === 3 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.priority}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-sm break-words leading-relaxed">
                  {renderEditableCell(item, 'comment')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Как пользоваться:</strong> Кликните на любую ячейку чтобы отредактировать её. 
          Score рассчитывается автоматически по формуле: (Impact × Confidence) ÷ Effort. 
          Приоритеты обновляются автоматически при изменении Score.
        </p>
      </div>
    </div>
  );
} 