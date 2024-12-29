import * as React from "react"
import Link from 'next/link'
import { BarChart, FileText, TrendingUp } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useLanguage } from '../contexts/language-context'

export function AnalyticsMenu() {
  const { language } = useLanguage()

  const translations = {
    en: {
      analytics: 'Analytics',
      dashboard: 'Dashboard',
      executiveOverview: 'Executive Overview',
      procurementSummary: 'Procurement Summary',
      supplierPerformance: 'Supplier Performance',
      reports: 'Reports',
      spendAnalysis: 'Spend Analysis',
      complianceReports: 'Compliance Reports',
      customReports: 'Custom Reports',
      performanceMetrics: 'Performance Metrics',
    },
    de: {
      analytics: 'Analytik',
      dashboard: 'Übersicht',
      executiveOverview: 'Führungsübersicht',
      procurementSummary: 'Beschaffungszusammenfassung',
      supplierPerformance: 'Lieferantenleistung',
      reports: 'Berichte',
      spendAnalysis: 'Ausgabenanalyse',
      complianceReports: 'Compliance-Berichte',
      customReports: 'Benutzerdefinierte Berichte',
      performanceMetrics: 'Leistungskennzahlen',
    },
    fr: {
      analytics: 'Analytique',
      dashboard: 'Tableau de bord',
      executiveOverview: 'Aperçu exécutif',
      procurementSummary: 'Résumé des achats',
      supplierPerformance: 'Performance des fournisseurs',
      reports: 'Rapports',
      spendAnalysis: 'Analyse des dépenses',
      complianceReports: 'Rapports de conformité',
      customReports: 'Rapports personnalisés',
      performanceMetrics: 'Indicateurs de performance',
    },
    es: {
      analytics: 'Análisis',
      dashboard: 'Panel de control',
      executiveOverview: 'Resumen ejecutivo',
      procurementSummary: 'Resumen de adquisiciones',
      supplierPerformance: 'Rendimiento de proveedores',
      reports: 'Informes',
      spendAnalysis: 'Análisis de gastos',
      complianceReports: 'Informes de cumplimiento',
      customReports: 'Informes personalizados',
      performanceMetrics: 'Métricas de rendimiento',
    },
    pl: {
      analytics: 'Analityka',
      dashboard: 'Panel',
      executiveOverview: 'Przegląd dla kierownictwa',
      procurementSummary: 'Podsumowanie zakupów',
      supplierPerformance: 'Wydajność dostawców',
      reports: 'Raporty',
      spendAnalysis: 'Analiza wydatków',
      complianceReports: 'Raporty zgodności',
      customReports: 'Raporty niestandardowe',
      performanceMetrics: 'Metryki wydajności',
    }
  }

  const t = translations[language as keyof typeof translations]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">{t.analytics}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t.analytics}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <BarChart className="mr-2 h-4 w-4" />
              <span>{t.dashboard}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem asChild>
                <Link href="/analytics/dashboard?tab=executive">
                  {t.executiveOverview}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/analytics/dashboard?tab=procurement">
                  {t.procurementSummary}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/analytics/dashboard?tab=supplier">
                  {t.supplierPerformance}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FileText className="mr-2 h-4 w-4" />
              <span>{t.reports}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem asChild>
                <Link href="/analytics/reports/spend-analysis">
                  {t.spendAnalysis}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/analytics/reports/compliance">
                  {t.complianceReports}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/analytics/reports/custom">
                  {t.customReports}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href="/analytics/performance-metrics">
            <TrendingUp className="mr-2 h-4 w-4" />
            <span>{t.performanceMetrics}</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

