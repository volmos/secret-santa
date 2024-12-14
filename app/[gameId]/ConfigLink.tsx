import Link from "next/link";

export default function ConfigLink({gameId}: { gameId: string }) {
    return (
        <Link href={`/${gameId}/config`} title="Config"
              className="w-fit ms-auto p-2 border border-primary rounded-3xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="lucide lucide-bolt">
                <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <circle cx="12" cy="12" r="4"/>
            </svg>
        </Link>
    );
}