import { useEffect, useRef, useState, type JSX } from 'react';
import './ui/Reader.css';

var task:number|null = null;

interface ITranslation {
    from: string,
    to: string,
};

interface ILanguage {
    name: string,
    nativeName: string,
    dir: string,
}

interface ILanguages {
    [key: string]: ILanguage,
}

export default function Reader() {
    const [history, setHistory] = useState<Array<ITranslation>>([]);
    const [languages, setLanguages] = useState<ILanguages|null>(null);
    const [isAuto, setAuto] = useState<boolean>(false);
    const autoRef = useRef<HTMLInputElement>(null);
    const langFromRef = useRef<HTMLSelectElement>(null);
    const langToRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        //           [ history=[] isAuto=false autoRef ]
        const onSelectionEnd = () => {
            let selection = document.getSelection()?.toString()?.trim() ?? "";
            if(selection.length > 0) {
                console.log(selection, isAuto, autoRef.current?.checked);
                // setHistory([...history, {from: selection, to: "in progress..."}]);
                if(autoRef.current?.checked) {
                    const isLocal = window.location.href.includes("://localhost") || 
                        window.location.href.includes("://127.0.0.");

                    const backUrl = isLocal ? "https://localhost:7012" : "https://pv411od0.azurewebsites.net";    
                    const langFrom = langFromRef.current?.value ?? "en";
                    const langTo = langToRef.current?.value ?? "uk";                    
                    
                    fetch(`${backUrl}/Home/ApiTranslate?lang-from=${langFrom}&lang-to=${langTo}&text-from=${encodeURIComponent(selection)}`)
                    .then(r => r.json())
                    .then(j => {
                        setHistory(prev => [...prev, {from: selection, to: j.translation}]);
                    });                    
                }
            }            
            task = null;
        };
        const onSelectionChanged = () => {
            if(task) {
                clearTimeout(task);
            }
            task = setTimeout(onSelectionEnd, 1000);
        };
        document.addEventListener("selectionchange", onSelectionChanged);

        return () => {
            document.removeEventListener("selectionchange", onSelectionChanged);
        };
    }, []);

    useEffect(() => {
        if(isAuto && languages == null) {
            fetch("https://api.cognitive.microsofttranslator.com/languages?api-version=3.0")
            .then(r => r.json())
            .then(j => {
                setLanguages(j.translation);
            });
        }
    }, [isAuto]);

useEffect(() => {if(languages) console.log(languages)}, [languages]);

    return <>
    <label><input type='checkbox' ref={autoRef} onChange={e => setAuto(e.target.checked)} />Автоматично перекладати виділений текст</label>
    {isAuto && <div>
        {!languages ? "loading..." : <>
            <span>Мова оригіналу: </span>
            <select ref={langFromRef} defaultValue={"en"}>
                {Object.keys(languages).map(lang => 
                    <option key={lang} value={lang}>{languages[lang].name} 
                        {languages[lang].name != languages[lang].nativeName && ` (${languages[lang].nativeName})`}
                    </option>)}
            </select>
            <span>Мова перекладу: </span>
            <select ref={langToRef} defaultValue={"uk"}>
                {Object.keys(languages).map(lang => 
                    <option key={lang} value={lang}>{languages[lang].name}
                        {languages[lang].name != languages[lang].nativeName && ` (${languages[lang].nativeName})`}
                    </option>)}
            </select>
        </>}
    </div>}
    {history.length > 0 && <div>
        {history.map(h => <p key={h.from}>{h.from} : {h.to}</p>)}    
    </div>}
    <h1>Internet</h1>
    <p>
        The <b>Internet</b> (or <b>internet</b>)
        [a] is the global system of interconnected computer networks that uses the Internet protocol suite (TCP/IP)
        [b] to communicate between networks and devices. It is a network of networks that comprises private, public, academic, business, and government networks of local to global scope, linked by electronic, wireless, and optical networking technologies. The Internet carries a vast range of information services and resources, such as the interlinked hypertext documents and applications of the World Wide Web (WWW), electronic mail, discussion groups, internet telephony, streaming media and file sharing.
    </p>
    <p>
        Most traditional communication media, including telephone, radio, television, paper mail, newspapers, and print publishing, have been transformed by the Internet, giving rise to new media such as email, online music, digital newspapers, news aggregators, and audio and video streaming websites. The Internet has enabled and accelerated new forms of personal interaction through instant messaging, Internet forums, and social networking services. Online shopping has also grown to occupy a significant market across industries, enabling firms to extend brick and mortar presences to serve larger markets. Business-to-business and financial services on the Internet affect supply chains across entire industries.
    </p>
    <p>
        The origins of the Internet date back to research that enabled the time-sharing of computer resources, the development of packet switching, and the design of computer networks for data communication.[2][3] The set of communication protocols to enable internetworking on the Internet arose from research and development commissioned in the 1970s by the Defense Advanced Research Projects Agency (DARPA) of the United States Department of Defense in collaboration with universities and researchers across the United States, United Kingdom and France.[4][5][6]
    </p>
    <p>
        The Internet has no single centralized governance in either technological implementation or policies for access and usage. Each constituent network sets its own policies.[7] The overarching definitions of the two principal name spaces on the Internet, the Internet Protocol address (IP address) space and the Domain Name System (DNS), are directed by a maintainer organization, the Internet Corporation for Assigned Names and Numbers (ICANN). The technical underpinning and standardization of the core protocols is an activity of the non-profit Internet Engineering Task Force (IETF).
    </p>
    </>;
}

/*
fact(n) -> n <= 1 ? 1 : n * fact(n - 1)
     |
fact(3) -> n * fact(2) -> n * fact(1)
     |              |              |
 якщо змінна - це область памяті, то 
 новий виклик повинен стерти старе значення

 scope          capture        closure
 [n=3]           [n=2]          [n=1]
 fact(3) -> n * fact(2) -> n * fact(1)

Д.З. Реалізувати селектор з вибором мови,
якою буде перекладатись виділений текст. 
Відомості можна напряму брати з відкритого 
ресурсу перекладача
https://api.cognitive.microsofttranslator.com/languages?api-version=3.0
Опублікувати, прикласти посилання на сайт

*/