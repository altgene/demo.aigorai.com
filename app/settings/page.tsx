'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Bell, Globe, ShieldCheck, BarChart, Zap, User, Workflow } from 'lucide-react'
import { useLanguage } from '../../contexts/language-context'

export default function SettingsPage() {
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const { language, setLanguage } = useLanguage()

  const handleLanguageChange = (value: string) => {
    setLanguage(value as 'en' | 'de' | 'fr' | 'es' | 'pl')
  }

  const translations = {
    en: {
      settings: "Settings",
      profile: "Profile",
      notifications: "Notifications",
      language: "Language",
      approvals: "Approvals",
      integrations: "Integrations",
      security: "Security",
      reporting: "Reporting",
      profileSettings: "Profile Settings",
      manageAccount: "Manage your account details and preferences.",
      name: "Name",
      email: "Email",
      saveChanges: "Save Changes",
      notificationPreferences: "Notification Preferences",
      chooseNotifications: "Choose how you want to be notified.",
      emailNotifications: "Email Notifications",
      pushNotifications: "Push Notifications",
      languageLocalization: "Language and Localization",
      setLanguageRegion: "Set your preferred language and region.",
      selectLanguage: "Select a language",
      region: "Region",
      selectRegion: "Select a region",
    },
    de: {
      settings: "Einstellungen",
      profile: "Profil",
      notifications: "Benachrichtigungen",
      language: "Sprache",
      approvals: "Genehmigungen",
      integrations: "Integrationen",
      security: "Sicherheit",
      reporting: "Berichterstattung",
      profileSettings: "Profileinstellungen",
      manageAccount: "Verwalten Sie Ihre Kontodaten und Präferenzen.",
      name: "Name",
      email: "E-Mail",
      saveChanges: "Änderungen speichern",
      notificationPreferences: "Benachrichtigungseinstellungen",
      chooseNotifications: "Wählen Sie aus, wie Sie benachrichtigt werden möchten.",
      emailNotifications: "E-Mail-Benachrichtigungen",
      pushNotifications: "Push-Benachrichtigungen",
      languageLocalization: "Sprache und Lokalisierung",
      setLanguageRegion: "Legen Sie Ihre bevorzugte Sprache und Region fest.",
      selectLanguage: "Sprache auswählen",
      region: "Region",
      selectRegion: "Region auswählen",
    },
    fr: {
      settings: "Paramètres",
      profile: "Profil",
      notifications: "Notifications",
      language: "Langue",
      approvals: "Approbations",
      integrations: "Intégrations",
      security: "Sécurité",
      reporting: "Rapports",
      profileSettings: "Paramètres du profil",
      manageAccount: "Gérez les détails et les préférences de votre compte.",
      name: "Nom",
      email: "E-mail",
      saveChanges: "Enregistrer les modifications",
      notificationPreferences: "Préférences de notification",
      chooseNotifications: "Choisissez comment vous souhaitez être notifié.",
      emailNotifications: "Notifications par e-mail",
      pushNotifications: "Notifications push",
      languageLocalization: "Langue et localisation",
      setLanguageRegion: "Définissez votre langue et votre région préférées.",
      selectLanguage: "Sélectionnez une langue",
      region: "Région",
      selectRegion: "Sélectionnez une région",
    },
    es: {
      settings: "Configuración",
      profile: "Perfil",
      notifications: "Notificaciones",
      language: "Idioma",
      approvals: "Aprobaciones",
      integrations: "Integraciones",
      security: "Seguridad",
      reporting: "Informes",
      profileSettings: "Configuración del perfil",
      manageAccount: "Administre los detalles y preferencias de su cuenta.",
      name: "Nombre",
      email: "Correo electrónico",
      saveChanges: "Guardar cambios",
      notificationPreferences: "Preferencias de notificación",
      chooseNotifications: "Elija cómo desea ser notificado.",
      emailNotifications: "Notificaciones por correo electrónico",
      pushNotifications: "Notificaciones push",
      languageLocalization: "Idioma y localización",
      setLanguageRegion: "Establezca su idioma y región preferidos.",
      selectLanguage: "Seleccione un idioma",
      region: "Región",
      selectRegion: "Seleccione una región",
    },
    pl: {
      settings: "Ustawienia",
      profile: "Profil",
      notifications: "Powiadomienia",
      language: "Język",
      approvals: "Zatwierdzenia",
      integrations: "Integracje",
      security: "Bezpieczeństwo",
      reporting: "Raportowanie",
      profileSettings: "Ustawienia profilu",
      manageAccount: "Zarządzaj szczegółami i preferencjami swojego konta.",
      name: "Imię i nazwisko",
      email: "E-mail",
      saveChanges: "Zapisz zmiany",
      notificationPreferences: "Preferencje powiadomień",
      chooseNotifications: "Wybierz, jak chcesz otrzymywać powiadomienia.",
      emailNotifications: "Powiadomienia e-mail",
      pushNotifications: "Powiadomienia push",
      languageLocalization: "Język i lokalizacja",
      setLanguageRegion: "Ustaw preferowany język i region.",
      selectLanguage: "Wybierz język",
      region: "Region",
      selectRegion: "Wybierz region",
    }
  }

  const t = translations[language as keyof typeof translations]

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t.settings}</h1>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">{t.profile}</TabsTrigger>
          <TabsTrigger value="notifications">{t.notifications}</TabsTrigger>
          <TabsTrigger value="language">{t.language}</TabsTrigger>
          <TabsTrigger value="approvals">{t.approvals}</TabsTrigger>
          <TabsTrigger value="integrations">{t.integrations}</TabsTrigger>
          <TabsTrigger value="security">{t.security}</TabsTrigger>
          <TabsTrigger value="reporting">{t.reporting}</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>{t.profileSettings}</CardTitle>
              <CardDescription>{t.manageAccount}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">{t.name}</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">{t.email}</Label>
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>{t.saveChanges}</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>{t.notificationPreferences}</CardTitle>
              <CardDescription>{t.chooseNotifications}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">{t.emailNotifications}</Label>
                <Switch id="email-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">{t.pushNotifications}</Label>
                <Switch id="push-notifications" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle>{t.languageLocalization}</CardTitle>
              <CardDescription>{t.setLanguageRegion}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="language">{t.language}</Label>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder={t.selectLanguage} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="pl">Polski</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="region">{t.region}</Label>
                <Select>
                  <SelectTrigger id="region">
                    <SelectValue placeholder={t.selectRegion} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="na">North America</SelectItem>
                    <SelectItem value="eu">Europe</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                    <SelectItem value="sa">South America</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>{t.saveChanges}</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        {/* Other tabs remain unchanged */}
      </Tabs>
    </div>
  )
}

