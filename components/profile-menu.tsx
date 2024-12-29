import * as React from "react"
import Link from 'next/link'
import { User, Building, Shield, Lock, LogOut, Users, UserCircle } from 'lucide-react'
import { useLanguage } from '../contexts/language-context'
import { useRole } from '../contexts/role-context'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const translations = {
  en: {
    profile: "Profile",
    myProfile: "My Profile",
    userDetails: "User details/role",
    companyInfo: "Company information",
    accessLevel: "Access level/permissions",
    loginSecurity: "Login/security settings",
    organisation: "Organisation",
    logout: "Logout",
    userRoles: "User Roles",
    buyerUser: "Buyer/User",
    procurementManager: "Procurement Manager",
    financeAccountsPayable: "Finance/Accounts Payable",
    systemAdministrator: "System Administrator",
  },
  de: {
    profile: "Profil",
    myProfile: "Mein Profil",
    userDetails: "Benutzerdetails/Rolle",
    companyInfo: "Unternehmensinformationen",
    accessLevel: "Zugriffsebene/Berechtigungen",
    loginSecurity: "Anmelde-/Sicherheitseinstellungen",
    organisation: "Organisation",
    logout: "Abmelden",
    userRoles: "Benutzerrollen",
    buyerUser: "Käufer/Benutzer",
    procurementManager: "Einkaufsleiter",
    financeAccountsPayable: "Finanzen/Debitorenbuchhaltung",
    systemAdministrator: "Systemadministrator",
  },
  fr: {
    profile: "Profil",
    myProfile: "Mon Profil",
    userDetails: "Détails utilisateur/rôle",
    companyInfo: "Informations sur l'entreprise",
    accessLevel: "Niveau d'accès/permissions",
    loginSecurity: "Paramètres de connexion/sécurité",
    organisation: "Organisation",
    logout: "Déconnexion",
    userRoles: "Rôles des utilisateurs",
    buyerUser: "Acheteur/Utilisateur",
    procurementManager: "Responsable des achats",
    financeAccountsPayable: "Finances/Comptabilité fournisseurs",
    systemAdministrator: "Administrateur système",
  },
  es: {
    profile: "Perfil",
    myProfile: "Mi Perfil",
    userDetails: "Detalles de usuario/rol",
    companyInfo: "Información de la empresa",
    accessLevel: "Nivel de acceso/permisos",
    loginSecurity: "Configuración de inicio de sesión/seguridad",
    organisation: "Organización",
    logout: "Cerrar sesión",
    userRoles: "Roles de usuario",
    buyerUser: "Comprador/Usuario",
    procurementManager: "Encargado de compras",
    financeAccountsPayable: "Finanzas/Cuentas por pagar",
    systemAdministrator: "Administrador del sistema",
  },
  pl: {
    profile: "Profil",
    myProfile: "Mój Profil",
    userDetails: "Dane użytkownika/rola",
    companyInfo: "Informacje o firmie",
    accessLevel: "Poziom dostępu/uprawnienia",
    loginSecurity: "Ustawienia logowania/bezpieczeństwa",
    organisation: "Organizacja",
    logout: "Wyloguj się",
    userRoles: "Role użytkownika",
    buyerUser: "Kupujący/Użytkownik",
    procurementManager: "Kierownik zakupów",
    financeAccountsPayable: "Finanse/Księgowość zobowiązań",
    systemAdministrator: "Administrator systemu",
  }
}

type UserRole = 'Buyer/User' | 'Procurement Manager' | 'Finance/Accounts Payable' | 'System Administrator';

export function ProfileMenu() {
  const { language } = useLanguage()
  const { role, setRole } = useRole()
  const t = translations[language as keyof typeof translations] || translations.en

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole)
  }

  const roleBasedMenuItems = () => {
    switch (role) {
      case 'Buyer/User':
        return (
          <>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>{t.userDetails}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>{t.companyInfo}</span>
            </DropdownMenuItem>
          </>
        )
      case 'Procurement Manager':
        return (
          <>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>{t.userDetails}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>{t.companyInfo}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Shield className="mr-2 h-4 w-4" />
              <span>{t.accessLevel}</span>
            </DropdownMenuItem>
          </>
        )
      case 'Finance/Accounts Payable':
        return (
          <>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>{t.userDetails}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>{t.companyInfo}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Shield className="mr-2 h-4 w-4" />
              <span>{t.accessLevel}</span>
            </DropdownMenuItem>
          </>
        )
      case 'System Administrator':
        return (
          <>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>{t.userDetails}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>{t.companyInfo}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Shield className="mr-2 h-4 w-4" />
              <span>{t.accessLevel}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Lock className="mr-2 h-4 w-4" />
              <span>{t.loginSecurity}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              <span>{t.organisation}</span>
            </DropdownMenuItem>
          </>
        )
      default:
        return null;
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">{t.profile}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t.myProfile}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <UserCircle className="mr-2 h-4 w-4" />
            <span>{t.userRoles}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleRoleChange('Buyer/User')}>{t.buyerUser}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRoleChange('Procurement Manager')}>{t.procurementManager}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRoleChange('Finance/Accounts Payable')}>{t.financeAccountsPayable}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRoleChange('System Administrator')}>{t.systemAdministrator}</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        {roleBasedMenuItems()}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t.logout}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

