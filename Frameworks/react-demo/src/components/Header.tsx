import {type ReactNode} from "react";

interface HeaderPropos {

    image: {
        src: string;
        alt: string;
    }

    children: ReactNode;
}

export default function Header({ image, children}: HeaderPropos) {

    return (
        <header>
            <img {...image} />
            {children}
        </header>
    )
}