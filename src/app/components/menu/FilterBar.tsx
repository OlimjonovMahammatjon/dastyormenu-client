import { Category } from '../../../types'

interface FilterBarProps {
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
}

export function FilterBar({ categories, activeCategory, onCategoryChange }: FilterBarProps) {
  return (
    <div className="sticky top-0 z-10 bg-bg border-b border-border shadow-sm">
      <div className="flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar">
        <button
          onClick={() => onCategoryChange(null)}
          aria-label="Barcha kategoriyalar"
          aria-pressed={activeCategory === null}
          className="relative px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-gold font-medium border-2"
          style={{
            background: activeCategory === null ? 'var(--gold)' : 'var(--surface)',
            color: activeCategory === null ? 'white' : 'var(--text-muted)',
            borderColor: activeCategory === null ? 'var(--gold)' : 'var(--border)',
            boxShadow: activeCategory === null ? '0 2px 8px rgba(245, 158, 11, 0.3)' : 'none'
          }}
        >
          Hammasi
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            aria-label={`${category.name} kategoriyasi`}
            aria-pressed={activeCategory === category.id}
            className="relative px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all flex-shrink-0 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-gold font-medium border-2"
            style={{
              background: activeCategory === category.id ? 'var(--gold)' : 'var(--surface)',
              color: activeCategory === category.id ? 'white' : 'var(--text-muted)',
              borderColor: activeCategory === category.id ? 'var(--gold)' : 'var(--border)',
              boxShadow: activeCategory === category.id ? '0 2px 8px rgba(245, 158, 11, 0.3)' : 'none'
            }}
          >
            <span role="img" aria-hidden="true">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
