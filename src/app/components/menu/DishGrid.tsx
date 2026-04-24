import { MenuItem } from '../../../types'
import { DishCard } from './DishCard'

interface DishGridProps {
  dishes: MenuItem[]
  onDishClick: (dish: MenuItem) => void
  onAddToCart: (dish: MenuItem) => void
}

export function DishGrid({ dishes, onDishClick, onAddToCart }: DishGridProps) {
  if (dishes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-6xl mb-4">🍽️</div>
        <p className="text-text-muted text-center">
          Bu kategoriyada hozircha taomlar yo'q
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 max-w-[1400px] mx-auto">
      {dishes.map((dish) => (
        <DishCard
          key={dish.id}
          dish={dish}
          onClick={() => onDishClick(dish)}
          onAddToCart={(e) => {
            e.stopPropagation()
            onAddToCart(dish)
          }}
        />
      ))}
    </div>
  )
}
