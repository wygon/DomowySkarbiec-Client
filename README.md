# Tukanowy Skarbiec - System Zarządzania Finansami Rodzinnymi

Aplikacja do zarządzania finansami rodzinnymi, umożliwiająca śledzenie dochodów i wydatków oraz zarządzanie budżetem domowym. Projekt składa się z backendu w technologii ASP.NET Core Web API oraz frontendu w React z TypeScript.

## 📋 Funkcjonalności

- **Zarządzanie użytkownikami** - rejestracja i logowanie
- **System rodzin** - tworzenie i zarządzanie grupami użytkowników
- **Śledzenie transakcji** - dodawanie i przeglądanie dochodów oraz wydatków
- **Budżet rodzinny** - monitorowanie wydatków względem ustalonego budżetu
- **Wykresy i statystyki** - wizualizacja danych finansowych
- **Role w rodzinie** - różne uprawnienia dla głowy rodziny i członków

## 🛠️ Wymagania systemowe

Przed rozpoczęciem pracy z projektem upewnij się, że masz zainstalowane następujące oprogramowanie:

### Backend (ASP.NET Core)
- **[.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)** - Projekt jest skierowany na .NET 8.0
- **[SQL Server](https://www.microsoft.com/sql-server/sql-server-downloads)** - Do przechowywania danych
  - SQL Server Express (darmowy) lub SQL Server Developer Edition
  - Alternatywnie można użyć SQL Server LocalDB, który jest dołączony do Visual Studio
- **[Visual Studio 2022](https://visualstudio.microsoft.com/vs/)** lub **[Visual Studio Code](https://code.visualstudio.com/)** (zalecane)

### Frontend (React)
- **[Node.js](https://nodejs.org/)** (wersja 18 lub wyższa) - wymagane dla aplikacji React
- **npm** (instalowany automatycznie z Node.js) lub **yarn**
- **[Git](https://git-scm.com/)** - do zarządzania kodem

### Opcjonalne narzędzia
- **[SQL Server Management Studio (SSMS)](https://docs.microsoft.com/sql-server/ssms/download-sql-server-management-studio-ssms)** - Do zarządzania bazą danych
- **[Postman](https://www.postman.com/)** lub podobne narzędzie do testowania API

## 🚀 Instalacja i uruchomienie

### 1. Sklonuj repozytorium
```bash
git clone <adres-repozytorium>
cd TukanTomek
```

### 2. Konfiguracja backendu (Server)

#### Przejdź do katalogu serwera
```bash
cd TukanTomek.Server
```

#### Zainstaluj zależności
```bash
dotnet restore
```

#### Konfiguracja bazy danych
1. Zaktualizuj connection string w pliku `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=TukanTomekDb;Trusted_Connection=true;MultipleActiveResultSets=true"
  }
}
```

2. Utwórz i zastosuj migracje bazy danych:
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

#### Uruchom serwer API
```bash
dotnet run --launch-profile "https"
```

Serwer będzie dostępny pod adresem: `https://localhost:64737` (lub inny port wskazany w terminalu)

### 3. Konfiguracja frontendu (Client)

#### Przejdź do katalogu klienta
```bash
cd ../tukantomek.client
```

#### Zainstaluj zależności
```bash
npm install
```

lub jeśli używasz yarn:
```bash
yarn install
```

#### Uruchom aplikację w trybie deweloperskim
```bash
npm run dev
```

lub:
```bash
yarn dev
```

### 4. Dostęp do aplikacji
- **Aplikacja kliencka:** `http://localhost:5051` (lub inny port wskazany w terminalu)
- **Bazowy URL API:** `https://localhost:5051/api`

## 🏗️ Struktura projektu

```
TukanTomek/
├── TukanTomek.Server/          # ASP.NET Core Web API
│   ├── Controllers/            # Kontrolery API
│   ├── Models/                 # Modele encji
│   ├── DTOs/                   # Obiekty transferu danych
│   ├── Services/               # Logika biznesowa
│   ├── Repositories/           # Warstwa dostępu do danych
│   ├── Data/                   # Kontekst bazy danych
│   └── Program.cs              # Punkt wejścia aplikacji
└── tukantomek.client/          # Aplikacja React
    ├── src/
    │   ├── components/         # Komponenty wielokrotnego użytku
    │   ├── context/           # Konteksty React
    │   ├── layouts/           # Układy stron
    │   ├── pages/             # Strony aplikacji
    │   ├── types/             # Definicje typów TypeScript
    │   ├── App.tsx            # Główny komponent aplikacji
    │   └── main.tsx           # Punkt wejścia aplikacji
    └── package.json           # Zależności i skrypty
```

## 📦 Zależności projektu

### Backend (.NET 8.0):
- **Microsoft.EntityFrameworkCore** - ORM do pracy z bazą danych
- **Microsoft.EntityFrameworkCore.SqlServer** - Provider dla SQL Server
- **Swashbuckle.AspNetCore** - Generowanie dokumentacji API (Swagger)

### Frontend (React):
- **React 18** - biblioteka do budowania interfejsu użytkownika
- **TypeScript** - typowany JavaScript
- **React Router DOM** - routing w aplikacji
- **React Bootstrap** - komponenty UI
- **Bootstrap** - framework CSS
- **Recharts** - biblioteka do tworzenia wykresów
- **Sass** - preprocesor CSS
- **Vite** - bundler i serwer deweloperski

## 🎯 Dostępne skrypty

### Backend:
- `dotnet run` - uruchomienie serwera API
- `dotnet build` - budowanie aplikacji
- `dotnet ef migrations add <nazwa>` - tworzenie nowej migracji
- `dotnet ef database update` - aplikowanie migracji do bazy danych

### Frontend:
- `npm run dev` - uruchomienie serwera deweloperskiego
- `npm run build` - budowanie aplikacji produkcyjnej
- `npm run preview` - podgląd zbudowanej aplikacji
- `npm run lint` - sprawdzenie kodu za pomocą ESLint

## 📡 Endpointy API

### Użytkownicy
- `GET /api/users` - Pobierz wszystkich użytkowników
- `GET /api/users/{id}` - Pobierz użytkownika po ID
- `GET /api/users/{id}/family` - Pobierz rodzinę użytkownika
- `POST /api/users` - Utwórz nowego użytkownika
- `PUT /api/users/{id}` - Zaktualizuj użytkownika
- `DELETE /api/users/{id}` - Usuń użytkownika

### Rodziny
- `GET /api/family` - Pobierz wszystkie rodziny
- `GET /api/family/{id}` - Pobierz rodzinę po ID
- `GET /api/family/{familyId}/users` - Pobierz członków rodziny
- `GET /api/family/{familyId}/users-with-transactions` - Pobierz członków rodziny z transakcjami
- `POST /api/family` - Utwórz nową rodzinę
- `PUT /api/family/{id}` - Zaktualizuj rodzinę
- `DELETE /api/family/{id}` - Usuń rodzinę

### Transakcje
- `GET /api/transaction` - Pobierz wszystkie transakcje
- `GET /api/transaction/user/{id}` - Pobierz transakcje użytkownika
- `GET /api/transaction/family/{id}` - Pobierz transakcje rodziny
- `GET /api/transaction/{id}` - Pobierz transakcję po ID
- `POST /api/transaction` - Utwórz nową transakcję
- `DELETE /api/transaction/{id}` - Usuń transakcję

## 🔧 Konfiguracja

### Zmiana adresu API w frontendzie
Jeśli twój backend działa na innym adresie niż domyślny, znajdź i zmień wszystkie wystąpienia URL API w plikach frontendu:
- `src/pages/Families.tsx`
- `src/pages/FamiliesCreate.tsx`
- `src/pages/Transactions.tsx`
- `src/pages/Users.tsx`
- `src/components/AddTransactionComponent.tsx`
- `src/components/LoginComponent.tsx`

### Dostosowanie stylów
Główne style znajdują się w pliku `src/App.scss`. Możesz modyfikować:
- Kolory motywu (zmienna `$primary`)
- Responsywność
- Układ sidebara

## 📱 Funkcjonalności responsywne

Aplikacja jest w pełni responsywna i dostosowana do urządzeń:
- Desktop (992px+) - pełny sidebar
- Tablet i mobile (<992px) - rozwijane menu

## 🐛 Rozwiązywanie problemów

### Backend:
1. **Problemy z połączeniem do bazy danych:**
   - Upewnij się, że SQL Server jest uruchomiony
   - Sprawdź connection string w pliku `appsettings.json`
   - Sprawdź czy baza danych istnieje i migracje zostały zastosowane

2. **Konflikty portów:**
   - Sprawdź czy port 7154 (API) jest dostępny
   - W razie potrzeby zmodyfikuj plik `launchSettings.json`

### Frontend:
1. **Błąd połączenia z API:**
   - Sprawdź czy backend jest uruchomiony
   - Zweryfikuj czy wszystkie endpointy API są dostępne

2. **Błędy instalacji:**
   - Usuń folder `node_modules` i plik `package-lock.json`
   - Uruchom ponownie `npm install`

3. **Problemy z TypeScript:**
   - Sprawdź czy wszystkie typy są poprawnie zdefiniowane
   - Uruchom `npm run build` aby sprawdzić błędy kompilacji

## 🤝 Rozwój projektu

### Dodawanie nowych funkcji
1. Utwórz nowy branch: `git checkout -b nazwa-funkcji`
2. Wprowadź zmiany (backend i/lub frontend)
3. Zatwierdź zmiany: `git commit -m "Opis zmian"`
4. Wypchnij branch: `git push origin nazwa-funkcji`
5. Utwórz Pull Request

### Konwencje kodowania
- **Backend:** Używaj konwencji C# (PascalCase dla klas i metod)
- **Frontend:** Używaj TypeScript dla wszystkich nowych komponentów
- Stosuj naming convention: PascalCase dla komponentów, camelCase dla funkcji
- Dodawaj typy dla wszystkich props i state

## 💾 Schemat bazy danych

Aplikacja używa Entity Framework Core z następującymi głównymi encjami:
- **User:** Członkowie rodziny z informacjami osobistymi
- **Family:** Grupy rodzinne z informacjami o zarobkach
- **Transaction:** Transakcje finansowe powiązane z użytkownikami