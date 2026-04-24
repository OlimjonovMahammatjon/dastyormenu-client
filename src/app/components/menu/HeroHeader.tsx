import { Organization, Table } from '../../../types'
import { MapPin, Phone } from 'lucide-react'

interface HeroHeaderProps {
  organization: Organization
  table: Table
}

export function HeroHeader({ organization, table }: HeroHeaderProps) {
  return (
    <div className="bg-gradient-to-b from-surface to-bg border-b border-border">
      <div className="p-6 pb-8">
        <div className="flex items-start gap-4 mb-4">
          {organization.logo_url && (
            <img
              src={organization.logo_url}
              alt={organization.name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-gold/20"
            />
          )}
          <div className="flex-1">
            <h1 className="font-display text-2xl text-text mb-1">{organization.name}</h1>
            <div className="text-gold text-sm">Stol #{table.table_number}</div>
          </div>
        </div>

        {(organization.address || organization.phone) && (
          <div className="space-y-2 text-sm text-text-muted">
            {organization.address && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{organization.address}</span>
              </div>
            )}
            {organization.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href={`tel:${organization.phone}`} className="hover:text-gold transition-colors">
                  {organization.phone}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
