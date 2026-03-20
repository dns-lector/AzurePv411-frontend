import "./ui/Home.css";

export default function Home() {
    return <div>
        <h1>Сервіс статичних застосунків. Публікація фронтенда. </h1>
        <p>
            Створюємо новий проєкт на базі React Typescript 
            засобами vite.dev
            Закладаємо архітектуру проєкту, використовуємо FSD
            https://fsd.how/docs/get-started/overview/
        </p>        
        <ul>
            <li>видаляємо директорію /src/assets, index.css</li>
            <li>створюємо директорії FSD (layers) у директорії /src/</li>
            <li>створюємо директорії (segments) у директорії /src/app</li>
            <li>переміщуємо main.tsx до app/, коригуємо посилання на нього 
                в index.html: src="/src/main.tsx" &rarr; src="/src/app/main.tsx"</li>
            <li>переміщуємо App.tsx, App.css /src/app/ui та мінімізуємо їх 
        контент</li>
            <li>коригуємо вміст main.tsx через переміщення App 
        та видалення index.css</li>
        </ul>
        <p>
            Закладаємо маршрутизацію (https://www.w3schools.com/react/react_router.asp)
        </p>
        <ul>
            <li>встановлюємо модуль роутера
        <code>npm install react-router-dom</code></li>
            <li>створюємо файли з сторінками, щонайменше, Home, NotFound 
                у директорії /pages </li>
            <li>створюємо файл-шаблон сторінок /app/ui/Layout</li>
            <li>реалізуємо в App.tsx вкладені маршрути з проходом шаблона</li>
        </ul>
    </div>
};
