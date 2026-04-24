import { Category } from '../../../types'

interface FilterBarProps {
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
}

export function FilterBar({ categories, activeCategory, onCategoryChange }: FilterBarProps) {
  return (
    <div className="sticky top-0 z-10 bg-bg/95 backdrop-blur-sm border-b border-border">
      <div className="flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar">
        <button
          onClick={() => onCategoryChange(null)}
          className="relative px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors flex-shrink-0"
          style={{
            background: activeCategory === null ? 'var(--gold)' : 'var(--surface)',
            color: activeCategory === null ? 'var(--bg)' : 'var(--text-muted)'
          }}
        >
          Hammasi
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className="relative px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors flex-shrink-0 flex items-center gap-1.5"
            style={{
              background: activeCategory === category.id ? 'var(--gold)' : 'var(--surface)',
              color: activeCategory === category.id ? 'var(--bg)' : 'var(--text-muted)'
            }}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
