var documents = []

const test = [
    { id: 1, title: 'První dokument', content: 'Toto je obsah prvního dokumentu.', href: "google.com", category: "Závod" },
    { id: 2, title: 'Druhý dokument', content: 'Toto je obsah druhého dokumentu.', href: "/app/", category: "Závod" },
    { id: 3, title: 'Třetí dokumenty', content: 'Toto je obsah třetího dokumentu.', href: "/app/", category: "Závod" },
  ];
const settings = [
  {id: Math.random(), title: "Nastavení", content: "Nastavení programu", href: "/app/settings", category: "Nastavení"},
  {id: Math.random(), title: "Moje předplatné", content: "Správa vašich předplatných", href: "/app/settings", category: "Nastavení"},
  {id: Math.random(), title: "předplatné Free", content: "Varianta předplatného Artilea Counter", href: "/app/settings", category: "Nastavení"},
  {id: Math.random(), title: "předplatné Pro", content: "Varianta předplatného Artilea Counter", href: "/app/settings", category: "Nastavení"},
  {id: Math.random(), title: "předplatné Premium", content: "Varianta předplatného Artilea Counter", href: "/app/settings", category: "Nastavení"},
  {id: Math.random(), title: "Moje profil", content: "Správa vašeho profilu", href: "/app/settings", category: "Nastavení"},
  {id: Math.random(), title: "Jméno", content: "Údaj vašeho profilu", href: "/app/settings", category: "Nastavení"},
  {id: Math.random(), title: "Příjmení", content: "Údaj vašeho profilu", href: "/app/settings", category: "Nastavení"},
  {id: Math.random(), title: "Email", content: "Údaj vašeho profilu", href: "/app/settings", category: "Nastavení"},
  {id: Math.random(), title: "Telefon", content: "Údaj vašeho profilu", href: "/app/settings", category: "Nastavení"},
  {id: Math.random(), title: "Datum narození", content: "Údaj vašeho profilu", href: "/app/settings", category: "Nastavení"},
  {id: Math.random(), title: "Adresaa", content: "Údaj vašeho profilu", href: "/app/settings", category: "Nastavení"},
]
documents = test.concat(settings);
module.exports = documents;